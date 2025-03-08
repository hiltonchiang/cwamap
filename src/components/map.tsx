/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
'use client'

//Map component Component from library
import { GoogleMap, Marker, InfoWindow, MarkerClusterer } from "@react-google-maps/api";
import { STMaps } from "@/data/STMap"

//Map's styling
const defaultMapContainerStyle = {
    width: '100%',
    height: '100vh',
    borderRadius: '15px 0px 0px 15px',
};

//K2's coordinates
const defaultMapCenter = {
    lng: 121.448906,
	lat: 25.164889
}
//Default zoom level, can be adjusted
const defaultMapZoom = 10

//Map options
const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'satellite',
};

const MapComponent = () => {
    return (
        <div className="w-full">
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
              <MarkerClusterer>
                 {(clusterer) => (
                    <>
                       {STMaps.map((location) => (
                        <Marker
                          key={location.ID}
                          position={{lng:location.Lon, lat: location.Lat}}
                          clusterer={clusterer}
                          title={location.STname}
                          onClick={() => {
                              <InfoWindow 
                                position={{lng:location.Lon, lat: location.Lat}}
                              >
                               <p>Hello</p>
                              </InfoWindow>
                          }}
                        />
                        ))}
                    </>
                  )}
              </MarkerClusterer>
            </GoogleMap>
        </div>
    )
};

export { MapComponent };
