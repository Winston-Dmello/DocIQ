import PropTypes from 'prop-types';

const DashboardLayout = ({children}) => {
    return <>
        {children}
    </>
}

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;