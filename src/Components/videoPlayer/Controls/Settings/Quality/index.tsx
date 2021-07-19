import React, { FC } from 'react'
import MenuItem from '../MenuItem'
import ButtonBack from '../ButtonBack'

interface IProps {
  options?: [{ value: number; label: string }]
  currentQuality?: number
  setCurrentQuality: (value: any) => void
  setShowMenu?: any
  hiddenMenu?: boolean
}

const MenuQuality: FC<IProps> = ({
  options = [
    {
      value: 2160,
      label: '2160p(4k)',
    },
    {
      value: 1080,
      label: '1080p(FHD)',
    },
    {
      value: 720,
      label: '720p(HD)',
    },
    {
      value: 480,
      label: '480p(SD)',
    },
    {
      value: 360,
      label: '360p(normal)',
    },
  ],
  currentQuality = 1080,
  setCurrentQuality,
  setShowMenu,
  hiddenMenu = true,
}) => {
  const handleClickChangeQuality = (value: any) => {
    setCurrentQuality(value)
    setShowMenu(1)
  }

  const renderMenuItem = () => {
    return options.map(
      (item: { value: number; label: string }, index: number) => {
        return (
          <MenuItem
            key={index}
            checked={currentQuality === item.value}
            value={item.value}
            displayValue={item.label}
            onClickItem={handleClickChangeQuality}
          />
        )
      }
    )
  }

  return (
    <div
      className={`${
        hiddenMenu ? 'settings-quality menu-hidden' : 'settings-quality'
      } `}
    >
      <div>
        <ButtonBack displayValue="Quality" setShowMenu={setShowMenu} />
        <div>{renderMenuItem()}</div>
      </div>
    </div>
  )
}

export default MenuQuality
