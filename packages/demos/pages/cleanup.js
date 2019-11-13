import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import LiveCode from '../components/live-code'

const scope = { useState, useRef, useEffect }
const code = `
const HelloWorld = () => {
  const video = useRef()

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

render(<HelloWorld />)
`

const CleanupPage = () => (
  <div>
    <Head>
      <title>Cleanup</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <h1>Cleanup</h1>

    <LiveCode scope={scope} code={code} />
  </div>
)

export default CleanupPage
