import React from "react";
import LocationPicker from "./components/LocationPicker";
import VehicleSelection from "./components/VehicleSelection";
import BookingConfirmation from "./components/BookingConfirmation";
import RideTracking from "./components/RideTracking";
import { BrowserRoutes as Router, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext.jsx";
const App = () => {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LocationPicker />} />
          <Route path="/vehicles" element={<VehicleSelection />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
          <Route path="/tracking" element={<RideTracking />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
};

export default App;
