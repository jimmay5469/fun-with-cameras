import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import LiveCode from '../components/live-code'

const scope = { useState, useRef, useEffect }
const code = `
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
  }, [])

  return <video ref={video} playsInline />
}

render(<HelloWorld />)
`

const HelloWorldPage = () => (
  <div>
    <Head>
      <title>Hello World</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <h1>Hello World</h1>

    <LiveCode scope={scope} code={code} />
  </div>
)

export default HelloWorldPage
