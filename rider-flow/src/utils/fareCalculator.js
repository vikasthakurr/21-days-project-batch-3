export const calculateDistance = (pickup, dropoff) => {
  if (!pickup || !dropoff) return 0;

  // Simulate random distance between 2-20 km
  const minDistance = 2;
  const maxDistance = 20;
  const distance =
    Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance;

  return parseFloat(distance.toFixed(1));
};

export const calculateFare = (distance, vehicleType) => {
  if (!distance || !vehicleType) return 0;

  const baseFare = vehicleType.baseFare || 50;
  const perKmRate = vehicleType.perKmRate || 15;

  const totalFare = baseFare + distance * perKmRate;

  return Math.round(totalFare);
};

export const calculateDuration = (distance) => {
  if (!distance) return 0;

  const avgSpeed = 30; // km/h
  const hours = distance / avgSpeed;
  const minutes = Math.round(hours * 60);

  return minutes;
};

export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
};
