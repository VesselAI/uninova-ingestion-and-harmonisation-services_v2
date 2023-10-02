

const ingestBatchData = async (data) => {
    const response = await fetch( "http://localhost:5002/data/ingest_batch", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json'},
    });
    return await response.json();
}

const ingestStreamData = async (data) => {
    const response = await fetch( "http://localhost:5002/data/ingest_stream", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json'},
    });
    return await response.json();
}

const testeApi = async () => {
    const response = await fetch("http://localhost:5002/teste_nuclear");
    return await response.text();
}

export {testeApi, ingestBatchData, ingestStreamData};