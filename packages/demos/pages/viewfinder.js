import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import LiveCode from '../components/live-code'

const scope = { useState, useRef, useEffect }
const code = `
const Viewfinder = ({ stream }) => {
  const video = useRef()

  useEffect(() => {
    video.current.autoplay = true
    video.current.srcObject = stream
  }, [stream])

  return <video ref={video} playsInline />
}

const HelloWorld = () => {
  const [stream, setStream] = useState()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        setStream(stream)
        window.stream = stream
      })

    return () => {
      if (window.stream) {
        window.stream.getAudioTracks().forEach(track => track.stop())
        window.stream.getVideoTracks().forEach(track => track.stop())
        window.stream = null
      }
    }
  }, [])

  return <Viewfinder stream={stream} />
}

render(<HelloWorld />)
`

const ViewfinderPage = () => (
  <div>
    <Head>
      <title>Viewfinder</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <h1>Viewfinder</h1>

    <LiveCode scope={scope} code={code} />
  </div>
)

export default ViewfinderPage
