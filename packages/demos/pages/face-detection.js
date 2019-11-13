import React, { useState, useRef, useEffect } from 'react'
import { Lens } from '@fun-with-cameras/camera-bag'
import Head from 'next/head'
import Nav from '../components/nav'
import * as faceapi from 'face-api.js'

const FaceDetectingViewfinder = ({ stream, className }) => {
  const video = useRef(null)
  const faces = useRef(null)
  const [faceData, setFaceData] = useState()

  useEffect(() => {
    video.current.autoplay = true
    video.current.srcObject = stream
  }, [stream])

  useEffect(() => {
    let keepDetecting = true

    const detectFaces = async () => {
      if (!keepDetecting) return

      if (video.current && !video.current.paused) {
        const faceData = await faceapi.detectAllFaces(
          video.current,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 128,
            scoreThreshold: 0.5
          })
        )

        if (keepDetecting) setFaceData(faceData)
      }

      setTimeout(detectFaces)
    }

    faceapi.nets.tinyFaceDetector.load('/static').then(detectFaces)

    return () => (keepDetecting = false)
  }, [])

  useEffect(() => {
    if (!faceData || !video.current || !faces.current) return

    const dimensions = faceapi.matchDimensions(
      faces.current,
      video.current,
      true
    )

    faceapi.draw.drawDetections(
      faces.current,
      faceapi.resizeResults(faceData, dimensions)
    )
  }, [faceData])

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
  const [stream, setStream] = useState()
  const [lensCapOn, setLensCapOn] = useState(false)

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
