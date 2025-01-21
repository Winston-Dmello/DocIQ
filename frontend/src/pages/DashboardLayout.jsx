import PropTypes from 'prop-types';
import './DashboardLayout.css';

const DashboardLayout = ({children}) => {
    return <>
        <div className='dashboard-body'>
            <div className='side-bar'>
                <h3 className='app-name'>DocIQ</h3>
            </div>
            <div className='nav-and-main'>
                <nav className='dashboard-nav'>
                    <ul>
                        <li>Home</li>
                        <li>Contact</li>
                        <li>Forms</li>
                        <li>About</li>
                    </ul>
                </nav>
                <div className='main-content'></div>
            </div>
        </div>
    </>
}

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;