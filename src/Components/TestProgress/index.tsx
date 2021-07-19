import React, { Fragment } from 'react'
import { useRef } from 'react'
import './index.css'

const TestComponent = () => {
  let progressDrag = false
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'))
  const progressRef = useRef<HTMLDivElement>(document.createElement('div'))
  const timeBarRef = useRef<HTMLSpanElement>(document.createElement('span'))
  const bufferRef = useRef<HTMLSpanElement>(document.createElement('span'))

  const updateProgress = (e: any) => {
    const maxduration = videoRef.current.duration
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
    videoRef.current.currentTime = (maxduration * percentage) / 100
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

  const startBuffer = () => {
    const duration = videoRef.current.duration
    const buffered = videoRef.current.buffered
    const currentTime = videoRef.current.currentTime
    if (duration > 0) {
      for (var i = 0; i < videoRef.current.buffered.length; i++) {
        if (buffered.start(buffered.length - 1 - i) < currentTime) {
          bufferRef.current.style.width = `${
            (buffered.end(buffered.length - 1 - i) / duration) * 100
          }%`
          break
        }
      }
    }
  }

  const handleOnTimeupdate = () => {
    const currentPos = videoRef.current.currentTime
    const maxduration = videoRef.current.duration
    const perc = (100 * currentPos) / maxduration
    // $('.timeBar').css('width', perc + '%')
    timeBarRef.current.style.width = `${perc}%`
  }

  return (
    <Fragment>
      <div style={{ width: '100%', margin: '5% 0 0 10%' }}>
        <video
          ref={videoRef}
          crossOrigin="anonymous"
          controls
          width="700px"
          height="100%"
          onTimeUpdate={handleOnTimeupdate}
          onProgress={startBuffer}
        >
          <source src="http://localhost:4000/video" />
          <track src="http://localhost:4000/subtitles" />
        </video>
      </div>
      <div className="topControl" style={{ margin: '5% 0 0 50px' }}>
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
      </div>
    </Fragment>
  )
}

export default TestComponent
