// Mock data for the application

export const mockLocations = [
  "Downtown Plaza, 123 Main Street",
  "Central Station, Railway Road",
  "Airport Terminal 1",
  "Shopping Mall, Park Avenue",
  "Business District, Tower Street",
  "University Campus, College Road",
  "Riverside Park, Water Street",
  "City Hospital, Medical Center",
  "Tech Park, Innovation Drive",
  "Beach Resort, Coastal Highway",
  "Old Town Market, Heritage Lane",
  "Sports Stadium, Victory Road",
];

export const vehicleTypes = [
  {
    id: "economy",
    name: "Economy",
    description: "Affordable rides for everyday travel",
    capacity: 4,
    baseFare: 40,
    perKmRate: 12,
    icon: "🚗",
    features: ["AC", "Comfortable Seats"],
  },
  {
    id: "comfort",
    name: "Comfort",
    description: "Premium sedans with extra space",
    capacity: 4,
    baseFare: 60,
    perKmRate: 18,
    icon: "🚙",
    features: ["AC", "Premium Interior", "More Legroom"],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Luxury cars for a premium experience",
    capacity: 4,
    baseFare: 100,
    perKmRate: 25,
    icon: "🚘",
    features: ["AC", "Luxury Interior", "Professional Driver", "Wifi"],
  },
  {
    id: "xl",
    name: "XL",
    description: "Spacious SUVs for groups",
    capacity: 6,
    baseFare: 80,
    perKmRate: 22,
    icon: "🚐",
    features: ["AC", "Extra Space", "6 Seats", "Luggage Space"],
  },
];
