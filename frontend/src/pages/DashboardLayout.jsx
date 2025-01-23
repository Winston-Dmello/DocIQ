import PropTypes from 'prop-types';
import './DashboardLayout.css';
import dociq_logo from '../assets/dociq_logo.png';

const DashboardLayout = ({children}) => {
    return <>
        <div className='dashboard-body'>
            <div className='side-bar'>
                <h3 className='app-name'><img className='dociq-logo' src={dociq_logo} alt='DocIQ Logo'/>DocIQ</h3>
            </div>
            <div className='nav-and-main'>
                <div className='nav-container'>
                <nav className='dashboard-nav'>
                    <ul>
                        <li>Home</li>
                        <li>Contact</li>
                        <li>Forms</li>
                        <li>About</li>
                    </ul>
                </nav>
                </div>
                <div className='main-content'>{children}</div>
            </div>
        </div>
    </>
}

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;