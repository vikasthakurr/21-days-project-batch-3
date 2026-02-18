import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { mockLocations } from "../data/mockData";
import { MapPin, Navigation2 } from "lucide-react";
import React from "react";

const LocationPicker = () => {
  const navigate = useNavigate();
  const { setLocations } = useBooking();

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);

  const pickupSuggestions = useMemo(() => {
    if (!pickup) return [];
    return mockLocations.filter((loc) =>
      loc.toLowerCase().includes(pickup.toLowerCase()),
    );
  }, [pickup]);

  const dropoffSuggestions = useMemo(() => {
    if (!dropoff) return [];
    return mockLocations.filter((loc) =>
      loc.toLowerCase().includes(dropoff.toLowerCase()),
    );
  }, [dropoff]);

  const handleSwapLocations = () => {
    const temp = pickup;
    setPickup(dropoff);
    setDropoff(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickup || !dropoff) {
      alert("Please enter both pickup and dropoff locations");
      return;
    }

    if (pickup === dropoff) {
      alert("Pickup and dropoff locations must be different");
      return;
    }

    setLocations(pickup, dropoff);
    navigate("/vehicles");
  };

  return (
    <div className="min-h-screen map-background flex flex-col">
      {/* Map Area (Simulated) */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
            <Navigation2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Where to?</h1>
          <p className="text-gray-600">Plan your trip</p>
        </div>
      </div>

      {/* Bottom Sheet - Constrained width for better UX */}
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bottom-sheet animate-fade-in w-full max-w-2xl mx-4"
        >
          {/* Pickup Location */}
          <div className="mb-4 relative">
            <div className="flex items-center gap-3">
              <div className="location-dot location-dot-pickup"></div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => setShowPickupSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowPickupSuggestions(false), 200)
                  }
                  placeholder="Pickup location"
                  className="input-uber"
                  required
                />

                {/* Suggestions */}
                {showPickupSuggestions && pickupSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full suggestions-dropdown">
                    {pickupSuggestions.map((location, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setPickup(location);
                          setShowPickupSuggestions(false);
                        }}
                        className="suggestion-item"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                          <span className="text-sm">{location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-center gap-3 mb-4">
            <div className="route-line ml-1.5"></div>
            <button
              type="button"
              onClick={handleSwapLocations}
              className="back-button"
              title="Swap locations"
            >
              <Navigation2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Dropoff Location */}
          <div className="mb-6 relative">
            <div className="flex items-center gap-3">
              <div className="location-dot location-dot-dropoff"></div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  onFocus={() => setShowDropoffSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowDropoffSuggestions(false), 200)
                  }
                  placeholder="Dropoff location"
                  className="input-uber"
                  required
                />

                {/* Suggestions */}
                {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full suggestions-dropdown">
                    {dropoffSuggestions.map((location, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setDropoff(location);
                          setShowDropoffSuggestions(false);
                        }}
                        className="suggestion-item"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm">{location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-uber">
            Find Rides
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationPicker;
