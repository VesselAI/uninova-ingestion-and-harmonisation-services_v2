# - *- coding: utf- 8 - *-
from crypt import methods
from __init__ import createApp
from flask import make_response, request
from functions.ingestion import ingestBatchTask, ingestStreamTask
from utils.spark_utils import initSpark
from utils.conversion_utils import castType
from utils.general_utils import startCronJob, removeAllCronjob
import json, os
from functions.storage import storeToJDBC, storeToMongo , sendToKafka
from functions.nlpSchemaCreaction import nlpSchemaCreation
from configparser import ConfigParser
import subprocess
import pandas as pd
import pymonetdb
import pymongo

app = createApp()

##JDBC/MONGO database config
## Default variables
__db_type = "jdbc"
__jdbc_url = 'monetdb://127.0.0.1'
__jdbc_port = '50000'
__jdbc_db = 'vesselai'
__jdbc_user = 'uninova'
__jdbc_pass = 'grisgris123'
__jdbc_driver = 'org.monetdb.jdbc.MonetDriver'

__mongo_host = ''
__mongo_port = ''
__mongo_db = ''
__mongo_user = ''
__mongo_pass = ''


@app.route("/")
def index():
    return "Home Page"   

@app.route("/teste_nuclear")
def teste_nuclear():
    spark = initSpark()
    sv = spark.version
    version = subprocess.check_output(['java', '-version'], stderr=subprocess.STDOUT)
    return version

@app.route("/save_to_mapping_schema_list", methods=["POST"])
def save_to_mapping_schema_list():
    config_object = ConfigParser()
    with open('config.ini', 'r', encoding='utf-8') as f:
        config_object.readfp(f)
    ## If key exists in config and it's not empty, uses config file params
    if "JDBCCONFIG" in config_object:
        if config_object.items("MONGOCONFIG") != None:
            __mongo_host = config_object.get("MONGOCONFIG", "mongo_host")
            __mongo_port = config_object.get("MONGOCONFIG", "mongo_port")
            __mongo_db = config_object.get("MONGOCONFIG", "mongo_db")
            __mongo_user = config_object.get("MONGOCONFIG", "mongo_user")
            __mongo_pass = config_object.get("MONGOCONFIG", "mongo_pass")

    ## If there are environment variables defined for the paramenters, use envvars instead
    if os.environ.get('HARMONIZATION_MONGO_HOST'): __mongo_host = os.environ.get('HARMONIZATION_MONGO_HOST')
    if os.environ.get('HARMONIZATION_MONGO_PORT'): __mongo_port = os.environ.get('HARMONIZATION_MONGO_PORT')
    if os.environ.get('HARMONIZATION_MONGO_DB'): __mongo_db = os.environ.get('HARMONIZATION_MONGO_DB')
    if os.environ.get('HARMONIZATION_MONGO_USER'): __mongo_user = os.environ.get('HARMONIZATION_MONGO_USER')
    if os.environ.get('HARMONIZATION_MONGO_PASS'): __mongo_pass = os.environ.get('HARMONIZATION_MONGO_PASS')

    
    if request.is_json:
        data = request.get_json()
    print(data)
    myclient = pymongo.MongoClient("mongodb://" + __mongo_user + ":" + __mongo_pass + "@" + __mongo_host + ":" + __mongo_port + "/?authSource=admin&readPreference=primary&ssl=false" )
    mydb = myclient[__mongo_db]
    mycol = mydb["mapping_schema_list"]
    mycol.insert_one({'schema_type':data['schema_type'], 'mapping_schema_name': data['mapping_schema_name']})

    return "Success"

@app.route("/get_mapping_schema_list", methods=["GET"])
def get_mapping_schema_list():
    config_object = ConfigParser()
    with open('config.ini', 'r', encoding='utf-8') as f:
        config_object.readfp(f)
    ## If key exists in config and it's not empty, uses config file params
    if "JDBCCONFIG" in config_object:
        if config_object.items("MONGOCONFIG") != None:
            __mongo_host = config_object.get("MONGOCONFIG", "mongo_host")
            __mongo_port = config_object.get("MONGOCONFIG", "mongo_port")
            __mongo_db = config_object.get("MONGOCONFIG", "mongo_db")
            __mongo_user = config_object.get("MONGOCONFIG", "mongo_user")
            __mongo_pass = config_object.get("MONGOCONFIG", "mongo_pass")

    ## If there are environment variables defined for the paramenters, use envvars instead
    if os.environ.get('HARMONIZATION_MONGO_HOST'): __mongo_host = os.environ.get('HARMONIZATION_MONGO_HOST')
    if os.environ.get('HARMONIZATION_MONGO_PORT'): __mongo_port = os.environ.get('HARMONIZATION_MONGO_PORT')
    if os.environ.get('HARMONIZATION_MONGO_DB'): __mongo_db = os.environ.get('HARMONIZATION_MONGO_DB')
    if os.environ.get('HARMONIZATION_MONGO_USER'): __mongo_user = os.environ.get('HARMONIZATION_MONGO_USER')
    if os.environ.get('HARMONIZATION_MONGO_PASS'): __mongo_pass = os.environ.get('HARMONIZATION_MONGO_PASS')


    myclient = pymongo.MongoClient("mongodb://" + __mongo_user + ":" + __mongo_pass + "@" + __mongo_host + ":" + __mongo_port + "/?authSource=admin&readPreference=primary&ssl=false" )
    mydb = myclient[__mongo_db]
    mycol = mydb["mapping_schema_list"]
    cursor = mycol.find({})
    data = []
    for document in cursor:
        document = document.pop('mapping_schema_name')
        data.append(document)
    data = json.dumps(data)
    print(data)
    return data


@app.route("/get_nlp_schema", methods=["POST"])
def get_nlp_schema():

    if request.is_json:
        data = request.get_json()

    if 'data_type' in data:
        data_type = data['data_type']
        print(data_type)
    if 'type' in data:
        type = data['type']
        print(type)
    if 'params' in data:
        params = data['params']
        print(params)

    spark = initSpark()

    results = nlpSchemaCreation(spark, type, data_type, params)
    
    return results


@app.route("/update_config", methods=["POST"])
def update_config():
    parser = ConfigParser()
    with open('config.ini', 'r', encoding='utf-8') as f:
        parser.readfp(f)
    #parser.add_section('JDBCCONFIG')
    if request.is_json:
        data = request.get_json()
        db_type = data['output_db_type']
        if db_type == "jdbc":
            params = data['params']
            parser.set('JDBCCONFIG', 'jdbc_url', params['url'])
            parser.set('JDBCCONFIG', 'jdbc_port', params['port'])
            parser.set('JDBCCONFIG', 'jdbc_db', params['db'])
            parser.set('JDBCCONFIG', 'jdbc_user', params['user'])
            parser.set('JDBCCONFIG', 'jdbc_pass', params['pass'])
            parser.set('JDBCCONFIG', 'jdbc_driver', params['driver'])
            with open('config.ini', 'w') as config_file:
                parser.write(config_file)

    return "Success"
'''
function ingestBatchEndpoint - Starts a Spark batch data ingestion task
request data - JSON
{
    name: Unique name for this data source
    task: ['ingest': Data ingestion only, 'harmonize': Data ingestion and harmonization]
    type: ['webservice', 'ftp', 'file', 'database']
    data_type: ['weather', 'ais']
    params: Parameters according to the 'type' of data source
            Example for file:
                params: {
                    file_type: ['csv', 'json', 'netcdf']
                    file_path: Absolute path for the file
                } 
            Example for webservice:
                params: {
                    url: URL String of the Web Service
                    data_type: ['json']

                }
    mapping_schema: Harmonization mapping schema for the data source. Check Vessel-AI's deliverable D2.1
} 
'''
@app.route("/data/ingest_batch", methods=["POST"])
def ingestBatchEndpoint():

    config_object = ConfigParser()
    config_object.read("config.ini")
    ## If key exists in config and it's not empty, uses config file params
    if "JDBCCONFIG" in config_object:
        if config_object.items("JDBCCONFIG") != None:
            __jdbc_url = config_object.get("JDBCCONFIG", "jdbc_url")
            __jdbc_port = config_object.get("JDBCCONFIG", "jdbc_port")
            __jdbc_db = config_object.get("JDBCCONFIG", "jdbc_db")
            __jdbc_user = config_object.get("JDBCCONFIG", "jdbc_user")
            __jdbc_pass = config_object.get("JDBCCONFIG", "jdbc_pass")
            __jdbc_driver = config_object.get("JDBCCONFIG", "jdbc_driver")

    ## If there are environment variables defined for the paramenters, use envvars instead
    if os.environ.get('HARMONIZATION_JDBC_URL'): __jdbc_url = os.environ.get('HARMONIZATION_JDBC_URL')
    if os.environ.get('HARMONIZATION_JDBC_PORT'): __jdbc_port = os.environ.get('HARMONIZATION_JDBC_PORT')
    if os.environ.get('HARMONIZATION_JDBC_DB'): __jdbc_db = os.environ.get('HARMONIZATION_JDBC_DB')
    if os.environ.get('HARMONIZATION_JDBC_USER'): __jdbc_user = os.environ.get('HARMONIZATION_JDBC_USER')
    if os.environ.get('HARMONIZATION_JDBC_PASS'): __jdbc_pass = os.environ.get('HARMONIZATION_JDBC_PASS')
    if os.environ.get('HARMONIZATION_JDBC_DRIVER'): __jdbc_pass = os.environ.get('HARMONIZATION_JDBC_PASS')

    if request.is_json:
        data = request.get_json()
        name = ''
        task = ''
        type = ''
        params = {}
        data_type = ''
        mapping_schema = ''

        # Check if all API request params exist
        if 'name' in data:
            name = data['name']
        else:
            return make_response('Error: Missing "name" parameter', 404)
        if 'task' in data:
            task = data['task']
        else:
            return make_response('Error: Missing "task" parameter', 404)
        if 'type' in data:
            type = data['type']
        else:
            return make_response('Error: Missing "type" parameter', 404)
        if 'data_type' in data:
            data_type = data['data_type']
        else:
            return make_response('Error: Missing "data_type" parameter', 404)
        if 'params' in data:
            params = data['params']
        else:
            return make_response('Error: Missing "params" parameter', 404)
        if 'mapping_schema' in data:
            mapping_schema = data['mapping_schema']
        else:
            return make_response('Error: Missing "mapping_schema" parameter', 404)
        # if 'db_table' in params:
        #     db_table = params['db_table']
        # else:
        #     return make_response('Error: Missing "db_table" parameter', 404)
        # if 'db_schema' in params:
        #     db_schema = params['db_schema']
        # else:
        #     return make_response('Error: Missing "db_schema" parameter', 404)

        spark = initSpark()
        db_table = params['db_table']
        #db_schema = params['db_schema']
        
        db_type = data["output_db_type"]
        if db_type == "jdbc":
            df = ingestBatchTask(spark, type, data_type, params, mapping_schema)
            dbparams={
                "url": __jdbc_url,
                "port" : __jdbc_port,
                "db" : __jdbc_db,
                "dbtable" : db_table,
                "user": __jdbc_user,
                "password" : __jdbc_pass,
                "driver" : __jdbc_driver
            }
            
            print(dbparams)
            print(df.head(5))
            #myhost = __jdbc_url.replace("monetdb://", "")
            # conn = pymonetdb.connect(username=__jdbc_user, password=__jdbc_pass, hostname=myhost, database=__jdbc_db)
            # cursor = conn.cursor()
            # cursor.execute("CREATE SCHEMA IF NOT EXISTS " + str(db_schema))
            # cursor.execute("SET SCHEMA " + str(db_schema))
            # cursor.execute("SET ROLE writer")
            storeToJDBC(df, dbparams)
            # conn.commit()
            # cursor.close()
            # conn.close()
        elif db_type == "mongo":
            df = ingestBatchTask(spark, type, data_type, params, mapping_schema)
            storeToMongo(df, db_table)
            
        return make_response('Success', 200)
    return make_response('Error: Request parameters are not in JSON format', 404) 

@app.route("/data/upload_file", methods=['POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        f.save('/opt/bitnami/spark/files/' + request.form['filename'])
        
        return('Success', 200)

    return make_response('Error: Bad Request', 404)    

@app.route("/data/remove_all_cronjob")
def remove_all_cronjob():
    removeAllCronjob()
    return make_response('Success', 200)

@app.route("/monetdb/query")
def monetdb_query():
    query = request.form['query']

    myhost = __jdbc_url.replace("monetdb://", "")
    conn = pymonetdb.connect(username='uninova', password='grisgris123', hostname=myhost, database='vesselai')

    cur = conn.cursor()

    cur.execute(query)
    
    print(cur.fetchall())
    resposta = cur.fetchall()
    return str(resposta)

'''
function ingestStreamEndpoint - Starts a Spark Streaming data ingestion task
request data - JSON
{
    name: Unique name for this data source
    task: ['ingest': Data ingestion only, 'harmonize': Data ingestion and harmonization, 'stop': Stop the stream ingestion]
    type: ['kafka', 'mqtt'(TODO), 'rabbitmq'(TODO)]
    data_type: ['weather', 'ais']
    params: Parameters according to the 'type' of data source
            Example for 'kafka':
                params: {
                    kafka_url: URL of the Kafka broker
                    kafka_topic: Kafka topic to consume 
                } 
    mapping_schema: Harmonization mapping schema for the data source. Check Vessel-AI's deliverable D2.1
} 
'''
@app.route("/data/ingest_stream", methods=["POST"])
def ingestStreamEndpoint():
    if request.is_json:
        #os.remove('data.json')
        if os.path.exists('data.json'):
            os.remove('data.json')
        data = request.get_json()
        name = ''
        task = ''
        type = ''
        params = {}
        mapping_schema = ''

        # Check if all API request params exist
        if 'name' in data:
            name = data['name']
        else:
            return make_response('Error: Missing "name" parameter', 404)
        if 'task' in data:
            task = data['task']
        else:
            return make_response('Error: Missing "task" parameter', 404)
        if 'type' in data:
            type = data['type']
        else:
            return make_response('Error: Missing "type" parameter', 404)
        if 'data_type' in data:
            data_type = data['data_type']
        else:
            return make_response('Error: Missing "data_type" parameter', 404)
        if 'params' in data:
            params = data['params']
        else:
            return make_response('Error: Missing "params" parameter', 404)
        if 'mapping_schema' in data:
            if task == 'harmonize':
                mapping_schema = data['mapping_schema']
        else:
            return make_response('Error: Missing "mapping_schema" parameter', 404)

        spark = initSpark()
        db_table = params['db_table']
        broker = params['broker']
        
        output_topic = params['output_topic']
        db_type = data["output_db_type"]
        # if db_type == 'jdbc':
        #     db_schema = params['db_schema']
        
        
        if db_type == "jdbc":
            df = ingestStreamTask(spark, type, data_type, params, mapping_schema)
            dbparams={
                "url": __jdbc_url,
                "port" : __jdbc_port,
                "db" : __jdbc_db,
                "dbtable" : db_table,
                "user": __jdbc_user,
                "password" : __jdbc_pass,
                "driver" : __jdbc_driver
            }
            # myhost = __jdbc_url.replace("monetdb://", "")
            # conn = pymonetdb.connect(username=__jdbc_user, password=__jdbc_pass, hostname=myhost, database=__jdbc_db)
            # cursor = conn.cursor()
            # cursor.execute("CREATE SCHEMA IF NOT EXISTS " + str(db_schema))
            # cursor.execute("SET SCHEMA " + str(db_schema))
            #cursor.execute("SET ROLE writer")
            storeToJDBC(df, dbparams)
            # conn.commit()
            # cursor.close()
            # conn.close()
        elif db_type == "mongo":
            df = ingestStreamTask(spark, type, data_type, params, mapping_schema)
            storeToMongo(df, db_table)
            #topic= '26jantest_harmo'
            #broker = 'kafka.bectr.grisenergia.pt:35066'
            sendToKafka(df,broker,output_topic)
            
        return make_response('Success', 200)
    return make_response('Error: Request parameters are not in JSON format', 404) 
        




# Run Server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5002')
