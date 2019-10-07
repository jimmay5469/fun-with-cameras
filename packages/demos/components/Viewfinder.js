import React, { useRef, useEffect } from 'react'

const Viewfinder = () => {
  const video = useRef(null)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      .then((stream) => {
        video.current.srcObject = stream
        video.current.play()
      })
  }, [])

  return (
    <div>
      <video playsInline ref={video} />
    </div>
  )
}

export default Viewfinder
