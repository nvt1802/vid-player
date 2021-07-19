import React from 'react'
import Captions from './Captions'
import ProgressV2 from './ProgressV2'
import Play from './Play'
import Rewind from './Rewind'
import FastForward from './FastForward'
import Time from './Time'
import Volume from './Volume'
import FullScreen from './FullScreen'
import Pip from './Pip'
import Settings from './Settings'

import { getTimeCode } from '../Utils'

interface IProps {
  playerRef: any
  progressRef: any
  controls: string[]
  isPlaying: boolean
  volume: number
  muted: boolean
  currentTime: number
  duration: number
  markers: object[]
  setVolume: any
  setMuted: any
  onPlayClick: () => void
  onPauseClick: () => void
  onProgressClick: any
  onFullScreenClick: () => void
  onMarkerClick: any
}

function Controls(props: IProps) {
  const {
    playerRef,
    progressRef,
    controls,
    isPlaying,
    volume,
    muted,
    currentTime,
    duration,
    markers,
    setVolume,
    setMuted,
    onPlayClick,
    onPauseClick,
    onProgressClick,
    onFullScreenClick,
    onMarkerClick,
  } = props

  const durationTimeCode = getTimeCode(Math.ceil(duration))
  const currentTimeCode =
    currentTime !== duration ? getTimeCode(currentTime) : durationTimeCode

  return (
    <div className="react-video-controls">
      <Captions playerRef={playerRef} />

      <ProgressV2
        playerRef={playerRef}
        duration={duration}
        markers={markers}
        onMarkerClick={onMarkerClick}
        onProgressClick={onProgressClick}
        progressRef={progressRef}
      />

      <div style={{ width: '100%', zIndex: 5 }}>
        <div>
          {controls.includes('play') ? (
            <Play
              isPlaying={isPlaying}
              onPauseClick={onPauseClick}
              onPlayClick={onPlayClick}
            />
          ) : null}

          {controls.includes('rewind') ? (
            <Rewind playerRef={playerRef} />
          ) : null}

          {controls.includes('fast-forward') ? (
            <FastForward playerRef={playerRef} />
          ) : null}

          {controls.includes('volume') ? (
            <Volume
              muted={muted}
              setVolume={setVolume}
              setMuted={setMuted}
              playerRef={playerRef}
              volume={volume}
            />
          ) : null}

          {controls.includes('time') ? (
            <Time
              currentTimeCode={currentTimeCode}
              durationTimeCode={durationTimeCode}
            />
          ) : null}
        </div>

        <div>
          {controls.includes('settings') ? (
            <Settings playerRef={playerRef} />
          ) : null}

          {controls.includes('pip') ? <Pip PlayerRef={playerRef} /> : null}

          {controls.includes('full-screen') ? (
            <FullScreen onFullScreenClick={onFullScreenClick} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Controls
