import React from 'react'
import { Camera, Viewfinder } from '@fun-with-cameras/camera-bag'

const ViewfinderPage = () => (
  <Camera body={({stream}) => (
    <Viewfinder src={stream} />
  )}/>
)

export default ViewfinderPage
