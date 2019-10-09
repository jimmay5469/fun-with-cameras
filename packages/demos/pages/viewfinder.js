import React, { useState } from 'react'
import { Camera, Viewfinder } from '@fun-with-cameras/camera-bag'

const ViewfinderPage = () => {
  const [power, setPower] = useState(false)
  return (
    <Camera
      power={power}
      body={({stream}) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setPower(!power)}>Power: {power ? 'ON' : 'OFF'}</button>
          <Viewfinder src={stream} />
        </div>
      )}
    />
  )
}

export default ViewfinderPage
