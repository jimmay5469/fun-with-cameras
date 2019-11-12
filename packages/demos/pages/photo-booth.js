import React, { useState } from 'react'
import { Lens, Viewfinder, Film } from '@fun-with-cameras/camera-bag'
import Head from 'next/head'
import Nav from '../components/nav'
import LiveCode from '../components/live-code'

const scope = {
  useState,
  Lens,
  Viewfinder,
  Film
}
const code = `
const PhotoBooth = () => {
  const [stream, setStream] = useState()
  const [filmStream, setFilmStream] = useState()
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  const start = ({ count, wait }) => {
    if (!count) return setDone(true)

    setStarted(true)

    setTimeout(() => {
      setFilmStream(stream)
      setTimeout(() => {
        setFilmStream()
        start({ count: count - 1, wait })
      }, 250)
    }, wait * 1000)
  }

  return (
    <div className='photo-booth'>
      {!done && (
        <>
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
          <Viewfinder
            stream={!filmStream ? stream : null}
            className='viewfinder'
          />
          <button
            disabled={started}
            onClick={() => start({ count: 4, wait: 1 })}
          >
            Start
          </button>
        </>
      )}
      <Film
        stream={filmStream}
        filmstrip={({ images }) =>
          done && (
            <div className='filmstrip'>
              {images
                .map((image, i) => (
                  <div key={i}>
                    <img src={image} className='filmstrip-frame' />
                  </div>
                ))
                .reverse()}
            </div>
          )
        }
      />

      <style jsx>{\`
        .photo-booth {
          display: flex;
          flex-direction: column;
        }
        .photo-booth :global(.viewfinder) {
          background-color: black;
        }
        .filmstrip {
          display: flex;
        }
        .filmstrip-frame {
          width: 100%;
          height: 100%;
        }
      \`}</style>
    </div>
  )
}

render(<PhotoBooth />)
`

const PhotoBoothPage = () => (
  <div>
    <Head>
      <title>Photo Booth</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <h1>Photo Booth</h1>

    <LiveCode scope={scope} code={code} />
  </div>
)

export default PhotoBoothPage
