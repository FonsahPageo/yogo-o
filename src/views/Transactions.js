import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../assets/css/style.css';

const TransactionsTable = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/transactions')
            .then(response => response.json())
            .then(data => setPayments(data.payments))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="history">
            <h1>Transactions history</h1>
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile Number</th>
                        <th>Amount</th>
                        <th>Payment Time</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.id}>
                            <td>{payment.id}</td>
                            <td>{payment.Name}</td>
                            <td>{payment.Number}</td>
                            <td>{payment.Amount}</td>
                            <td>{payment.PaymentTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    );
};

export default TransactionsTable;