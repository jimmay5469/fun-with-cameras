import React, { useRef, useEffect } from 'react'

const Viewfinder = ({ src }) => {
  const video = useRef(null)

  useEffect(() => {
    video.current.srcObject = src
    video.current.play()
  }, [src])

  return (
    <video playsInline ref={video} />
  )
}

export default Viewfinder
