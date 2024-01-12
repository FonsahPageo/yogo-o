import { React, useState } from "react";
import axios from "axios";
import '../assets/css/style.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CreateUserForm() {

    const [username, setUsername] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5000/createuser', {
                username,
                mobileNumber,
                pinCode
            });

            console.log('User created successfully:', response.data);
            toast.success('User created successfully'); 

            // Clear the input fields
            setUsername('');
            setMobileNumber('');
            setPinCode('');
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            console.log('Failed to create user:', error);
            toast.error('Create user failed');
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} method="POST">
                <h1>Enter payment details</h1>
                {errorMessage && <div>{errorMessage}</div>}


                <label htmlFor="username">Name</label>
                <br />
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter name"
                />
                <br />

                <label htmlFor="mobileNumber">Mobile number</label>
                <br />
                <input
                    type="tel"
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="671234567"
                />
                <br />

                <label htmlFor="pinCode">PIN code</label>
                <br />
                <input
                    type="password"
                    id="pinCode"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="12345"
                    maxLength={5}
                />
                <br />

                <button type="submit">Create User</button>

            </form>
            <ToastContainer />

        </div>
    );
}

export default CreateUserForm;