export const time = (val) => {
  val = Math.round(val / 1000)
  const minutes = ~~(val / 60) + ""
  const seconds = val % 60 + ""
  return [minutes.length < 2 ? "0" + minutes : minutes, seconds.length < 2 ? "0" + seconds : seconds].join(":")
}