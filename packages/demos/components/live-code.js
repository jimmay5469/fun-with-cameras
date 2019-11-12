import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import theme from './theme'

const LiveCode = ({ scope, code }) => (
  <LiveProvider noInline theme={theme} scope={scope} code={code}>
    <LiveEditor />
    <LiveError />
    <LivePreview />
  </LiveProvider>
)

export default LiveCode
