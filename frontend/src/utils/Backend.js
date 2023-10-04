

const ingestBatchData = async (data) => {
    const response = await fetch( + "/data/ingest_batch", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json'},
    });
    return await response.json();
}

const ingestStreamData = async (data) => {
    const response = await fetch( + "/data/ingest_stream", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json'},
    });
    return await response.json();
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

const testeApi = async () => {
    const response = await fetch("http://localhost:5002/teste_nuclear")
    console.log(response);
}

export {testeApi, updateMappingSchemaList, getMappingSchemaList }