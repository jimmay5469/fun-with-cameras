import React, { useState, useRef, useEffect } from 'react'

const Film = ({ stream }) => {
  const [images, setImages] = useState([])
  const filmStrip = useRef(null)

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

  useEffect(() => filmStrip.current.scroll(0, 0), [images])

  return (
    <div
      ref={filmStrip}
      style={{
        display: 'flex',
        width: '100%',
        overflow: 'auto',
        backgroundColor: 'black'
      }}
    >
      {images.map((image, i) => (
        <div key={i}>
          <img src={image} style={{ display: 'block' }} />
        </div>
      ))}
    </div>
  )
}

export default Film
