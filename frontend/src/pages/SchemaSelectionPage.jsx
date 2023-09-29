// React Imports
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileMenu from '../components/ProfileMenu/ProfileMenu';
import SelectSchema from '../components/SelectSchema/SelectSchema';
// Custom Imports
import SideBar from '../components/SideBar/SideBar';

function SchemaSelectionPage() {

    return (
        <Container fluid>
            <Row className="h-100">
                <Col xs={2} className="p-0">
                    <SideBar step={2}/>
                </Col>
                <Col xs={10} className="p-0 canvas-column">
                    <Row>
                        <ProfileMenu ></ProfileMenu>
                    </Row>
                    <SelectSchema />
                </Col>
            </Row>               
        </Container>
    );
}

export default SchemaSelectionPage;
