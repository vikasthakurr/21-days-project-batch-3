import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { vehicleTypes } from "../data/mockData";
import { ArrowLeft, Users, Clock } from "lucide-react";

const VehicleSelection = () => {
  const navigate = useNavigate();
  const { bookingData, selectVehicle } = useBooking();
  const [selectedId, setSelectedId] = useState(null);

  if (!bookingData.pickup || !bookingData.dropoff) {
    navigate("/");
    return null;
  }

  const handleVehicleSelect = (vehicle) => {
    setSelectedId(vehicle.id);
    selectVehicle(vehicle);
  };

  const handleContinue = () => {
    if (!selectedId) {
      alert("Please select a vehicle");
      return;
    }
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="header-bar">
        <button onClick={() => navigate("/")} className="back-button">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Choose a ride</h1>
          <p className="text-sm text-gray-500">{bookingData.distance} km</p>
        </div>
      </div>

      {/* Content - Centered with max width */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-2xl p-4 pb-32">
          {/* Trip Summary */}
          <div className="clean-card mb-4">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-1 mt-1">
                <div className="location-dot location-dot-pickup"></div>
                <div className="route-line"></div>
                <div className="location-dot location-dot-dropoff"></div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Pickup</p>
                  <p className="text-gray-900 font-medium">
                    {bookingData.pickup}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dropoff</p>
                  <p className="text-gray-900 font-medium">
                    {bookingData.dropoff}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Options */}
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Available rides
          </h2>
          <div className="space-y-3">
            {vehicleTypes.map((vehicle, index) => {
              const isSelected = selectedId === vehicle.id;
              const estimatedFare = bookingData.distance
                ? vehicle.baseFare + bookingData.distance * vehicle.perKmRate
                : 0;
              const eta = 3 + (index % 4);

              return (
                <div
                  key={vehicle.id}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className={`vehicle-card-uber ${isSelected ? "vehicle-card-uber-selected" : ""}`}
                >
                  {/* Vehicle Icon */}
                  <div className="text-4xl shrink-0">{vehicle.icon}</div>

                  {/* Vehicle Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {vehicle.name}
                      </h3>
                      <div className="text-right">
                        <p className="price-large">
                          ₹{Math.round(estimatedFare)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {vehicle.capacity}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {eta} min
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {vehicle.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button - Also centered with max width */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-center">
        <div className="w-full max-w-2xl p-4">
          <button
            onClick={handleContinue}
            disabled={!selectedId}
            className="btn-uber"
          >
            Confirm{" "}
            {selectedId && vehicleTypes.find((v) => v.id === selectedId)?.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleSelection;
