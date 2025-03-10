import { memo } from 'react'
import { Feature, Point } from 'geojson'
import { CWAFeatureProps } from '../app/cwa'

type InfowindowContentProps = {
  features: Feature<Point>[]
}

const numFmt = new Intl.NumberFormat()

export const InfoWindowContent = memo(({ features }: InfowindowContentProps) => {
  if (features.length === 1) {
    const f = features[0]
    const props = f.properties! as CWAFeatureProps

    return (
      <div className="text-stone-500 dark:text-lime-500">
        <h4>{props.STname}</h4>
        <p>more information</p>
      </div>
    )
  }

  return (
    <div className="text-stone-500 dark:text-lime-500">
      <h4>{numFmt.format(features.length)} stations. Zoom in to explore.</h4>

      <ul>
        {features.slice(0, 5).map((feature) => {
          const props = feature.properties! as CWAFeatureProps
          return <li key={feature.id}>{props.STname}</li>
        })}

        {features.length > 5 && <li>and {numFmt.format(features.length - 5)} more.</li>}
      </ul>
    </div>
  )
})
InfoWindowContent.displayName = 'InfoWindowContent'
