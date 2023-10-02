# - *- coding: utf- 8 - *-
import os
from flask import Flask
#from flask_mongoengine import MongoEngine
from flask_restful import Api
from flask_cors import CORS
from configparser import ConfigParser


## MongoDB
## Default variables
__mongo_host = 'localhost'
__mongo_port = 27018
__mongo_db = 'vesselai-harmonization'
__mongo_user = 'uninova'
__mongo_pass = 'grisgris123'

config_object = ConfigParser()

config_object.read("app/config.ini")

## If key exists in config and it's not empty, uses config file params
if "MONGOCONFIG" in config_object:
    if config_object['MONGOCONFIG'] != None:
        mongoconfig = config_object["MONGOCONFIG"]
        __mongo_host = mongoconfig["mongo_host"]
        __mongo_port = mongoconfig["mongo_port"]
        __mongo_db = mongoconfig["mongo_db"]
        __mongo_user = mongoconfig["mongo_user"]
        __mongo_pass = mongoconfig["mongo_pass"]

## If there are environment variables defined for the paramenters, use envvars instead
if os.environ.get('HARMONIZATION_MONGO_HOST'): __mongo_host = os.environ.get('HARMONIZATION_MONGO_HOST')
if os.environ.get('HARMONIZATION_MONGO_PORT'): __mongo_port = os.environ.get('HARMONIZATION_MONGO_PORT')
if os.environ.get('HARMONIZATION_MONGO_DB'): __mongo_db = os.environ.get('HARMONIZATION_MONGO_DB')
if os.environ.get('HARMONIZATION_MONGO_USER'): __mongo_user = os.environ.get('HARMONIZATION_MONGO_USER')
if os.environ.get('HARMONIZATION_MONGO_PASS'): __mongo_pass = os.environ.get('HARMONIZATION_MONGO_PASS')

## Flask App secret key - prevents CSRF attacks
__secret = os.urandom(24)

# Flask settings - MongoDB connection
#mongo_settings = {
#    'MONGODB_HOST':      __mongo_host,
#    'MONGODB_PORT':      __mongo_port,
#    'MONGODB_DB':        __mongo_db,
#    'MONGODB_USERNAME':  __mongo_user,
#    'MONGODB_PASSWORD':  __mongo_pass
#}

# Flask settings - App
app_settings = {
    'SECRET_KEY': __secret,
    'SESSION_TYPE': 'filesystem'
}

# Init Flask App & update config
app = Flask(__name__)
#app.config.update(mongo_settings)
app.config.update(app_settings)

# Init other Flask components
CORS(app)
#db = MongoEngine()
api = Api(app)

def createApp():
    #db.init_app(app)
    return app