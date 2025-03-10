import React, { useCallback, useEffect } from 'react'
import Supercluster, { ClusterProperties } from 'supercluster'
import { FeaturesClusterMarker } from './features-cluster-marker'
import { FeatureMarker } from './feature-marker'
import { useSupercluster } from '../hooks/use-supercluster'
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson'
import { CWAFeatureProps } from '../app/cwa'
import {
  InfoWindowFlag,
  MarkerId,
  ClusterId,
  setInfoWindowFlag,
  setMarkerId,
  setClusterId,
} from './ref'

type ClusteredMarkersProps = {
  geojson: FeatureCollection<Point>
  setNumClusters: (n: number) => void
  setInfowindowData: (
    data: {
      anchor: google.maps.marker.AdvancedMarkerElement
      features: Feature<Point>[]
    } | null
  ) => void
}

const superclusterOptions: Supercluster.Options<GeoJsonProperties, ClusterProperties> = {
  extent: 256,
  radius: 80,
  maxZoom: 12,
}

export const ClusteredMarkers = ({
  geojson,
  setNumClusters,
  setInfowindowData,
}: ClusteredMarkersProps) => {
  const { clusters, getLeaves } = useSupercluster(geojson, superclusterOptions)

  useEffect(() => {
    setNumClusters(clusters.length)
  }, [setNumClusters, clusters.length])

  const handleClusterClick = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement, clusterId: number) => {
      const leaves = getLeaves(clusterId)
      if (InfoWindowFlag == false) {
        setInfowindowData({ anchor: marker, features: leaves })
        setInfoWindowFlag(true)
        setClusterId(clusterId)
      } else if (ClusterId != clusterId) {
        setInfowindowData(null)
        setInfoWindowFlag(false)
      }
    },
    [getLeaves, setInfowindowData]
  )

  const handleMarkerClick = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement, featureId: string) => {
      const feature = clusters.find((feat) => feat.id === featureId) as Feature<Point>

      if (InfoWindowFlag == false) {
        setInfowindowData({ anchor: marker, features: [feature] })
        setInfoWindowFlag(true)
        setMarkerId(featureId)
      } else if (MarkerId != featureId) {
        setInfowindowData(null)
        setInfoWindowFlag(false)
      }
    },
    [clusters, setInfowindowData]
  )

  return (
    <>
      {clusters.map((feature) => {
        const [lng, lat] = feature.geometry.coordinates

        const clusterProperties = feature.properties as ClusterProperties
        const isCluster: boolean = clusterProperties.cluster
        const cwaFeatureProps = feature.properties as CWAFeatureProps

        return isCluster ? (
          <FeaturesClusterMarker
            key={feature.id}
            clusterId={clusterProperties.cluster_id}
            position={{ lat, lng }}
            size={clusterProperties.point_count}
            sizeAsText={String(clusterProperties.point_count_abbreviated)}
            onMarkerClick={handleClusterClick}
          />
        ) : (
          <FeatureMarker
            key={feature.id}
            featureId={feature.id as string}
            position={{ lat, lng }}
            onMarkerClick={handleMarkerClick}
            title={cwaFeatureProps ? cwaFeatureProps.STname : ''}
          />
        )
      })}
    </>
  )
}
