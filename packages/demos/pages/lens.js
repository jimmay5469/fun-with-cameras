import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import { Viewfinder } from '@fun-with-cameras/camera-bag'

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

const ViewfinderPage = () => (
  <div>
    <Head>
      <title>Lens</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <h1>Lens</h1>

    <HelloWorld />
  </div>
)

export default ViewfinderPage
