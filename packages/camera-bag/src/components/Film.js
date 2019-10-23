import React, { useState, useEffect } from 'react'

const Film = ({ stream, filmstrip }) => {
  const [images, setImages] = useState([])

  const addImage = blob => setImages([URL.createObjectURL(blob), ...images])

  useEffect(() => {
    // polyfill ImageCapture
    // this is in useEffect here as a node-style require
    // so that this component is compatible with SSR
    require('image-capture')

    if (!stream) return

    const videoTracks = stream.getVideoTracks()

    if (!videoTracks.length) return

    const imageCapture = new ImageCapture(videoTracks[0])
    imageCapture.takePhoto().then(addImage)
  }, [stream])

  return filmstrip ? filmstrip({ images }) : null
}

export default Film
