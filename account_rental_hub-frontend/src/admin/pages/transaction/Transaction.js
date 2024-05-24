import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/partials/pagination';
import TransactionView from './TransactionView';
import { TransactionContext } from '../../context/TransactionContext';

function Transactions() {
  const { transactionList, action, setAction, actions, searchTransactionData, changePage, pageable } = useContext(TransactionContext);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [formData, setFormData] = useState({});

  const handlePageChange = (newPage) => {
    changePage(newPage);
  };

  const handleSearchData = (customerName, userId, startDate, endDate, status) => {
    searchTransactionData(customerName, userId, startDate, endDate, status);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <TransactionView
        transactionList={transactionList}
        action={action}
        pageable={pageable}
        isOpenModal={showTransactionModal}
        onPageChange={handlePageChange}
        onSearchData={handleSearchData}
        onInputChange={handleInputChange}
      />
    </>
  );
}

export default Transactions;