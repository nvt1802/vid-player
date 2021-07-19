import React, { FC } from 'react'

interface IProps {
  PlayerRef: any
}

const PipControl: FC<IProps> = ({ PlayerRef }) => {
  const handleClickPip = () => {
    const { pictureInPictureElement }: any = document
    if (pictureInPictureElement !== null) {
    } else {
      PlayerRef.current.requestPictureInPicture()
    }
  }
  return (
    <button className="pip" onClick={handleClickPip}>
      FullScreen
    </button>
  )
}

export default PipControl
