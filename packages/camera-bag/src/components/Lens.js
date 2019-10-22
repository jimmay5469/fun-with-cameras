import React, { useEffect, useState } from 'react'

const Lens = ({ lensSelector, onStreamChange }) => {
  const [lenses, setLenses] = useState([])
  const [selectedLens, setSelectedLens] = useState()

  const setStream = stream => {
    if (window.stream) {
      window.stream.getAudioTracks().forEach(track => track.stop())
      window.stream.getVideoTracks().forEach(track => track.stop())
    }
    window.stream = stream
    onStreamChange(stream)
  }

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        window.stream = stream
        return navigator.mediaDevices.enumerateDevices()
      })
      .then(devices =>
        devices
          .filter(({ kind }) => kind === 'videoinput')
          .map(device => ({ id: device.deviceId, name: device.label }))
      )
      .then(lenses => {
        setLenses(lenses)
        setSelectedLens(lenses[0])
      })

    return () => setStream()
  }, [])

  useEffect(() => {
    if (!selectedLens) return

    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: {
            exact: selectedLens.id
          }
        },
        audio: false
      })
      .then(setStream)
  }, [selectedLens])

  return lensSelector
    ? lensSelector({
        lenses,
        selectedLens,
        onSelectLens: setSelectedLens
      })
    : null
}

export default Lens
