import React, { useEffect } from 'react'

const Shutter = ({
  speed = 0,
  stream,
  onStreamsChange = () => {},
  className,
  children
}) => {
  useEffect(() => onStreamsChange({ viewfinder: stream, film: null }), [stream])

  const release = () => {
    onStreamsChange({ viewfinder: null, film: stream })

    setTimeout(() => {
      onStreamsChange({ viewfinder: stream, film: null })
    }, speed * 1000)
  }

  return (
    <button onClick={release} className={className}>
      {children}
    </button>
  )
}

export default Shutter
