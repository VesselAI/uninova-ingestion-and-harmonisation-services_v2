import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsFill1CircleFill, Bs1Circle, BsFill2CircleFill, Bs2Circle, BsFill3CircleFill, Bs3Circle } from 'react-icons/bs'
import { useEffect, useState } from 'react';

function StepsStack({ curstep }) {

    const [step, setStep] = useState(1)

    useEffect(() => {
        // Code here will run on the first render of the component
        setStep(curstep)

        // You can perform any other actions or side effects here

        // Cleanup function (optional) - it will run when the component unmounts
        return () => {
            // Cleanup code here (if needed)
            setStep(1);
        };
    }, [curstep]); // Empty dependency array means this effect runs once

    return (
        <Stack gap={5}>
            <Row>
                {step === 1 ?
                    <Col xs={4}>
                        <BsFill1CircleFill size={60} />
                    </Col>
                    :
                    <Col xs={4}>
                        <Bs1Circle size={60} />
                    </Col>

                }
                <Col className='stepstack-pos'>
                    <p className='sidebar-middle-text'>Data Collection</p>
                </Col>
            </Row>
            <Row>
                {step === 2 ?
                    <Col xs={4}>
                        <BsFill2CircleFill size={60} />
                    </Col>
                    :
                    <Col xs={4}>
                        <Bs2Circle size={60} />
                    </Col>

                }
                <Col className='stepstack-pos'>
                    <p className='sidebar-middle-text'>Mapping Schema Selection</p>
                </Col>
            </Row>
            <Row>
                {step === 3 ?
                    <Col xs={4}>
                        <BsFill3CircleFill size={60} />
                    </Col>
                    :
                    <Col xs={4}>
                        <Bs3Circle size={60} />
                    </Col>

                }
                <Col className='stepstack-pos'>
                    <p className='sidebar-middle-text'>Harmonization</p>
                </Col>
            </Row>
        </Stack>
    );

}

export default StepsStack;