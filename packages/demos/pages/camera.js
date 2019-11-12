import React, { useState, useRef, useEffect } from 'react'
import { Lens, Shutter, Viewfinder, Film } from '@fun-with-cameras/camera-bag'
import Head from 'next/head'
import Nav from '../components/nav'
import LiveCode from '../components/live-code'

const scope = {
  useState,
  useRef,
  useEffect,
  Lens,
  Shutter,
  Viewfinder,
  Film
}
const code = `
const Camera = () => {
  const [lensCapOn, setLensCapOn] = useState(true)
  const [stream, setStream] = useState()
  const [viewfinderStream, setViewfinderStream] = useState()
  const [filmStream, setFilmStream] = useState()

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
      <Film
        stream={filmStream}
        filmstrip={({ images }) => {
          const filmstrip = useRef(null)

          useEffect(() => filmstrip.current.scroll(0, 0), [images])

          return (
            <div ref={filmstrip} className='filmstrip'>
              {images.map((image, i) => (
                <div key={i}>
                  <img src={image} className='filmstrip-frame' />
                </div>
              ))}
            </div>
          )
        }}
      />

      <style jsx>{\`
        .camera {
          display: flex;
          flex-direction: column;
        }
        .camera :global(.viewfinder) {
          background-color: black;
        }
        .filmstrip {
          display: flex;
          width: 100%;
          overflow: auto;
          background-color: black;
        }
        .filmstrip-frame {
          display: block;
        }
      \`}</style>
    </div>
  )
}

render(<Camera />)
`

const CameraPage = () => (
  <div>
    <Head>
      <title>Camera</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <h1>Camera</h1>

    <LiveCode scope={scope} code={code} />
  </div>
)

export default CameraPage
