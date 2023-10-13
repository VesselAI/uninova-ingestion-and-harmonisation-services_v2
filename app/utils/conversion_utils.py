from pyspark.sql.functions import regexp_replace, col
from pyspark.sql.functions import to_timestamp, from_unixtime
import datetime as dt


def castType(harmonization_schema, mapping_schema, df):
    for key in harmonization_schema.keys():
        if key in df.columns:
            if 'type' in harmonization_schema[key]:
                if harmonization_schema[key]['type']=="string":
                    df = df.withColumn(key, col(key).cast('string'))
                elif harmonization_schema[key]['type']=="integer":
                    df = df.withColumn(key, col(key).cast('integer'))
                elif harmonization_schema[key]['type']=="timestamp":
                    if mapping_schema['schema'][key]['type'] == "utc_unix":
                        df = df.withColumn(key, col(key).cast('integer'))
                        df = df.withColumn(key, from_unixtime(col(key), mapping_schema['schema'][key]['format']))
                    elif mapping_schema['schema'][key]['type'] == "timestamp":
                        df = df.withColumn(key,regexp_replace(col(key), "T", " "))
                        df = df.withColumn(key, to_timestamp(col(key), mapping_schema['schema'][key]['format']))
                elif harmonization_schema[key]['type']=="double":
                    df = df.withColumn(key, col(key).cast('double'))
    
    return df

def convertUnits(spark, df, harmonization_schema, mapping_schema):
    df.createOrReplaceTempView("TempView2")
    listColumns = df.columns
    convs = "select "
    for column in listColumns:
        if 'unit' in harmonization_schema[column] and 'unit' in mapping_schema['schema'][column]:
            if harmonization_schema[column]['unit'] != mapping_schema['schema'][column]['unit']:
                if mapping_schema['schema'][column]['unit'] == 'degrees_Kelvin':
                    convs = convs + column + "-273.15 as " + column + ","
                elif mapping_schema['schema'][column]['unit'] == 'meters':
                    convs = convs + column + "*0.0005399568 as " + column + ","
                elif mapping_schema['schema'][column]['unit'] == 'meter_second':
                    convs = convs + column + "*1.94384449 as " + column + ","
                elif mapping_schema['schema'][column]['unit'] == 'pa':
                    convs = convs + column + "*100 as " + column + ","
            else:
                convs = convs + column + ","
        else:
            convs = convs + column + ","
    #types = "string(main_temp)"
    convs
    df3 = spark.sql(convs[:-1] + " from TempView2")

    return df3