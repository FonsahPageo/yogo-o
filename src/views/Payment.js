import React, { useState } from "react";
import axios from 'axios';
import '../assets/css/style.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from "react-confirm-alert";

function PaymentForm() {

    const [name, setName] = useState('');
    const [momoNumber, setMomoNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [pinSubmitClicked, setPinSubmitClicked] = useState(false);
    const [pinValue, setPinValue] = useState('');

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = async (e, pinSubmitClicked) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const enteredPin = await new Promise((resolve) => {
                confirmAlert({
                    title: 'Enter PIN',
                    message: 'Enter your 5-digit PIN',
                    closeOnClickOutside: false,
                    buttons: [
                        {
                            label: 'Submit',
                            onClick: (value) => {
                                resolve(value);
                            }
                        }
                    ],
                    customUI: ({ onClose }) => {
                        const handlePinChange = (e) => {
                            setErrorMessage('');
                        };

                        const handlePinSubmit = () => {
                            const pinInput = document.getElementById('pin-input');
                            const pinValue = pinInput.value;
                            resolve(pinValue);
                            onClose();
                        };

                        return (
                            <div className="custom-ui">
                                <input
                                    id="pin-input"
                                    type="password"
                                    autoFocus
                                    placeholder="Enter 5-digit PIN"
                                    onChange={handlePinChange}
                                    maxLength={5}
                                />
                                <button onClick={handlePinSubmit}>Submit</button>
                            </div>
                        );
                    }
                });
            });

            if (enteredPin.length !== 5) {
                setErrorMessage('PIN must be 5 digits');
            } else if (enteredPin) {
                const response = await axios.post('http://127.0.0.1:5000/payments', {
                    name: name,
                    momoNumber: momoNumber,
                    amount: amount,
                    pin: enteredPin,
                });
                console.log('Payment sent successfully:', response.data);
                toast.success('Successful Payment');
            } else {
                toast.error('Payment failed');
            }
        } catch (error) {
            setErrorMessage('Please enter your PIN.');
            console.log('Payment error:', error);
            toast.error('Payment error');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} method="POST">
                <h1>Enter payment details</h1>
                {errorMessage && <div>{errorMessage}</div>}

                <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <option value="">Select payment method</option>
                    <option value="mtn-momo">MTN MOMO</option>
                    <option value="orange-momo">Orange MOMO</option>
                </select>
                <br />

                <label htmlFor="name">Name</label>
                <br />
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                />
                <br />

                {paymentMethod === 'mtn-momo' && (
                    <>
                        <label htmlFor="momoNumber">MTN Momo number</label>
                        <br />
                        <input
                            type="tel"
                            id="momoNumber"
                            value={momoNumber}
                            onChange={(e) => setMomoNumber(e.target.value)}
                            placeholder="671234567"
                        />
                        <br />
                    </>
                )}

                {paymentMethod === 'orange-momo' && (
                    <>
                        <label htmlFor="momoNumber">Orange Momo number</label>
                        <br />
                        <input
                            type="tel"
                            id="momoNumber"
                            value={momoNumber}
                            onChange={(e) => setMomoNumber(e.target.value)}
                            placeholder="691234567"
                        />
                        <br />
                    </>
                )}

                <label htmlFor="amount">Amount</label>
                <br />
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />

                <br />

                <button onClick={(e) => handleSubmit(e, false)}>Submit Payment</button>

                {pinSubmitClicked && pinValue.length !== 5 && (
                    <div className="error-message">PIN must be 5 digits</div>
                )}

            </form>

            <ToastContainer />
        </div>
    );
}

export default PaymentForm;