import React, { useRef, useEffect } from 'react'

const Viewfinder = ({ stream, className }) => {
  const video = useRef(null)

  useEffect(() => {
    video.current.autoplay = true
    video.current.srcObject = stream
  }, [stream])

  return <video ref={video} playsInline className={className} />
}

export default Viewfinder
