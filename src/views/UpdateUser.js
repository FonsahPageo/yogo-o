import { React, useState } from "react";
// import axios from "axios";
import '../assets/css/style.css';
import '../assets/css/header.css';
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';


function UpdateUserForm() {

    const [user_id, setUserId] = useState('');
    const [new_balance, setNewBalance] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the request body
        const requestBody = {
            user_id: user_id,
            new_balance: parseFloat(new_balance),
        };

        // Make the HTTP request to update the balance
        fetch('http://localhost:5000/updatebalance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message); // Display success message
                // Reset the form inputs
                setUserId('');
                setNewBalance('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit} method="POST" className="create-user-form">
                <h2>Update Balance</h2>
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={user_id}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div>
                    <label>New Balance:</label>
                    <input
                        type="text"
                        value={new_balance}
                        onChange={(e) => setNewBalance(e.target.value)}
                    />
                </div>
                <button type="submit">Update Balance</button>
            </form>
        </div>
    )
}

export default UpdateUserForm;