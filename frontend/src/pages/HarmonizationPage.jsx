import Spinner from 'react-bootstrap/Spinner';
import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ProfileMenu from '../components/ProfileMenu/ProfileMenu';
import SideBar from '../components/SideBar/SideBar';
import { ingestBatchData } from '../utils/Backend';
import DataContext from '../context/IngestionDataProvider';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import './HarmonizationPage.css'

function HarmonizationPage() {

    const [status, setStatus] = useState('loading');
    const navigate = useNavigate();
    const { ingestionData, updateIngestionData, clearIngestionData } = useContext(DataContext);


    useEffect(() => {
        // Code here will run on the first render of the component
        initIngestion();
        // Cleanup function (optional) - it will run when the component unmounts
        return () => {
            // Cleanup code here (if needed)
        };
    }, []); // Empty dependency array means this effect runs once

    const initIngestion = async () => {
        console.log(ingestionData);

        const res = await ingestBatchData(ingestionData);
        setStatus('done');
    }

    const handleSubmit = () => {
        clearIngestionData();
        console.log(ingestionData);
        navigate("/", { replace: true });
    }

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
                            <Spinner className='custom-spinner' />
                            :
                            <FaCheck className='custom-done'></FaCheck>
                        }
                    </Row>
                    <Row className='harmonization-button-continue-row'>
                        <Col md={15} className="text-center">
                            {status === 'done' && (
                                <Button className='harmonization-button-continue' variant="primary" onClick={handleSubmit} > Continue </Button>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
};

export default HarmonizationPage;