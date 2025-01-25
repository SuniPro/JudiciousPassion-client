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
  setLocation?: React.Dispatch<React.SetStateAction<LocationType>>;
  lat?: number;
  lng?: number;
  size?: { width: number; height: number };
}) {
  const { setLocation, lat = 37.5313805, lng = 126.9798839, size } = props;
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  // @ts-ignore
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY_DATA;

  useEffect(() => {
    if (selectedPlace?.geometry?.location) {
      if (!setLocation) return;
      setLocation({
        placeName: selectedPlace.formatted_address ?? "",
        longitude: selectedPlace.geometry.location.lng(),
        latitude: selectedPlace.geometry.location.lat(),
      });
    }
    if (!marker) return;
    marker.position = { lat, lng };
  }, [lat, lng, marker, selectedPlace, setLocation]);

  const coordinateSelector = () => {
    if (
      selectedPlace &&
      selectedPlace.geometry &&
      selectedPlace.geometry.location
    ) {
      return {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      };
    }

    return { lat, lng };
  };

  return (
    <div
      css={css`
        width: ${size?.width}px;
        height: ${size?.height}px;
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
          <AdvancedMarker ref={markerRef} position={coordinateSelector()} />
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

    if (!place.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    // setSelectedPlace 를 통해 지정된 좌표를 marker에 반영하여 지도에 marker를 표시합니다.
    marker.position = { lat, lng };
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

  // input 에 입력된 장소를 좌표와 이름, 주소로 치환하여 setPlaceAutocomplete 에 저장합니다.
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
