import React, { useState, useRef, useEffect } from 'react'
import { Lens } from '@fun-with-cameras/camera-bag'
import Head from 'next/head'
import Nav from '../components/nav'
import * as faceapi from 'face-api.js'

const FaceDetectingViewfinder = ({ stream, className }) => {
  const video = useRef(null)
  const faces = useRef(null)

  useEffect(() => {
    const detectFaces = async () => {
      if (stream && video.current && !video.current.paused) {
        if (!faceapi.nets.tinyFaceDetector.params) {
          await faceapi.nets.tinyFaceDetector.load('/static')
        }
        const result = await faceapi.detectAllFaces(
          video.current,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 128,
            scoreThreshold: 0.5
          })
        )
        if (faces.current) {
          const dimensions = faceapi.matchDimensions(
            faces.current,
            video.current,
            true
          )
          if (dimensions.height && dimensions.width) {
            faceapi.draw.drawDetections(
              faces.current,
              faceapi.resizeResults(result, dimensions)
            )
          }
        }
      }

      setTimeout(() => detectFaces())
    }
    detectFaces()

    video.current.autoplay = true
    video.current.srcObject = stream
  }, [stream])

  return (
    <div className={`container ${className}`}>
      <div className='video'>
        <video ref={video} playsInline />
        {stream && <canvas ref={faces} className='faces' />}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
        }
        .video {
          display: flex;
          position: relative;
        }
        .faces {
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  )
}

const Camera = () => {
  const [lensCapOn, setLensCapOn] = useState(true)
  const [stream, setStream] = useState()

  return (
    <div className='camera'>
      <button onClick={() => setLensCapOn(!lensCapOn)}>
        Lens Cap: {lensCapOn ? 'ON' : 'OFF'}
      </button>
      {!lensCapOn && (
        <Lens
          onStreamChange={setStream}
          lensSelector={({ lenses, selectedLens, onSelectLens }) =>
            lenses.map(lens => (
              <button
                key={lens.id}
                disabled={lens === selectedLens}
                onClick={() => onSelectLens(lens)}
              >
                {lens.name}
              </button>
            ))
          }
        />
      )}
      <FaceDetectingViewfinder stream={stream} className='viewfinder' />

      <style jsx>{`
        .camera {
          display: flex;
          flex-direction: column;
        }
        .camera :global(.viewfinder) {
          background-color: black;
        }
      `}</style>
    </div>
  )
}

const FaceDetectionPage = () => (
  <div>
    <Head>
      <title>Face Detection</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <h1>Face Detection</h1>

    <Camera />
  </div>
)

export default FaceDetectionPage
