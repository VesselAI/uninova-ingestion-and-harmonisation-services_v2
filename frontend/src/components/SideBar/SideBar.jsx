// import i4qlogobranco from "./logo branco1.webp"
import vesselailogo from "../../assets/Vessel Logo Branco.png"
import './SideBar.css'

function SideBar() {
    return (
        <>
            <div className='header-logo-sidebar'>
                <div className='logo-i4q-white'>
                    <img id="project-logo" className="navbar-logo-i4q" src={vesselailogo} alt="vesselailogo" />
                    <div className='text-logo'>Ingestion and Harmonization Tool</div>
                </div>
                {/* <div id="linha-horizontal"></div> */}
            </div>
            <div className="sidebar-style"></div>
            <div className='uninova-2023'>
                {/* <div id="linha-horizontal-bottom"></div> */}
                <p className='uninova-2023-text'>UNINOVA | Copyright© 2023 - All rights reserved</p>
            </div>
        </>
    );
}

export default SideBar;
