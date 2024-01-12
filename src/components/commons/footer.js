import React from "react";
import '../../assets/css/footer.css';


const Footer = () => {
    return (
        // <footer className="footer">
        //     <div className="container-footer">
        //         <p>&copy; 2024 YOGO'O. All rights reserved.</p>
        //     </div>
        // </footer>
        <footer className="footer">
            <div className="">
                <div className="footer-columns">
                    <div className="footer-column">
                        <h3>Products</h3>
                        <ul>
                            <li><a href="/">Collect payment</a></li>
                            <li><a href="/">Send money</a></li>
                            <li><a href="/">Make payment</a></li>
                            <li><a href="/">Transactions</a></li>
                            <li><a href="/">Log In/Sign Up</a></li>
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