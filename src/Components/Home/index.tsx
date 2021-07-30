import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import VideoPlayer from '../videoPlayer'

const HomeComponent = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.7)

  const [clearVideo, setClearVideo] = useState<boolean>(false)
  const [urlVideo, setUrlVideo] = useState<string>(
    'http://localhost:4000/video/Anh-Muon-Dua-Em-Ve-Khong'
  )
  const [urlTrack, setUrlTrack] = useState<string[]>([
    'http://localhost:4000/subtitles/Anh-Muon-Dua-Em-Ve-Khong',
  ])
  // const markers: object[] = [
  //   {
  //     id: 1,
  //     time: 5,
  //     color: '#ffc837',
  //     title: 'Marker 1',
  //   },
  // ]

  const listVideo = [
    { value: 'Anh-Muon-Dua-Em-Ve-Khong', label: 'Anh Muốn Đưa Em Về Không' },
    { value: 'Im-Sorry-Babe', label: "I'm Sorry Babe" },
    { value: 'Nothing-In-Your-Eyes-2', label: 'Nothing In Your Eyes 2' },
    { value: 'Sao-Anh-Chua-Ve-Nha', label: 'Sao Anh Chưa Về Nhà' },
    { value: 'Vi-Ai-Vi-Anh', label: 'Vì Ai Vì Anh' },
    { value: 'vi-yeu-cu-dam-dau', label: 'Vì Yêu Cứ Đâm Đầu' },
    { value: 'Ky-Minh-Nguyet', label: 'Ký Minh Nguyệt' },
    { value: 'SING', label: 'Other' },
  ]

  useEffect(() => {
    if (clearVideo) {
      setClearVideo(false)
    }
  }, [clearVideo])

  const handleClickPlay = () => {
    setPlaying(true)
  }

  const handleClickPause = () => {
    setPlaying(false)
  }

  const handleChangeVolume = (value: any) => {
    setVolume(value)
  }

  return (
    <Fragment>
      <div style={{ display: 'flex' }}>
        <div style={{ flexWrap: 'nowrap', width: '15%' }}>
          <ul style={{ padding: 0 }}>
            {listVideo.map((item: any, index: number) => {
              return (
                <li
                  key={index}
                  style={{
                    padding: '1em 0 0 0',
                    listStyleType: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setUrlVideo(`http://localhost:4000/video/${item.value}`)
                    setUrlTrack([
                      `http://localhost:4000/subtitles/${item.value}`,
                    ])
                    setPlaying(false)
                    setClearVideo(true)
                  }}
                >
                  {item?.label}
                </li>
              )
            })}
          </ul>
        </div>
        <div style={{ flexWrap: 'nowrap', width: '85%' }}>
          <div>
            {!clearVideo && (
              <VideoPlayer
                controls={[
                  'play',
                  'rewind',
                  'fast-forward',
                  'time',
                  // 'progress',
                  'volume',
                  'settings',
                  'pip',
                  'full-screen',
                ]}
                isPlaying={playing}
                // markers={markers}
                url={urlVideo}
                track={urlTrack}
                volume={volume}
                loop={false}
                width="800px"
                height="100%"
                onPlay={handleClickPlay}
                onPause={handleClickPause}
                onVolume={handleChangeVolume}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default HomeComponent
