import Dropdown from 'react-bootstrap/Dropdown';
import { FaUser } from "react-icons/fa";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './ProfileMenu.css'



function ProfileMenu() {

    return (
        <Navbar className="justify-content-end p-0">
            <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                    <div className='user-menu'>
                        <FaUser className='user-logo' size={20}></FaUser>
                        <div className='user-email'>paf@uninova.pt</div>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Activity Log</Dropdown.Item>
                    <Dropdown.Item >Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Navbar>
    )
}

export default ProfileMenu