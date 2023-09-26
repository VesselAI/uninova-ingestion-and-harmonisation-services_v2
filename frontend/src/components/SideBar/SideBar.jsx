import vesselailogo from "../../assets/Vessel Logo Branco.png"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './SideBar.css'

function SideBar() {
    return (
        // <>
        //     <div className='header-logo-sidebar'>
        //         <div className='logo-i4q-white'>
        //             <img id="project-logo" className="navbar-logo-i4q" src={vesselailogo} alt="vesselailogo" />
        //             <div className='text-logo'>Ingestion and Harmonization Tool</div>
        //         </div>
        //         {/* <div id="linha-horizontal"></div> */}
        //     </div>
        //     <div className="sidebar-style"></div>
        //     <div className='uninova-2023'>
        //         {/* <div id="linha-horizontal-bottom"></div> */}
        //         <p className='uninova-2023-text'>UNINOVA | Copyright© 2023 - All rights reserved</p>
        //     </div>
        // </>
        <Container className="sidebar-base">
            <Row className="sidebar-header">
                <Col xs={3}>
                    <Image src={vesselailogo} fluid/>
                </Col>
                <Col>
                    <h5 className="sidebar-logo-text">Ingestion & Harmonization Tool</h5>
                </Col>
            </Row>
            <Row className="uninova-2023-text">
                <p>UNINOVA | Copyright© 2023 - All rights reserved</p>
            </Row>
        </Container>
    );
}

export default SideBar;
