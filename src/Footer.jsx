import React from 'react';
import { Icon } from '@iconify/react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Explore</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="https://www.sovereigngroup.com/our-services/">Sovereign Group</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact us</h3>
                    <ul>
                        <li><a href="#"><Icon fontSize="24px" icon="mdi:instagram" /> Instagram</a></li>
                        <li><a href="#"><Icon fontSize="24px" icon="mdi:facebook" /> Facebook</a></li>
                        <li><a href="mailto:kareemy9000@gmail.com">kareemy9000@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright 2024 Sovereign GPT</p>
            </div>
        </footer>
    );
}

export default Footer;
