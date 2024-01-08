import React from 'react';

const BookingForm = () => {
  return (
    <div>
      <div className="border rounded-md mt-2 flex">
        <div className="p-2 grow">
          <label>Check-in:</label>
          <input type="date" />
        </div>
        <div className="p-2 border-l grow">
          <label>Check-out:</label>
          <input type="date" />
        </div>
      </div>
      <div className="mt-2 py-1 px-3">
        <label>Number of Guests:</label>
        <input type="number" className="form-input max-w-24 ml-2" />
      </div>
      <button className="btn btn-primary mt-2">Book Place</button>
    </div>
  );
};

export default BookingForm;
