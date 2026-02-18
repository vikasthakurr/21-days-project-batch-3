import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import {
  ArrowLeft,
  MapPin,
  Car,
  CreditCard,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { formatDuration } from "../utils/fareCalculator";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { bookingData } = useBooking();

  if (
    !bookingData.pickup ||
    !bookingData.dropoff ||
    !bookingData.selectedVehicle
  ) {
    navigate("/");
    return null;
  }

  const { pickup, dropoff, selectedVehicle, distance, fare, duration } =
    bookingData;

  const handleConfirmBooking = () => {
    // Navigate to tracking screen
    navigate("/tracking");
  };

  const baseFare = selectedVehicle.baseFare;
  const distanceFare = Math.round(distance * selectedVehicle.perKmRate);
  const platformFee = Math.round(fare * 0.05);
  const gst = Math.round((baseFare + distanceFare) * 0.05);
  const totalFare = baseFare + distanceFare + platformFee + gst;

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-black border-b border-white/10 px-5 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/vehicles")}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg font-bold">Confirm Your Trip</h1>
          <p className="text-xs text-white/40">
            Review details before requesting ride
          </p>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
        {/* ROUTE SECTION */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
          <div className="flex gap-4">
            {/* Route Indicator */}
            <div className="flex flex-col items-center mt-1">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-[2px] h-16 bg-uber-green my-1"></div>
              <div className="w-3 h-3 bg-uber-green rounded-full"></div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider">
                  Pickup
                </p>
                <p className="font-semibold">{pickup}</p>
              </div>

              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider">
                  Dropoff
                </p>
                <p className="font-semibold">{dropoff}</p>
              </div>

              <div className="flex justify-between text-sm text-white/60">
                <span>{distance} km</span>
                <span>{formatDuration(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* VEHICLE SECTION */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 flex gap-5 items-center">
          <div className="text-5xl">{selectedVehicle.icon}</div>

          <div className="flex-1">
            <h3 className="text-lg font-bold">{selectedVehicle.name}</h3>
            <p className="text-sm text-white/50 mt-1">
              {selectedVehicle.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {selectedVehicle.features.map((f, i) => (
                <span
                  key={i}
                  className="text-xs bg-white/10 px-2 py-1 rounded-lg text-uber-green"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FARE BREAKDOWN */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-4">
          <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
            Fare Details
          </h4>

          <div className="flex justify-between text-sm">
            <span className="text-white/50">Base Fare</span>
            <span>₹{baseFare}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-white/50">Distance ({distance} km)</span>
            <span>₹{distanceFare}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-white/50">Platform Fee</span>
            <span>₹{platformFee}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-white/50">GST</span>
            <span>₹{gst}</span>
          </div>

          <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{totalFare}</span>
          </div>
        </div>
      </div>

      {/* FIXED BOTTOM CTA */}
      <div className="sticky bottom-0 bg-black border-t border-white/10 p-5">
        <button
          onClick={handleConfirmBooking}
          className="w-full bg-uber-green text-black font-bold py-4 rounded-2xl hover:opacity-90 transition"
        >
          Confirm & Request Ride
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
