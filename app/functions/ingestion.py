import json, requests, os, shutil
from flask import request
from textwrap import indent
from pyspark.sql import Row
from pyspark.sql.functions import col,lit
from utils.general_utils import clearSpaces, cleanNullValues, replaceNaN, clearSpaceFirstChar
from functions.harmonization import dfMapping, harmonizationTask, get_mapping_schema, preProcessJSON, get_harmo_schema
from utils.conversion_utils import convertUnits
from pyspark import SparkFiles, SparkContext
from kafka import KafkaConsumer, TopicPartition, KafkaProducer
import ast

def ingestBatchTask(spark, type, data_type, params, mapping_schema_file):
    # TODO: Use Spark read to ingest different types of data
    if type != '':
        if type == 'Database':
            provider = params['provider']
            harmo_schema = get_harmo_schema(data_type)
            mapping_schema = get_mapping_schema(mapping_schema_file)
            df = readRDBMS(spark, params)
            #df = cleanNullValues(df)
            df = replaceNaN(df)
            df = df.withColumn('Provider',lit(provider))
            df = dfMapping(harmo_schema, mapping_schema, df)
            df = harmonizationTask(df, spark, harmo_schema)
            return df
        elif type == 'Webservice':
            api_url = params['url']
            header = {}
            if params['data_type'] == "json":
                header = params['header']
                if 'token' in params:
                    token = params['token']
                    response = requests.get(api_url,header=header,token=token)
                else: 
                    response = requests.get(api_url,headers=header)
                data = response.json()
                #Get mapping schema
                print(mapping_schema_file)
                mapping_schema = get_mapping_schema(mapping_schema_file)
                #Get harmo schema
                harmo_schema = get_harmo_schema(data_type)
                #Pre harmonize to standart schema
                df_temp = preProcessJSON(data, mapping_schema, harmo_schema, spark)
                df_temp2 = harmonizationTask(df_temp,spark, harmo_schema)
                df = convertUnits(spark, df_temp2, harmo_schema, mapping_schema)
            return df
            #Harmonize (type and unit)
           
           
        elif type == 'File':
            file_type = params['file_type']
            file_path = params['file_path']
            provider = params['provider']
            delimiter = params['delimiter']

            #filename = os.path.basename(file_path)
            #shutil.copy2(file_path, "/opt/bitnami/spark/files")
            harmo_schema = get_harmo_schema(data_type)
            mapping_schema = get_mapping_schema(mapping_schema_file)

            if file_type == 'csv':
                df = spark.read.options(delimiter=delimiter, header=True).csv(file_path)
                df = df.withColumn('Provider',lit(provider))
                # Clear spaces from column names
                df = clearSpaceFirstChar(df)
                # Maps the columns to the harmonized dataframe columns
                df = dfMapping(harmo_schema, mapping_schema, df)
                print(df)
                print(df.head(2))
                df = harmonizationTask(df, spark, harmo_schema)
                print(df)
                print(df.head(2))
            elif file_type == 'json':
                df = spark.read.json(file_path)
                df = dfMapping(harmo_schema, mapping_schema, df)
                df = harmonizationTask(df, spark, harmo_schema)

            return df
    return None


def ingestStreamTask(spark, type, data_type, params, mapping_schema_file):
    sc = spark.sparkContext
    if type != '':
        harmo_schema = get_harmo_schema(data_type)
        mapping_schema = get_mapping_schema(mapping_schema_file)
        input_topic = params['input_topic']
        #create kafka consumer
        broker = params['broker']
        consumer = KafkaConsumer(bootstrap_servers=broker,
                                value_deserializer=lambda v: json.loads(v.decode('utf-8')),
                                auto_offset_reset='earliest',
                                enable_auto_commit=True,session_timeout_ms=15000,max_poll_interval_ms=3000)
        
        # assign consumer to beggining of topic
        tp = TopicPartition(input_topic,0)
        consumer.assign([tp])
        consumer.seek_to_end(tp)
        lastOffset = consumer.position(tp)
        consumer.seek_to_beginning(tp) 

        data = []
        for message in consumer:
            data.append(json.loads(message.value))
            print(message.value)

            if message.offset == lastOffset - 1:
                break
        
        consumer.close()
        #write data to json file
        jsonString = json.dumps(data)
        jsonFile = open("data.json", "w")
        jsonFile.write(jsonString)
        jsonFile.close()

        # data to spark df, clear spaces and harmonization
        df = spark.read.json("data.json")
        df = clearSpaces(df)
        df = dfMapping(harmo_schema, mapping_schema, df)
        df = harmonizationTask(df, spark, harmo_schema)
        

        return df

    return None

def executeRestApi(verb, url, headers, body):
  #
    headers = {
        'content-type': "application/json"
    }

    res = None
    # Make API request, get response object back, create dataframe from above schema.
    try:
        if verb == "get":
            res = requests.get(url, data=body, headers=headers)
        else:
            res = requests.post(url, data=body, headers=headers)
    except Exception as e:
        return e

    if res != None and res.status_code == 200:
        return json.loads(res.text)

    return None

# driver: "org.postgresql.Driver"
def readRDBMS(spark, kwargs):
    df = spark.read \
    .format("jdbc") \
    .option("url", "jdbc:" + kwargs["url"] + ":" + kwargs["port"] + "/" + kwargs["db"]) \
    .option("dbtable", kwargs["dbtable"]) \
    .option("user", kwargs["user"]) \
    .option("password", kwargs["password"]) \
    .option("driver", kwargs["driver"]) \
    .load()

    return df