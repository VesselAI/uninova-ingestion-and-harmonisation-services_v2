from crontab import CronTab
from pyspark.sql.functions import col

def clearSpaces(df):
    for x in df.columns:
        newName = x.replace(" ", "")
        df = df.withColumnRenamed(x, newName)
    return df

def clearSpaceFirstChar(df):
    for x in df.columns:
        if x[0] == " ":
            newName = x[1:]
            df = df.withColumnRenamed(x, newName)
    return df

def get_value(key, data):
    list = key.split(".")
    y = data
    for x in range(len(list)):
        if y.get(list[x]) != None:
            y = y.get(list[x])
        else:
            return None
    return y

def replaceNaN(df):
    df = df.replace(float('nan'), None)
    
    return df

def cleanNullValues(df):
    for column in df.columns:
        df = df.filter(col(column).isNotNull())

    return df

def startCronJob(interval="minutes", deltat=1, types="", data_type="", params="", mapping_schema=""):
    script2run = "bash schedule_ingest_job.sh '" + types + "' '" + data_type + "' '" + params + "' '" + mapping_schema + "'"
    cron = CronTab(user=True)
    job = cron.new(command=script2run)
    if interval == "minutes":
        job.every(deltat).minutes()
    elif interval == "hours":
        job.every(deltat).hours()
    elif interval == "days":
        job.every(deltat).day()
    #cron.remove_all()
    cron.write()
    return None

def removeAllCronjob():
    cron = CronTab(user=True)
    cron.remove_all()
    cron.write()
    return None