export let stmaps: { lng: number; lat: number; display: boolean }[]
export let InfoWindowFlag: boolean = false
export let MarkerId: string = ''
export let ClusterId: number = -1
export const setInfoWindowFlag = (flag: boolean) => {
  InfoWindowFlag = flag
}
export const setMarkerId = (id: string) => {
  MarkerId = id
}
export const setClusterId = (id: number) => {
  ClusterId = id
}
