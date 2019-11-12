import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import { Lens, Viewfinder } from '@fun-with-cameras/camera-bag'

const Shutter = ({
  speed = 0,
  stream,
  onStreamsChange = () => {},
  children
}) => {
  useEffect(() => onStreamsChange({ viewfinder: stream, film: null }), [stream])

  const release = () => {
    onStreamsChange({ viewfinder: null, film: stream })

    setTimeout(() => {
      onStreamsChange({ viewfinder: stream, film: null })
    }, speed * 1000)
  }

  return <button onClick={release}>{children}</button>
}

const HelloWorld = () => {
  const [stream, setStream] = useState()
  const [viewfinderStream, setViewfinderStream] = useState()
  const [filmStream, setFilmStream] = useState()

  return (
    <div className='hello-world'>
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

      <style jsx>{`
        .hello-world {
          display: flex;
          flex-direction: column;
        }
        .hello-world :global(.viewfinder) {
          background-color: black;
        }
      `}</style>
    </div>
  )
}

const ViewfinderPage = () => (
  <div>
    <Head>
      <title>Shutter</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <h1>Shutter</h1>

    <HelloWorld />
  </div>
)

export default ViewfinderPage
