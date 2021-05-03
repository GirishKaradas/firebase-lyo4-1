import React from 'react'
import OpenTokPage from './OpenTokPage'
import config from './config';

const RenderCall = () => {
    return (
        
            <OpenTokPage
  apiKey={config.API_KEY}
  sessionId={config.SESSION_ID}
  token={config.TOKEN}
  />
        
    )
}

export default RenderCall
