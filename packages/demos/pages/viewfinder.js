import React, { useState } from 'react'
import { Lens, Viewfinder } from '@fun-with-cameras/camera-bag'

const ViewfinderPage = () => {
  const [lensCap, setLensCap] = useState(true)
  const [stream, setStream] = useState()

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button onClick={() => setLensCap(!lensCap)}>
        Lens Cap: {lensCap ? 'ON' : 'OFF'}
      </button>
      {!lensCap && <Lens onStreamChange={setStream} />}
      <Viewfinder stream={stream} />
    </div>
  )
}

export default ViewfinderPage
