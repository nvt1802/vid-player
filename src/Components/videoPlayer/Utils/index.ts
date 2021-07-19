export const getTimeCode = (secs: number): string => {
  let secondsNumber = secs ? parseInt(String(secs), 10) : 0
  let hours = Math.floor(secondsNumber / 3600)
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60)
  let seconds = secondsNumber - hours * 3600 - minutes * 60
  let hoursStr: string = String(hours)
  let minutesStr: string = String(minutes)
  let secondsStr: string = String(seconds)

  if (hours < 10) {
    hoursStr = '0' + hours
  }
  if (minutes < 10) {
    minutesStr = '0' + minutes
  }
  if (seconds < 10) {
    secondsStr = '0' + seconds
  }

  return `${hoursStr !== '00' ? hoursStr + ':' : ''}${minutesStr}:${secondsStr}`
}

export const getDisplaySpeed = (value: number): string => {
  return value === 1 ? 'Normal' : value.toString()
}

export const getDisplayQuality = (value: number): string => {
  return `${value}p`
}
