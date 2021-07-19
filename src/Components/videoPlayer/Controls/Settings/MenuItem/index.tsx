import React, { FC } from 'react'

interface IProps {
  checked?: boolean
  value: number
  displayValue: string
  onClickItem?: any
}

const MenuItem: FC<IProps> = ({
  checked = false,
  value,
  displayValue,
  onClickItem = () => {},
}) => {
  const handleClick = () => {
    onClickItem(value)
  }
  return (
    <button
      className={`${checked ? 'menu-item checked' : 'menu-item'}`}
      onClick={handleClick}
    >
      <span>{displayValue}</span>
    </button>
  )
}

export default MenuItem
