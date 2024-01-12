import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateUserForm from './views/CreateUser';
import PaymentForm from './views/Payment';

const RoutesView = () => {
  return (
    <Routes>
      <Route path="/" element={<PaymentForm />} />
      <Route path="create-user" element={<CreateUserForm />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default RoutesView;