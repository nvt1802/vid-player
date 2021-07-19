import React, { FC } from 'react'
import MenuItem from '../MenuItem'
import ButtonBack from '../ButtonBack'

interface IProps {
  playerRef: any
  options?: number[]
  currentSpeed?: number
  setCurrentSpeed: (value: any) => void
  setShowMenu?: any
  hiddenMenu?: boolean
}

const MenuSpeed: FC<IProps> = ({
  playerRef,
  options = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  currentSpeed = 1,
  setCurrentSpeed,
  setShowMenu,
  hiddenMenu = true,
}) => {
  const handleClickChangeSpeed = (value: any) => {
    playerRef.current.playbackRate = value
    setCurrentSpeed(value)
    setShowMenu(1)
  }

  const renderMenuItem = () => {
    return options.map((item: number, index: number) => {
      return (
        <MenuItem
          key={index}
          checked={currentSpeed === item}
          displayValue={`${item === 1 ? 'Normal' : item}`}
          value={item}
          onClickItem={handleClickChangeSpeed}
        />
      )
    })
  }

  return (
    <div
      className={`${
        hiddenMenu ? 'settings-speed menu-hidden' : 'settings-speed'
      } `}
    >
      <div>
        <ButtonBack displayValue="Speed" setShowMenu={setShowMenu} />
        <div>{renderMenuItem()}</div>
      </div>
    </div>
  )
}

export default MenuSpeed
