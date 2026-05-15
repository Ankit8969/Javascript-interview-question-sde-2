import React, { Component, useState, useEffect, useRef } from 'react';
import './style.css';

const InitialSeatLayout = {
  name: 'Moving Booking APP',
  title: 'Booked your seats',
  totalRows: 8,
  seatPerRow: 10,
  seatType: {
    regular: {
      name: 'Regular',
      className: 'regular',
      price: 150,
      seats: [0, 1, 2],
    },
    premium: {
      name: 'Premium',
      className: 'premium',
      price: 250,
      seats: [3, 4, 5],
    },
    vip: { name: 'VIP', className: 'vip', price: 350, seats: [6, 7, 8] },
  },
  currency: 'INR',
};

function getSeatType(seatLayout, ind) {
  if (ind < 3) return seatLayout.seatType.regular;
  else if (ind < 5) return seatLayout.seatType.premium;
  else return seatLayout.seatType.vip;
}

const getSeats = (seatLayout) => {
  let seats = [];
  for (let row = 0; row < seatLayout.totalRows; row++) {
    let seatRow = [];
    let seatInfo = getSeatType(seatLayout, row);
    for (let seat = 0; seat < seatLayout.seatPerRow; seat++) {
      const seatId = `${String.fromCharCode(65 + row)}${seat}`;
      seatRow.push({
        id: seatId,
        seatType: seatInfo.name,
        seatPrice: seatInfo.price,
        className: seatInfo.className,
        isBooked: false,
        row,
        col: seat,
      });
    }
    seats.push(seatRow);
  }
  return seats;
};

const Seat = ({ seatDetail, bookedSeat, handleSeatSelect }) => {
  return (
    <div
      className={`seat ${seatDetail.className} ${
        bookedSeat.has(seatDetail.id) ? 'booked' : ''
      }`}
      onClick={() => handleSeatSelect(seatDetail)}
    >
      {seatDetail.id}
    </div>
  );
};

const CinemaRow = ({ rows, bookedSeat, handleSeatSelect }) => {
  return (
    <div className="rows">
      {rows.map((seat) => (
        <Seat
          key={seat.id}
          bookedSeat={bookedSeat}
          handleSeatSelect={handleSeatSelect}
          seatDetail={seat}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [seat, setSeat] = useState(getSeats(InitialSeatLayout));
  const [bookedSeat, setBookedSeat] = useState(new Set());

  const handleSeatSelect = (seat) => {
    let currentBookedSeat = new Set([...bookedSeat]);
    console.log(seat);
    if (currentBookedSeat.has(seat.id)) {
      currentBookedSeat.delete(seat.id);
    } else {
      currentBookedSeat.add(seat.id);
    }
    setBookedSeat(currentBookedSeat);
  };

  return (
    <div>
      <div className="title">
        <h3>{InitialSeatLayout.name}</h3>
        <h2>{InitialSeatLayout.title}</h2>
      </div>
      <div className="render_seats">
        {seat.map((seatRow, rowIdx) => (
          <CinemaRow
            key={rowIdx}
            rows={seatRow}
            handleSeatSelect={handleSeatSelect}
            bookedSeat={bookedSeat}
          />
        ))}
      </div>
    </div>
  );
}
