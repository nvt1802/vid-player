import React, { FC, useRef } from 'react'
import { useEffect } from 'react'
import Marker from '../Marker'

interface IProps {
  playerRef: any
  progressRef: any
  onProgressClick: any
  markers: any
  duration: any
  onMarkerClick: any
}

const PlayControl: FC<IProps> = ({
  playerRef,
  onProgressClick,
  markers,
  duration,
  onMarkerClick,
}) => {
  let progressDrag = false
  const progressRef = useRef<HTMLDivElement>(document.createElement('div'))
  const timeBarRef = useRef<HTMLSpanElement>(document.createElement('span'))
  const bufferRef = useRef<HTMLSpanElement>(document.createElement('span'))

  useEffect(() => {
    playerRef.current.addEventListener('progress', () => {
      const duration = playerRef.current.duration
      const buffered = playerRef.current.buffered
      const currentTime = playerRef.current.currentTime
      if (duration > 0) {
        for (var i = 0; i < playerRef.current.buffered.length; i++) {
          if (buffered.start(buffered.length - 1 - i) < currentTime) {
            bufferRef.current.style.width = `${
              (buffered.end(buffered.length - 1 - i) / duration) * 100
            }%`
            break
          }
        }
      }
    })

    playerRef.current.addEventListener('timeupdate', () => {
      const currentPos = playerRef.current.currentTime
      const maxduration = playerRef.current.duration
      const perc = (100 * currentPos) / maxduration
      timeBarRef.current.style.width = `${perc}%`
    })
  })

  const updateProgress = (e: any) => {
    const maxduration = playerRef.current.duration
    const position = e.nativeEvent.layerX - progressRef.current.clientWidth
    let percentage: number =
      100 + (100 * position) / progressRef.current.clientWidth
    if (percentage > 100) {
      percentage = 100
    }
    if (percentage < 0) {
      percentage = 0
    }
    timeBarRef.current.style.width = `${percentage}%`
    playerRef.current.currentTime = (maxduration * percentage) / 100
  }

  const handleClickProgress = (e: any) => {
    updateProgress(e)
  }

  const handleMouseDown = (e: any) => {
    progressDrag = true
    updateProgress(e)
  }

  const handleMouseUp = (e: any) => {
    if (progressDrag) {
      progressDrag = false
      updateProgress(e)
    }
  }

  const handleMouseMove = (e: any) => {
    if (progressDrag) {
      updateProgress(e)
    }
  }

  return (
    <div className="react-video-progress">
      <div
        ref={progressRef}
        className="progress"
        onClick={handleClickProgress}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <span ref={bufferRef} className="bufferBar"></span>
        <span ref={timeBarRef} className="timeBar"></span>
      </div>
      {markers &&
        markers.map((marker: any, index: number) => {
          return (
            <Marker
              key={index}
              marker={marker}
              duration={duration}
              onMarkerClick={onMarkerClick}
            />
          )
        })}
    </div>
  )
}

export default PlayControl
