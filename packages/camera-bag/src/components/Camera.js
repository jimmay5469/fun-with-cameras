import React, { useEffect, useState } from 'react'

const Camera = ({ body }) => {
  const [stream, setStream] = useState()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment'
      },
      audio: false
    }).then(setStream)
  }, [])

  return body({stream})
}

export default Camera
