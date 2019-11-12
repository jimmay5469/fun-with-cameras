import React, { useState, useEffect } from 'react'
import { Lens, Shutter, Viewfinder } from '@fun-with-cameras/camera-bag'
import Head from 'next/head'
import Nav from '../components/nav'
import LiveCode from '../components/live-code'

const scope = {
  useState,
  useEffect,
  Lens,
  Shutter,
  Viewfinder,
  require: () => {}
}
const code = `
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

const Camera = () => {
  const [stream, setStream] = useState()
  const [viewfinderStream, setViewfinderStream] = useState()
  const [filmStream, setFilmStream] = useState()

  return (
    <div className='camera'>
      <Lens onStreamChange={setStream} />
      <Viewfinder stream={viewfinderStream} className='viewfinder' />
      <Shutter
        stream={stream}
        speed={1 / 4}
        onStreamsChange={streams => {
          setViewfinderStream(streams.viewfinder)
          setFilmStream(streams.film)
        }}
      >
        Shutter Release
      </Shutter>
      <Film
        stream={filmStream}
        filmstrip={({ images }) => (
          <div className='filmstrip'>
            {images.map((image, i) => (
              <div key={i}>
                <img src={image} className='filmstrip-frame' />
              </div>
            ))}
          </div>
        )}
      />

      <style jsx>{\`
        .camera {
          display: flex;
          flex-direction: column;
        }
        .camera :global(.viewfinder) {
          background-color: black;
        }
        .filmstrip {
          display: flex;
          width: 100%;
          overflow: auto;
          background-color: black;
        }
        .filmstrip-frame {
          display: block;
        }
      \`}</style>
    </div>
  )
}

render(<Camera />)
`

const ViewfinderPage = () => {
  useEffect(() => {
    // polyfill ImageCapture
    // this is in useEffect here as a node-style require
    // so that this component is compatible with SSR
    require('image-capture')
  }, [])

  return (
    <div>
      <Head>
        <title>Film</title>
        <link rel='icon' href='/static/favicon.ico' />
      </Head>

      <Nav />

      <h1>Film</h1>

      <LiveCode scope={scope} code={code} />
    </div>
  )
}
export default ViewfinderPage
