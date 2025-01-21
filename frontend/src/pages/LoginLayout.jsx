import PropTypes from 'prop-types';
import './LoginLayout.css';

const LoginLayout = ({ children }) => {
  return (
    <>
    <div className="login-container">
        
      <div className="login-box">{children}</div>
    </div>
    </>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginLayout;
