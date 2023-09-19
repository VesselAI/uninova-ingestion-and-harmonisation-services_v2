// React Imports
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileMenu from '../components/ProfileMenu/ProfileMenu';
import Workspace from '../components/Workspace/Workspace';
// Custom Imports
import SideBar from '../components/SideBar/SideBar';


function MainPage() {

    return (
        <Container fluid>
            <Row className="h-100">
                <Col xs={2} className="p-0">
                    <SideBar/>
                </Col>
                <Col xs={10} className="p-0 canvas-column">
                    <Row>
                        <ProfileMenu></ProfileMenu>
                    </Row>
                    <Workspace />
                </Col>
            </Row>               
        </Container>
    );
}

export default MainPage;
