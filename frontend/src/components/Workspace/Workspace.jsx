import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from "../Dropdowns/Dropdown";
import FileForm from '../Forms/FileForm';
import DatabaseForm from '../Forms/DatabaseForm';
import WebserviceForm from '../Forms/WebserviceForm';
import './Workspace.css'

function Workspace() {


    const [ingestionData, setIngestionData] = useState({
        name: "",
        task: "",
        type: "",
        params: {},
        data_type: "",
        mapping_schema: ""
    })

    const [params, setParams] = useState({});

    return (
        <Container>
            <h1>Data Ingest</h1>
            <Row className="box">
                <Col className="text-right" xs={2}>
                    Select Data Type
                </Col>
                <Col>
                    <Dropdown type='data_type' defaultValue='Type of Data' options={['AIS', 'Weather']} data={ingestionData} setData={setIngestionData}></Dropdown>
                </Col>
            </Row>
            <Row className="box">
                <Col className="text-right" xs={2}>
                    Select Connection
                </Col>
                <Col>
                    <Dropdown type='type' defaultValue='Connection option' options={['File', 'Database', 'Webservice']} data={ingestionData} setData={setIngestionData} setParams={setParams}></Dropdown>
                </Col>
            </Row>
            <Row>
                {ingestionData.type === 'File' && (
                    <FileForm fileForm={params} setFileForm={setParams} ingestionData={ingestionData} setIngestionData={setIngestionData}/>
                )}
                {ingestionData.type === 'Database' && (
                    <DatabaseForm databaseForm={params} setDatabaseForm={setParams} ingestionData={ingestionData} setIngestionData={setIngestionData}/>
                )}
                {ingestionData.type === 'Webservice' && (
                    <WebserviceForm webForm={params} setWebForm={setParams} ingestionData={ingestionData} setIngestionData={setIngestionData}/>
                )}
            </Row>
        </Container>
    );
}

export default Workspace;
