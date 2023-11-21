

const ingestBatchData = async (data) => {
    const response = await fetch( "http://localhost:5002/data/ingest_batch", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json'},
    });
    return response;
}

const ingestStreamData = async (data) => {
    const response = await fetch( "http://localhost:5002/data/ingest_stream", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json'},
    });
    return response.json();
}

const updateMappingSchemaList = async (data) => {
    const response = await fetch("http://localhost:5002/save_to_mapping_schema_list", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json'},
    });
    return await response.json();
}

const getMappingSchemaList = async () => {
    const response = await fetch("http://localhost:5002/get_mapping_schema_list");
    return response.json();
}

const getNLPSchema = async (data) => {
    const response = await fetch("http://localhost:5002/get_nlp_schema", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json'},
    });
    return await response.json();
}

const getHarmoSchema = async (data) => {
    const response = await fetch("http://localhost:5002/get_harmonization_schema", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json'},
    });
    return response.json();
}

const saveMappingSchema = async (data) => {
    const response = await fetch("http://localhost:5002/save_mapping_schema", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json'},
    });
    return response;
}

const saveClipboardToMongo = async (data) => {
    const response = await fetch("http://localhost:5002/save_clipboard_to_mongo", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json'},
    });
    return response;
}

const testeApi = async () => {
    const response = await fetch("http://localhost:5002/teste_nuclear");
    return await response.text();
}

const uploadFile = async (formData) => {
    const response = await fetch("http://localhost:5002/data/upload_file", {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
}


export {testeApi, ingestBatchData, ingestStreamData, updateMappingSchemaList, getMappingSchemaList, getNLPSchema, getHarmoSchema, saveMappingSchema, saveClipboardToMongo, uploadFile }

