import React, { useState, useEffect } from 'react'
import { Viewfinder } from '@fun-with-cameras/camera-bag'
import Head from 'next/head'
import Nav from '../components/nav'
import LiveCode from '../components/live-code'

const scope = { useState, useEffect, Viewfinder }
const code = `
const Lens = ({ onStreamChange }) => {
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        onStreamChange(stream)
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

  return null
}

const HelloWorld = () => {
  const [stream, setStream] = useState()

  return (
    <div>
      <Lens onStreamChange={setStream} />
      <Viewfinder stream={stream} />
    </div>
  )
}

render(<HelloWorld />)
`

const ViewfinderPage = () => (
  <div>
    <Head>
      <title>Lens</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <h1>Lens</h1>

    <LiveCode scope={scope} code={code} />
  </div>
)

export default ViewfinderPage
