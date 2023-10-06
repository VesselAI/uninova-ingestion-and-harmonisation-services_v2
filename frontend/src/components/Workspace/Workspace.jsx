import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from "../Dropdowns/Dropdown";
import FileForm from '../Forms/FileForm';
import DatabaseForm from '../Forms/DatabaseForm';
import WebserviceForm from '../Forms/WebserviceForm';
import { useContext } from 'react';
import DataContext from '../../context/IngestionDataProvider';
import './Workspace.css'

function Workspace() {

    const {ingestionData, updateIngestionData, params, updateParams} = useContext(DataContext);

    return (
        <Container>
            <h1>Data Ingest</h1>
            <Row className="box">
                <Col className="text-right" xs={2}>
                    Select Data Type
                </Col>
                <Col>
                    <Dropdown type='data_type' defaultValue='Type of Data' options={['Ais', 'Weather']} data={ingestionData} setData={updateIngestionData}></Dropdown>
                </Col>
            </Row>
            <Row className="box">
                <Col className="text-right" xs={2}>
                    Select Connection
                </Col>
                <Col>
                    <Dropdown type='type' defaultValue='Connection option' options={['File', 'Database', 'Webservice']} data={ingestionData} setData={updateIngestionData} setParams={updateParams}></Dropdown>
                </Col>
            </Row>
            <Row>
                {ingestionData.type === 'File' && (
                    <FileForm/>
                )}
                {ingestionData.type === 'Database' && (
                    <DatabaseForm />
                )}
                {ingestionData.type === 'Webservice' && (
                    <WebserviceForm />
                )}
            </Row>
        </Container>
    );
}

export default Workspace;
