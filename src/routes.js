import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateUserForm from './views/CreateUser';
import UpdateUserForm from './views/UpdateUser';
import PaymentForm from './views/Payment';
import TransactionsTable from './views/Transactions';

const RoutesView = () => {
  return (
    <Routes>
      <Route path="/" element={<PaymentForm />} />
      <Route path="create-user" element={<CreateUserForm />} />
      <Route path='view-transactions' element={<TransactionsTable /> }/>
      <Route path="update-user" element={<UpdateUserForm />} />
    </Routes>
  );
};

export default RoutesView;