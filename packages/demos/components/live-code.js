import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import theme from './theme'

const LiveCode = ({ scope, code }) => (
  <div className='live-code'>
    <LiveProvider noInline theme={theme} scope={scope} code={code}>
      <div className='pane'>
        <div className='content'>
          <LiveEditor />
        </div>
      </div>
      <div className='pane'>
        <div className='content'>
          <LiveError />
          <LivePreview />
        </div>
      </div>
    </LiveProvider>

    <style jsx>{`
      .live-code {
        width: 100%;
        display: flex;
      }
      .pane {
        flex-basis: 50%;
        width: 50%;
      }
      .content {
        position: sticky;
        top: 0;
        width: 100%;
        overflow: auto;
      }
      @media (max-width: 800px) {
        .live-code {
          flex-direction: column-reverse;
        }
        .pane {
          flex-basis: 100%;
          width: 100%;
        }
      }
    `}</style>
  </div>
)

export default LiveCode
