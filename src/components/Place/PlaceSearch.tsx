/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { css } from "@emotion/react";
import { LocationType } from "../../model/location";

export function SearchGoogle(props: {
  setLocation: React.Dispatch<React.SetStateAction<LocationType>>;
  lat?: number;
  lng?: number;
}) {
  const { setLocation, lat = 37.5313805, lng = 126.9798839 } = props;
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  // @ts-ignore
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY_DATA;

  useEffect(() => {
    if (selectedPlace?.geometry?.location) {
      const lat = selectedPlace.geometry.location.lat();
      const lng = selectedPlace.geometry.location.lng();
      setLocation({
        placeName: selectedPlace.formatted_address ?? "",
        longitude: lng.toString(),
        latitude: lat.toString(),
      });
    }
  }, [lat, lng, selectedPlace, setLocation]);

  return (
    <div
      css={css`
        width: 600px;
        height: 600px;
      `}
    >
      <APIProvider
        apiKey={API_KEY}
        solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
      >
        <Map
          mapId="bf51a910020fa25a"
          defaultZoom={20}
          defaultCenter={{ lat: lat, lng: lng }}
          gestureHandling="greedy"
          zoomControl={true}
          streetViewControl={true}
          mapTypeControl={true}
          cameraControl={false}
          rotateControl={false}
          fullscreenControl={true}
          mapTypeId="terrain"
        >
          <AdvancedMarker ref={markerRef} position={null} />
        </Map>
        <MapControl position={ControlPosition.TOP}>
          <div className="autocomplete-control">
            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
          </div>
        </MapControl>
        <MapHandler place={selectedPlace} marker={marker} />
      </APIProvider>
    </div>
  );
}

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
};

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input ref={inputRef} />
    </div>
  );
};
