import React, { useRef, useEffect } from 'react'

const Viewfinder = ({ stream, className }) => {
  const video = useRef(null)

  useEffect(() => {
    video.current.srcObject = stream

    if (stream) video.current.play()
  }, [stream])

  return <video ref={video} playsInline className={className} />
}

export default Viewfinder
