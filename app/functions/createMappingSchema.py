import pathlib
import json

path = pathlib.Path().resolve()
path = str(path)

def createMappingSchema(data):

    rawList = data['raw']
    harmonizedList = data['harmonized']
    mapSchemaName = data['mapSchemaName']
    schemaType = data['schemaType']
    type = data['type']

    harmo_schema_name = str(schemaType).replace(' ', '_').lower() + "_harmonization_schema.json"
    mapSchemaJson = {
                        'data_type': schemaType,
                        'is_list': '',
                        'schema': {}
                    }

    mapSchemaJson.update({'type': str(type).lower()})

    if type == 'File':
        mapSchemaJson.update({'is_list': 'false'})
    elif type == 'Webservice':
        # TODO: Define if is list or not
        print('Hello World!')
    elif type == 'Database':
        mapSchemaJson.update({'is_list': 'false'})

    for i in range(len(rawList)):
        entry = harmonizedList[i]

        if schemaType == 'ais':
            if entry != '':
                if 'datetime' in entry:
                    mapSchemaJson['schema'].update({entry:{'type': 'timestamp', 'format': 'yyyy-MM-dd HH:mm:ss', 'path':rawList[i]}})
                elif 'lat' in entry or 'lon' in entry or 'length' in entry or 'width' in entry or 'draft' in entry:
                    mapSchemaJson['schema'].update({entry:{'type': 'double', 'path':rawList[i]}})
                elif 'sog' in entry or 'cog' in entry or 'mmsi' in entry or 'heading' in entry or 'vessel_type' in entry or 'status' in entry or 'cargo' in entry:
                    mapSchemaJson['schema'].update({entry:{'type': 'int', 'path':rawList[i]}})
                else:
                    mapSchemaJson['schema'].update({entry:{'type': 'string', 'path':rawList[i]}})
        
        elif schemaType == 'weather':
            if 'datetime' in entry or 'sunrise_time' in entry or 'sunset_time' in entry:
                mapSchemaJson['schema'].update({entry:{'type': 'timestamp', 'unit':'utc_unix', 'format': 'yyyy-MM-dd HH:mm:ss', 'path':rawList[i]}})
            elif 'provider' in entry or 'country' in entry:
                mapSchemaJson['schema'].update({entry:{'type': 'string', 'path':rawList[i]}})
            else:
                mapSchemaJson['schema'].update({entry:{'type': 'double', 'path':rawList[i]}})
        
        elif schemaType == 'noon_reports':
            f = open(path + "/schemas/" + harmo_schema_name, 'r')
            harmo_schema = json.load(f)
            # TODO: Noon Reports Mapping Schema Creation
            if entry in harmo_schema:
                if harmo_schema[entry]['type'] == 'timestamp':
                    mapSchemaJson['schema'].update({entry:{'type': 'timestamp', 'format': 'yyyy-MM-dd HH:mm:ss', 'path':rawList[i]}})
                elif harmo_schema[entry]['type'] == 'int':
                   mapSchemaJson['schema'].update({entry:{'type': 'int', 'path':rawList[i]}}) 
                elif harmo_schema[entry]['type'] == 'double':
                    mapSchemaJson['schema'].update({entry:{'type': 'double', 'path':rawList[i]}})
                elif harmo_schema[entry]['type'] == 'string':
                    mapSchemaJson['schema'].update({entry:{'type': 'string', 'path':rawList[i]}})

            print('Hello World')

            

    print(mapSchemaJson)

    out_file = open(path + "/schemas/"+ mapSchemaName +".json", "w")

    json.dump(mapSchemaJson, out_file, indent=6)

    return mapSchemaJson