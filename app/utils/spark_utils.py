from pyspark.sql import SparkSession
from configparser import ConfigParser
import os


def initSpark():
    ## Default variables
    spark_host = "spark"
    spark_port = "7077"

    config_object = ConfigParser()
    config_object.read("app/config.ini")

    ## If key exists in config and it's not empty, uses config file params
    if "SPARKCONFIG" in config_object:
        if config_object['SPARKCONFIG'] != None:
            sparkconfig = config_object["SPARKCONFIG"]
            spark_host = sparkconfig["spark_host"]
            spark_port = sparkconfig["spark_port"]

    ## If there are environment variables defined for the paramenters, use envvars instead
    if os.environ.get('HARMONIZATION_SPARK_HOST'): spark_host = os.environ.get('HARMONIZATION_SPARK_HOST')
    if os.environ.get('HARMONIZATION_SPARK_PORT'): spark_port = os.environ.get('HARMONIZATION_SPARK_PORT')


    spark = SparkSession.builder.master("spark://" + spark_host + ":" + spark_port) \
        .config("spark.submit.deployMode", "client") \
        .config("spark.driver.bindAddress", "0.0.0.0") \
        .config("spark.executor.memory", '8G') \
        .config("spark.executor.cores", '1') \
        .config("spark.mongodb.output.uri", "mongodb://uninova:grisgris123@mongo:27017/?authSource=vesselai-harmonization")\
        .config("spark.jars", "/opt/bitnami/spark/jars/mongo-spark-connector_2.12-3.0.1.jar,/opt/bitnami/spark/jars/mongo-java-driver-3.12.10.jar,/opt/bitnami/spark/jars/postgresql-42.3.0.jar,/opt/bitnami/spark/jars/monetdb-jdbc-3.3.jre8.jar") \
        .getOrCreate()
    return spark