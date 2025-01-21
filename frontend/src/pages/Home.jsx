import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import dociq_logo from '../assets/dociq_logo.png';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    // Create references for each block
    const block1Ref = useRef(null);
    const block2Ref = useRef(null);
    const block3Ref = useRef(null);
    const block4Ref = useRef(null);

    const handleLogin = () => {
        navigate('/login/user');
    };

    // Scroll handler function
    const scrollToBlock = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home-container">
            <nav className='home-nav'>
                <ul>
                    <li onClick={() => scrollToBlock(block1Ref)}>Home</li>
                    <li onClick={() => scrollToBlock(block2Ref)}>How?</li>
                    <li onClick={() => scrollToBlock(block3Ref)}>About</li>
                    <li onClick={() => scrollToBlock(block4Ref)}>Contact</li>
                </ul>
            </nav>
            <div className="content-area">
                <div ref={block1Ref} className="block1">
                    <h1><img className='dociq-logo' src={dociq_logo} alt='DocIQ Logo'/>Welcome to DocIQ</h1>
                    <button className="login-btn" onClick={handleLogin}>
                        Login
                    </button>
                </div>
                <div ref={block2Ref} className="block2">
                    <h2>About Us</h2>
                    <p>Discover how we make a difference through innovation and technology.</p>
                </div>
                <div ref={block3Ref} className="block3">
                    <h2>Our Services</h2>
                    <p>Explore the wide range of services we offer to meet your needs.</p>
                </div>
                <div ref={block4Ref} className="block4">
                    <h2>Contact Us</h2>
                    <p>Have questions? We are here to help. Reach out to us anytime!</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
