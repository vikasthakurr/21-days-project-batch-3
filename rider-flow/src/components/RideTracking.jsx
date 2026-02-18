import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { Car, MapPin, Phone, X, Navigation2, Clock } from "lucide-react";

const TRACKING_STATES = {
  SEARCHING: "Searching for nearby drivers...",
  ASSIGNED: "Driver assigned",
  EN_ROUTE: "Driver is on the way",
  ARRIVING: "Driver is arriving",
  ARRIVED: "Driver has arrived",
};

const RideTracking = () => {
  const navigate = useNavigate();
  const { bookingData, resetBooking } = useBooking();
  const [trackingState, setTrackingState] = useState("SEARCHING");
  const [eta, setEta] = useState(5);
  const [progress, setProgress] = useState(0);

  const { selectedVehicle, pickup, dropoff, fare } = bookingData;

  // Simulate driver progress
  useEffect(() => {
    const states = ["SEARCHING", "ASSIGNED", "EN_ROUTE", "ARRIVING", "ARRIVED"];
    let currentIndex = 0;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    const stateInterval = setInterval(() => {
      if (currentIndex < states.length - 1) {
        currentIndex++;
        setTrackingState(states[currentIndex]);

        // Update ETA as driver gets closer
        if (currentIndex === 1) setEta(4); // Assigned
        if (currentIndex === 2) setEta(3); // En route
        if (currentIndex === 3) setEta(1); // Arriving
        if (currentIndex === 4) setEta(0); // Arrived
      }
    }, 4000); // Change state every 4 seconds

    return () => {
      clearInterval(progressInterval);
      clearInterval(stateInterval);
    };
  }, []);

  // Redirect if no booking (after hooks)
  if (!selectedVehicle) {
    navigate("/");
    return null;
  }

  const handleCancelRide = () => {
    if (confirm("Are you sure you want to cancel this ride?")) {
      resetBooking();
      navigate("/");
    }
  };

  const handleCallDriver = () => {
    alert("📞 Calling driver...");
    //todo
    //you can call phone dummy api to mock a phone call
  };

  // Mock driver data
  const driver = {
    name: "Rajesh Kumar",
    rating: 4.8,
    vehicle: `${selectedVehicle.name} - White`,
    plate: "DL 07 AB 1234",
    phone: "+91 98765 43210",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Map Area (Simulated) */}
      <div className="flex-1 map-background relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <button onClick={() => navigate("/")} className="back-button">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Map Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-full mb-4 shadow-lg">
              <Car className="w-10 h-10 text-white" />
            </div>

            {/* ETA Badge */}
            {trackingState !== "ARRIVED" && (
              <div className="inline-block bg-white px-6 py-3 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-gray-900">
                    {eta} min away
                  </span>
                </div>
              </div>
            )}

            {trackingState === "ARRIVED" && (
              <div className="inline-block bg-success px-6 py-3 rounded-full shadow-lg">
                <span className="font-semibold text-white">
                  Driver has arrived!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Bottom Sheet with Driver Info */}
      <div className="bottom-sheet">
        {/* Status */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <h2 className="text-2xl font-bold text-gray-900">
            {TRACKING_STATES[trackingState]}
          </h2>
        </div>

        {/* Driver Card */}
        {trackingState !== "SEARCHING" && (
          <div className="clean-card mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {/* Driver Avatar */}
                <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {driver.name.charAt(0)}
                </div>

                {/* Driver Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {driver.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>⭐ {driver.rating}</span>
                    <span>•</span>
                    <span>{driver.vehicle}</span>
                  </div>
                  <p className="text-sm font-mono text-gray-700">
                    {driver.plate}
                  </p>
                </div>
              </div>

              {/* Call Button */}
              <button onClick={handleCallDriver} className="back-button">
                <Phone className="w-5 h-5 text-green-600" />
              </button>
            </div>
          </div>
        )}

        {/* Trip Details */}
        <div className="clean-card mb-4">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-1 mt-1">
              <div className="location-dot location-dot-pickup"></div>
              <div className="route-line"></div>
              <div className="location-dot location-dot-dropoff"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="text-gray-900 font-medium">{pickup}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dropoff</p>
                <p className="text-gray-900 font-medium">{dropoff}</p>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Fare */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Total Fare</span>
            <span className="price-large">₹{Math.round(fare * 1.12)}</span>
          </div>
        </div>

        {/* Cancel Button */}
        {trackingState !== "ARRIVED" && (
          <button
            onClick={handleCancelRide}
            className="w-full py-3 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors"
          >
            Cancel Ride
          </button>
        )}

        {trackingState === "ARRIVED" && (
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-green-800 font-semibold mb-2">
              🎉 Your ride is here!
            </p>
            <p className="text-sm text-green-700">
              Please proceed to the pickup location
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideTracking;
