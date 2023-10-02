import Spinner from 'react-bootstrap/Spinner';
import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileMenu from '../components/ProfileMenu/ProfileMenu';
import SideBar from '../components/SideBar/SideBar';
import { ingestBatchData } from '../utils/Backend';
import DataContext from '../context/IngestionDataProvider';
import './HarmonizationPage.css'

function HarmonizationPage() {

    const [status, setStatus] = useState('loading');

    const { ingestionData } = useContext(DataContext);

    useEffect( () => {
        // Code here will run on the first render of the component
        const initIngestion = async () => {
            const res = await ingestBatchData()
            setStatus('done')
        }
        initIngestion();
        // Cleanup function (optional) - it will run when the component unmounts
        return () => {
            // Cleanup code here (if needed)
        };
    }, []); // Empty dependency array means this effect runs once

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