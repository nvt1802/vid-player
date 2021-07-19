import React, { FC, useState } from 'react'
import MenuHome from './MenuHome'
import Speed from './Speed'
import Quality from './Quality'
import Subtitles from './Subtitles'
import { getDisplayQuality, getDisplaySpeed } from '../../Utils'

interface IProps {
  playerRef: any
}

const SettingsControl: FC<IProps> = ({ playerRef }) => {
  const [isShowSettings, setShowSettings] = useState<boolean>(false)
  const [isShowMenu, setShowMenu] = useState<number>(1)
  const [currentSpeed, setCurrentSpeed] = useState<number>(1)
  const [currentQuality, setCurrentQuality] = useState<number>(1080)
  const [currentSubtitles, setCurrentSubtitles] = useState<number>(0)

  const handleClickShowMenuSettings = () => {
    setShowSettings(!isShowSettings)
  }

  return (
    <div className="settings-control">
      <button className="settings-button" onClick={handleClickShowMenuSettings}>
        Settings
      </button>
      {isShowSettings && (
        <div className="menu-container">
          <MenuHome
            hiddenMenu={isShowMenu !== 1}
            setShowMenu={setShowMenu}
            speedDisplay={getDisplaySpeed(currentSpeed)}
            qualityDisplay={getDisplayQuality(currentQuality)}
            subtitlesDisplay={`${currentSubtitles === 0 ? 'Disable' : 'VN'}`}
          />
          <Speed
            playerRef={playerRef}
            setShowMenu={setShowMenu}
            currentSpeed={currentSpeed}
            setCurrentSpeed={setCurrentSpeed}
            hiddenMenu={isShowMenu !== 2}
          />
          <Quality
            setShowMenu={setShowMenu}
            hiddenMenu={isShowMenu !== 3}
            currentQuality={currentQuality}
            setCurrentQuality={setCurrentQuality}
          />
          <Subtitles
            options={[{ value: 1, label: 'VN' }]}
            setShowMenu={setShowMenu}
            hiddenMenu={isShowMenu !== 4}
            currentSubtitles={currentSubtitles}
            setCurrentSubtitles={setCurrentSubtitles}
          />
        </div>
      )}
    </div>
  )
}

export default SettingsControl
