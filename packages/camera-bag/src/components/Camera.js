import React, { useEffect, useState } from 'react'

const Camera = ({ power, body }) => {
  const [stream, setStream] = useState()

  useEffect(() => {
    if (!power && stream) {
      stream.getAudioTracks().forEach(track => track.stop())
      stream.getVideoTracks().forEach(track => track.stop())
      setStream()
      return
    }
    if (!power) return

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'environment'
        },
        audio: false
      })
      .then(setStream)
  }, [power])

  return body({ stream })
}

export default Camera
