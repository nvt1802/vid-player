import React, { FC } from 'react'
import MenuItem from '../MenuItem'
import ButtonBack from '../ButtonBack'

interface IProps {
  options?: [{ value: number; label: string }]
  currentSubtitles?: number
  setCurrentSubtitles: (value: any) => void
  setShowMenu?: any
  hiddenMenu?: boolean
}

const MenuSubtitles: FC<IProps> = ({
  options = [],
  currentSubtitles = 0,
  setCurrentSubtitles,
  setShowMenu,
  hiddenMenu = true,
}) => {
  const handleClickChangeSubtitles = (value: any) => {
    setCurrentSubtitles(value)
    setShowMenu(1)
  }

  const renderDefaultMenu = () => {
    return (
      <MenuItem
        key={'default'}
        value={0}
        checked={currentSubtitles === 0}
        displayValue={'Disable'}
        onClickItem={handleClickChangeSubtitles}
      />
    )
  }
  const renderMenuItem = () => {
    return options.map(
      (item: { value: number; label: string }, index: number) => {
        return (
          <MenuItem
            key={index}
            checked={currentSubtitles === item.value}
            value={item.value}
            displayValue={item.label}
            onClickItem={handleClickChangeSubtitles}
          />
        )
      }
    )
  }

  return (
    <div
      className={`${
        hiddenMenu ? 'settings-subtitles menu-hidden' : 'settings-subtitles'
      } `}
    >
      <div>
        <ButtonBack displayValue="Subtitles" setShowMenu={setShowMenu} />
        <div>
          {renderDefaultMenu()}
          {renderMenuItem()}
        </div>
      </div>
    </div>
  )
}

export default MenuSubtitles
