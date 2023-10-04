print('Start #################################################################');

//Admin BD
db = db.getSiblingDB('admin');
db.createUser({
    user: "uninova",
    pwd: "grisgris123",
    roles: ["root"]
});

// UNINOVA Admin database: Stores metadata for operators and workflows, user data and saved workflow data
db = db.getSiblingDB('vesselai-harmonization');

// Operator Metadata collection: Stores metadata for operators
db.createCollection('ais_data');
db.createCollection('weather_data')
db.createCollection('mapping_schema_list')

// Insert mapping schema list into collection
db.mapping_schema_list.insertMany([
    {
        schema_type: "ais",
        mapping_schema_name: "ais_dk_mapping"
    },
    {
        schema_type: "ais",
        mapping_schema_name: "ais_unipi_mapping"
    },
    {
        schema_type: "ais",
        mapping_schema_name: "brest_mapping"
    },
    {
        schema_type: "weather",
        mapping_schema_name: "copenicus_mapping"
    },
    {
        schema_type: "ais",
        mapping_schema_name: "infore_ais_mapping"
    },
    {
        schema_type: "ais",
        mapping_schema_name: "kystverket_mapping"
    },
    {
        schema_type: "weather",
        mapping_schema_name: "met_no_mapping"
    },
    {
        schema_type: "ais",
        mapping_schema_name: "mt_ais_mapping"
    },
    {
        schema_type: "ais",
        mapping_schema_name: "nca_ais_mapping"
    },
    {
        schema_type: "weather",
        mapping_schema_name: "openweathermap_mapping"
    },
    {
        schema_type: "weather",
        mapping_schema_name: "stormglass_mapping"
    },
    {
        schema_type: "noon_reports",
        mapping_schema_name: "vtt_synthetic_noon_reports_mapping"
    },
]);


print('End #################################################################');