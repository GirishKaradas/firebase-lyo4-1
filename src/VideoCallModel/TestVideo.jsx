import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import ConnectionStatus from '../Pages/VideoCallPage/components/ConnectionStatus.jsx';
import Publisher from '../Pages/VideoCallPage/components/Publisher.jsx';


function TestVideo({config}) {
    return (
        <div style={{backgroundColor: '#E0E0E0'}}>
            
        <OTSession apiKey={config.api_key} sessionId={config.session_id} token={config.token}>
        <Publisher/>
        <OTStreams>
          <OTSubscriber
          
          properties={{
              showControls: true,
              insertMode: 'append',
              width:500, height: 270
          }}
          />
        </OTStreams>
      </OTSession>
        </div>
    )
}

export default TestVideo
