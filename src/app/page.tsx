'use client';

import {useCallback, useEffect, useState} from 'react';
import {APIProvider, InfoWindow, Map} from '@vis.gl/react-google-maps';
import {ClusteredMarkers} from '@/components/clustered-markers';

import ControlPanel from './control-panel';
import {loadCWAGeojson, CWAGeojson} from './cwa';

import './style.css';
import {Feature, Point} from 'geojson';
import {InfoWindowContent} from '@/components/info-window-content';

import styles from './page.module.css';

export default function Home() {
  const [geojson, setGeojson] = useState<CWAGeojson | null>(null);
  const [numClusters, setNumClusters] = useState(0);

  useEffect(() => {
    void loadCWAGeojson().then(data => setGeojson(data));
  }, []);

  const [infowindowData, setInfowindowData] = useState<{
    anchor: google.maps.marker.AdvancedMarkerElement;
    features: Feature<Point>[];
  } | null>(null);

  const handleInfoWindowClose = useCallback(
    () => setInfowindowData(null),
    [setInfowindowData]
  );
  const API_KEY = 'AIzaSyBv7249JRUo6XgR1bxciLQeL3veDyAfeWs'
  return (
    <div className={styles.container}>
      <APIProvider 
        apiKey={API_KEY} 
        version='weekly' 
        libraries={['places', 'drawing', 'geometry']} 
        region='us'
        onError={(e)=>{
            alert(e)
        }}

       >
        <Map
          mapId={'b5387d230c6cf22f'}
          defaultZoom={10}
          defaultCenter={{lng: 120.0738819,lat: 23.97965}}
          gestureHandling={'greedy'}
          zoomControl={true}
          tilt={0}
          mapTypeId={'satellite'}
          onClick={() => setInfowindowData(null)}
          className={'custom-marker-clustering-map'}
        >
        {geojson && (
          <ClusteredMarkers
            geojson={geojson}
            setNumClusters={setNumClusters}
            setInfowindowData={setInfowindowData}
          />
        )}

        {infowindowData && (
          <InfoWindow
            onCloseClick={handleInfoWindowClose}
            anchor={infowindowData.anchor}>
            <InfoWindowContent features={infowindowData.features} />
          </InfoWindow>
        )}
        </Map>
        <ControlPanel
          numClusters={numClusters}
          numFeatures={geojson?.features.length || 0}
        />
      </APIProvider>
    </div>
  );
}
