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


print('End #################################################################');