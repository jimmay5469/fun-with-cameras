import React, { useState } from 'react'
import { Lens, Shutter, Viewfinder, Film } from '@fun-with-cameras/camera-bag'
import Head from 'next/head'
import Nav from '../components/nav'

const Camera = () => {
  const [lensCapOn, setLensCapOn] = useState(true)
  const [stream, setStream] = useState()
  const [viewfinderStream, setViewfinderStream] = useState()
  const [filmStream, setFilmStream] = useState()

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
      <Viewfinder stream={viewfinderStream} />
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
      <Film stream={filmStream} />
    </div>
  )
}

const CameraPage = () => (
  <div>
    <Head>
      <title>Camera</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <h1>Camera</h1>

    <Camera />
  </div>
)

export default CameraPage
