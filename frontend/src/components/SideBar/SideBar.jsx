import vesselailogo from "../../assets/Vessel Logo Branco.png"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import StepsStack from "../StepsStack/StepsStack";
import './SideBar.css'

function SideBar() {
    return (
        <Container className="sidebar-base">
            <Row className="sidebar-header">
                <Col xs={3}>
                    <Image src={vesselailogo} fluid/>
                </Col>
                <Col>
                    <h5 className="sidebar-logo-text">Ingestion & Harmonization Tool</h5>
                </Col>
            </Row>
            <Row className="sidebar-middle">
                    <StepsStack curstep={1}/>
            </Row>
            <Row className="uninova-2023-text">
                <p>UNINOVA | Copyright© 2023 - All rights reserved</p>
            </Row>
        </Container>
    );
}

export default SideBar;
