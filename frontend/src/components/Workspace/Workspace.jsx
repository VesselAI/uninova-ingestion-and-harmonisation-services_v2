import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Workspace.css'
import Dropdown from "../Dropdowns/Dropdown";

function Workspace() {
    
    return (
        <Container>
            <h1>Data Ingest</h1>
            <Row >
                <Col xs={1}>
                    Type
                </Col>
                <Col>
                    <Dropdown></Dropdown>
                </Col>
            </Row>
            <Row >
                <Col xs={1}>
                    Connection
                </Col>
                <Col>
                    <Dropdown></Dropdown>
                </Col>
            </Row> 
            <Row >
                Caixa Gigante
            </Row>    
        </Container>
    );
}

export default Workspace;
