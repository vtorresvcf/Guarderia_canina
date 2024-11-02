import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = () => {
  const location = { lat: 38.951402, lng: -0.146888 };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAkV6DFmcTTX_s7bVWahtH3sP3zq91coig">
      <GoogleMap
        mapContainerStyle={{ width: "70%", height: "250px", margin: "auto" }}
        center={location}
        zoom={15}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
