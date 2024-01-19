import React from "react";
import '../../assets/css/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="">
                <div className="footer-columns">
                    <div className="footer-column">
                        <h3>Products</h3>
                        <ul>
                            <li><Link to="/">Collect payment</Link></li>
                            <li><Link to="/">Send money</Link></li>
                            <li><Link to="/">Make payment</Link></li>
                            <li><Link to="view-transactions">Transactions</Link></li>
                            <li><Link to="/">Log In/Sign Up</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Contact</h3>
                        <p>123 Main St, City, Country</p>
                        <p>Email: info@example.com</p>
                        <p>Phone: +1 123 456 7890</p>
                    </div>
                    <div className="footer-column">
                        <h3>Additional Info</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;