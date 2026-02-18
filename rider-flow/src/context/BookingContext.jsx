import { createContext, useContext, useState } from "react";
import {
  calculateDistance,
  calculateFare,
  calculateDuration,
} from "../utils/fareCalculator";
import React from "react";

const BookingContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    pickup: "",
    dropoff: "",
    selectedVehicle: null,
    distance: 0,
    fare: 0,
    duration: 0,
  });

  const setLocations = (pickup, dropoff) => {
    const distance = calculateDistance(pickup, dropoff);

    setBookingData((prev) => ({
      ...prev,
      pickup,
      dropoff,
      distance,
    }));
  };

  const selectVehicle = (vehicle) => {
    const fare = calculateFare(bookingData.distance, vehicle);
    const duration = calculateDuration(bookingData.distance);

    setBookingData((prev) => ({
      ...prev,
      selectedVehicle: vehicle,
      fare,
      duration,
    }));
  };

  const resetBooking = () => {
    setBookingData({
      pickup: "",
      dropoff: "",
      selectedVehicle: null,
      distance: 0,
      fare: 0,
      duration: 0,
    });
  };

  const value = {
    bookingData,
    setLocations,
    selectVehicle,
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
