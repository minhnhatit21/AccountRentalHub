import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const C_Datepicker = ({ value, onChange, disabled }) => {
    const today = new Date();
    return (
        <DatePicker
            selected={value}
            onChange={onChange}
            value={value}
            dateFormat="yyyy-MM-dd"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={disabled}
            placeholderText='yyyy-MM-dd'
            minDate={today}
        />
    );
};

export default C_Datepicker;
