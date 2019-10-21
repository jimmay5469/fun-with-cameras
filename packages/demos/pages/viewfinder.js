import React, { useState } from 'react'
import { Lens, Shutter, Viewfinder, Film } from '@fun-with-cameras/camera-bag'

const ViewfinderPage = () => {
  const [lensCapOn, setLensCapOn] = useState(true)
  const [stream, setStream] = useState()
  const [viewfinderStream, setViewfinderStream] = useState()
  const [filmStream, setFilmStream] = useState()

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button onClick={() => setLensCapOn(!lensCapOn)}>
        Lens Cap: {lensCapOn ? 'ON' : 'OFF'}
      </button>
      {!lensCapOn && <Lens onStreamChange={setStream} />}
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

export default ViewfinderPage
