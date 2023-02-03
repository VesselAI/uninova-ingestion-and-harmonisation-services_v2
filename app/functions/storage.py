from kafka import KafkaProducer
import json
from datetime import datetime
from pyspark.sql.functions import to_timestamp, col

def storeToMongo(df, db):
    df.write\
    .format("mongo")\
    .mode("append")\
    .option("spark.mongodb.output.uri", "mongodb://uninova:grisgris123@mongo:27017/?authSource=admin&readPreference=primary&ssl=false")\
    .option("spark.mongodb.output.database", "vesselai-harmonization") \
    .option("spark.mongodb.output.collection", db) \
    .save()

def storeToJDBC(df, kwargs):
    df.write\
    .format("jdbc")\
    .mode("append")\
    .option("url", "jdbc:" + kwargs["url"] + ":" + kwargs["port"] + "/" + kwargs["db"]) \
    .option("dbtable", kwargs["dbtable"]) \
    .option("user", kwargs["user"]) \
    .option("password", kwargs["password"]) \
    .option("driver", kwargs["driver"]) \
    .save()

def sendToKafka(df,broker, topic):
    producer = KafkaProducer(bootstrap_servers='kafka.bectr.grisenergia.pt:35066',value_serializer=lambda v: json.dumps(v).encode('utf-8'))

    df = df.withColumn('datetime',(col('datetime').cast('string')))   
    dataCollect = df.collect()
    for row in dataCollect:
        print(row)
        producer.send(topic,json.dumps(row))
    producer.close()

