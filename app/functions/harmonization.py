import json
from pyspark.sql.functions import col
from pyspark.sql.functions import to_timestamp, unix_timestamp, from_unixtime
from utils.general_utils import get_value
import pathlib
from utils.conversion_utils import castType

path = pathlib.Path().resolve()
path = str(path)

def harmonizationTask(df, spark, harmonization_schema):

    df.createOrReplaceTempView("TempView")
    listColumns = df.columns
    types = "select "
    for column in listColumns:
        if harmonization_schema[column]['type'] != "geojson":
            types = types + harmonization_schema[column]['type']+ "(" + column + "),"
    #print(types[:-1])
    df2 = spark.sql(types[:-1] + " from TempView")

    return df2

def dfMapping(harmonization_schema, mapping_schema, df):
    for key in mapping_schema['schema'].keys():
        if 'path' in mapping_schema['schema'][key]:
            df = df.withColumnRenamed(mapping_schema['schema'][key]['path'], key)
    
    for col in df.columns:
        if not col in mapping_schema['schema'].keys():
            df = df.drop(col)
    print('harmonization------------')
    print(df.head(1))
    print(df.printSchema())
    df = castType(harmonization_schema, mapping_schema, df)
    print("CAST TYPE DONE")
    print(df.head(1))
    return df

def get_harmo_schema(data_type):
    if data_type == 'Weather':
        f = open(path + "/schemas/weather_harmonization_schema.json")    
    elif data_type == 'Ais':
        f = open(path + "/schemas/ais_harmonization_schema.json")
    elif data_type == 'noon_reports':
        f = open(path + "/schemas/noon_reports_harmonization_schema.json")
        
    harmonization_schema = json.load(f)
    return harmonization_schema

def get_mapping_schema(map_schema_name):
    # if map_schema_name == "OpenWeatherMap":
    #     f = open(path + "/schemas/openweathermap_mapping.json")
    # elif map_schema_name == "met_no_mapping":
    #     f = open(path + "/schemas/met_no_mapping.json")
    # elif map_schema_name == "mt_ais_mapping":
    #     f = open(path + "/schemas/mt_ais_mapping.json")
    # elif map_schema_name == "nca_ais_mapping":
    #     f = open(path + "/schemas/nca_ais_mapping.json")
    # elif map_schema_name == "stormglass_mapping":
    #     f = open(path + "/schemas/stormglass_mapping.json")
    # elif map_schema_name == "copernicus_mapping":
    #     f = open(path + "/schemas/copernicus_mapping.json")
    # elif map_schema_name == "ais_dk_mapping":
    #     f = open(path + "/schemas/ais_dk_mapping.json")
    # elif map_schema_name == "brest_mapping":
    #     f = open(path + "/schemas/brest_mapping.json")
    # elif map_schema_name == "infore_mapping":
    f = open(path + "/schemas/" + map_schema_name + ".json")
    mapping_schema = json.load(f)
    return mapping_schema

def preProcessJSON(data, mapping_schema, harmonization_schema, spark):

    if mapping_schema['is_list'] == 'true':
        #get list into var
        lista = get_value(mapping_schema['list_path'], data)
    #get all info outside list
    else:
        lista = [data]
    
    data_list = []
    header_list = []

    for elem in lista:
        row = []
        for key in harmonization_schema.keys():
            if key in mapping_schema['schema']:
                if 'value' in mapping_schema['schema'][key]:
                    row.append(mapping_schema['schema'][key]['value'])
                    if key not in header_list:
                        header_list.append(key)
                elif 'path' in mapping_schema['schema'][key]:
                    if 'index' in mapping_schema['schema'][key]:                   
                        if get_value(mapping_schema['schema'][key]['path'], elem) != None:
                            row.append(get_value(mapping_schema['schema'][key]['path'], elem)[mapping_schema['schema'][key]['index']])
                            if key not in header_list:
                                header_list.append(key)
                        elif get_value(mapping_schema['schema'][key]['path'], data) != None:
                            row.append(get_value(mapping_schema['schema'][key]['path'], data)[mapping_schema['schema'][key]['index']])
                            if key not in header_list:
                                header_list.append(key)
                    elif get_value(mapping_schema['schema'][key]['path'], elem) != None:
                        row.append(get_value(mapping_schema['schema'][key]['path'], elem))
                        if key not in header_list:
                            header_list.append(key)
                    elif get_value(mapping_schema['schema'][key]['path'], data) != None:
                        row.append(get_value(mapping_schema['schema'][key]['path'], data))
                        if key not in header_list:
                            header_list.append(key)
                    else:
                        row.append('Null')
                        if key not in header_list:
                            header_list.append(key)

            #else:
            #    row.append('null')
            #    if key not in header_list:
            #        header_list.append(key)
        data_list.append(tuple(row))

    print(header_list)
    print(data_list)
    
    rdd = spark.sparkContext.parallelize(data_list)
    df = rdd.toDF(header_list)
  
    #df = castType(harmonization_schema, df)
    return df