import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'

const HelloWorld = () => {
  const [stream, setStream] = useState()
  const video = useRef(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        video.current.autoplay = true
        video.current.srcObject = stream
      })

    return () => {
      if (video.current && video.current.srcObject) {
        video.current.srcObject.getAudioTracks().forEach(track => track.stop())
        video.current.srcObject.getVideoTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return <video ref={video} playsInline />
}

const CleanupPage = () => (
  <div>
    <Head>
      <title>Cleanup</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <h1>Cleanup</h1>

    <HelloWorld />
  </div>
)

export default CleanupPage
