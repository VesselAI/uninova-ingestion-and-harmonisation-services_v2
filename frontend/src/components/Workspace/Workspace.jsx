import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from "../Dropdowns/Dropdown";
import FileForm from '../Forms/FileForm';
import DatabaseForm from '../Forms/DatabaseForm';
import WebserviceForm from '../Forms/WebserviceForm';
import ClipboardForm from '../Forms/ClipboardForm';
import { useContext, useState } from 'react';
import DataContext from '../../context/IngestionDataProvider';
import './Workspace.css'

function Workspace() {

    const {ingestionData, updateIngestionData, params, updateParams} = useContext(DataContext);
    const [loading, setLoading] = useState(false);

    return (
        <Container>
            <h1>Data Ingest</h1>
            <Row className="box">
                <Col className="text-right" xs={2}>
                    Select Data Type
                </Col>
                <Col>
                    <Dropdown type='data_type' defaultValue='Type of Data' options={['Ais', 'Weather', 'Noon Reports']} data={ingestionData} setData={updateIngestionData}></Dropdown>
                </Col>
            </Row>
            <Row className="box">
                <Col className="text-right" xs={2}>
                    Select Connection
                </Col>
                <Col>
                    {/* {ingestionData.data_type !== 'Noon Reports' &&
                        <Dropdown type='type' defaultValue='Connection option' options={['File', 'Database', 'Webservice']} data={ingestionData} setData={updateIngestionData} setParams={updateParams}></Dropdown>
                    } */}
                    {/* {ingestionData.data_type === 'Noon Reports' && */}
                    <Dropdown type='type' defaultValue='Connection option' options={['File', 'Database', 'Webservice', 'Copy to Clipboard']} data={ingestionData} setData={updateIngestionData} setParams={updateParams}></Dropdown>
                    {/* } */}
                </Col>
            </Row>
            <Row>
                {ingestionData.type === 'File' && (
                    <FileForm setLoading={ setLoading } />
                )}
                {ingestionData.type === 'Database' && (
                    <DatabaseForm />
                )}
                {ingestionData.type === 'Webservice' && (
                    <WebserviceForm />
                )}
                {ingestionData.type === 'Copy to Clipboard' && (
                    <ClipboardForm setLoading={ setLoading } />
                )}
            </Row>
            {loading === true && (
                <Row id="backdrop">
                    <Row class="text-center">
                        <Spinner className="spinner-border-workspace" role="status-clipboard" />
                    </Row>
                </Row>
            )}
        </Container>
    );
}

export default Workspace;
