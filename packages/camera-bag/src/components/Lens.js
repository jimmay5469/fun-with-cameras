import React, { useEffect, useState } from 'react'

const Lens = ({ onStreamChange }) => {
  const [stream, _setStream] = useState()

  useEffect(() => {
    const setStream = stream => {
      _setStream(stream)
      onStreamChange(stream)
    }

    if (!stream) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: 'environment'
          },
          audio: false
        })
        .then(setStream)
    }

    return () => {
      if (stream) {
        stream.getAudioTracks().forEach(track => track.stop())
        stream.getVideoTracks().forEach(track => track.stop())
        setStream()
      }
    }
  }, [stream])

  return null
}

export default Lens
