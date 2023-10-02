import Spinner from 'react-bootstrap/Spinner';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileMenu from '../components/ProfileMenu/ProfileMenu';
import SideBar from '../components/SideBar/SideBar';
import './HarmonizationPage.css'

function HarmonizationPage() {

    const [status, setStatus] = useState('loading');

    return (
        <Container fluid>
            <Row className="h-100">
                <Col xs={2} className="p-0">
                    <SideBar step={3} />
                </Col>
                <Col xs={10} className="p-0 canvas-column">
                    <Container fluid className="">
                        <ProfileMenu></ProfileMenu>
                    </Container>
                    <Row className='loading-row'>
                        {status === 'loading' ?
                            <Spinner className='custom-spinner'/>
                        :
                            <p className='loading-text'>Done</p>
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    )
};

export default HarmonizationPage;