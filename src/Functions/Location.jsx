// Find the Location with Coordinates
async function useReverseGeoLocation(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query
  )}&format=json&limit=3`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Create List and return it
    let locationData = data.map((value, index) => {
      return {
        latitude: value.lat,
        longitude: value.lon,
        address: value.display_name,
      };
    });
    return locationData;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}

export { useReverseGeoLocation };
