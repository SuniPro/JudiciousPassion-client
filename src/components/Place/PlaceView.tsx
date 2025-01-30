/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { css } from "@emotion/react";
import { WaypointType } from "../../model/SaunterType";

export function PlaceView(props: {
  size?: { width: number; height: number };
  lat?: number;
  lng?: number;
  wayPoint?: WaypointType[];
  travelMode?: google.maps.TravelMode;
}) {
  const {
    lat = 37.5288539,
    lng = 126.9640447,
    size = { width: 630, height: 500 },
    wayPoint,
    travelMode,
  } = props;

  // @ts-ignore
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY_DATA;
  const startPoint = wayPoint?.find((wayPoint) => wayPoint.type === "start");

  return (
    <div
      css={css`
        width: ${size.width}px;
        height: ${size.height}px;
      `}
    >
      <APIProvider
        apiKey={API_KEY}
        solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
      >
        <Map
          defaultCenter={{
            lat: startPoint ? startPoint.latitude : lat,
            lng: startPoint ? startPoint.longitude : lng,
          }}
          defaultZoom={13}
          gestureHandling="greedy"
          fullscreenControl={false}
        >
          <Directions wayPoint={wayPoint} travelMode={travelMode} />
        </Map>
      </APIProvider>
    </div>
  );
}

function Directions(props: {
  wayPoint?: WaypointType[];
  travelMode?: google.maps.TravelMode;
}) {
  const { wayPoint, travelMode } = props;

  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<
    google.maps.DirectionsRoute[] | undefined
  >([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes ? routes[routeIndex] : undefined;
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !wayPoint) return;
    const startCoordinate: WaypointType = wayPoint.find(
      (wayPoint) => wayPoint.type === "start",
    )!;
    const stopCoordinate: WaypointType[] = wayPoint
      .filter((wayPoint) => wayPoint.type === "stop")
      .sort((a, b) => a.orderIndex - b.orderIndex)!;
    const endCoordinate: WaypointType = wayPoint.find(
      (wayPoint) => wayPoint.type === "end",
    )!;

    const tryTravelModes = async (
      modes: google.maps.TravelMode[],
      directionsService: google.maps.DirectionsService,
      baseRequest: google.maps.DirectionsRequest,
    ): Promise<google.maps.DirectionsResult> => {
      for (const mode of modes) {
        try {
          const response = await directionsService.route({
            ...baseRequest,
            travelMode: mode,
          });
          if (response.routes.length > 0) {
            return response; // 유효한 경로가 있으면 반환
          }
        } catch (error) {
          console.warn(`Failed to fetch directions with mode ${mode}:`, error);
        }
      }
      throw new Error("No valid routes found with any travel mode."); // 모든 모드 실패 시
    };

    // 요청 생성
    const travelModes: google.maps.TravelMode[] = [
      google.maps.TravelMode.WALKING,
      google.maps.TravelMode.DRIVING,
      google.maps.TravelMode.BICYCLING,
      google.maps.TravelMode.TRANSIT,
    ];

    const baseRequest: google.maps.DirectionsRequest = {
      origin: {
        lat: startCoordinate.latitude,
        lng: startCoordinate.longitude,
      },
      waypoints:
        stopCoordinate.length > 0
          ? stopCoordinate.map((coord) => ({
              location: { lat: coord.latitude, lng: coord.longitude },
            }))
          : undefined,
      destination: {
        lat: endCoordinate.latitude,
        lng: endCoordinate.longitude,
      },
      provideRouteAlternatives: true,
      travelMode: google.maps.TravelMode.WALKING,
    };

    tryTravelModes(travelModes, directionsService, baseRequest)
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch((error) => {
        console.error("Failed to find a valid route:", error.message);
      });
  }, [directionsService, directionsRenderer, wayPoint, travelMode]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return <></>;

  return (
    <div className="directions">
      {/*<h2>{selected.summary}</h2>*/}
      {/*<p>*/}
      {/*  {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}*/}
      {/*</p>*/}
      {/*<p>Distance: {leg.distance?.text}</p>*/}
      {/*<p>Duration: {leg.duration?.text}</p>*/}

      {/*<h2>Other Routes</h2>*/}
      {/*<ul>*/}
      {/*  {routes?.map((route, index) => (*/}
      {/*    <li key={route.summary}>*/}
      {/*      <button onClick={() => setRouteIndex(index)}>*/}
      {/*        {route.summary}*/}
      {/*      </button>*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </div>
  );
}
