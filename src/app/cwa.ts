import { FeatureCollection, Point } from 'geojson'

export type CWAFeatureProps = {
  STname: string
  ID: string
}

export type CWAGeojson = FeatureCollection<Point, CWAFeatureProps>

export async function loadCWAGeojson(): Promise<CWAGeojson> {
  const url = new URL('../data/STMap.geojson', import.meta.url)

  return await fetch(url).then((res) => res.json())
}
