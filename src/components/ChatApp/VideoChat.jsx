import { Button } from '@material-ui/core';
import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './ChatFeed';
import LoginForm from './Login';
import './VideoChat.css';

const projectID = '7f0f3b51-017b-477f-9207-b2417cd258f1';

const VideoChat = () => {
  if (!localStorage.getItem('username')) return <LoginForm />;

 

  return (
      <>
     
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
    </>
  );
};

// infinite scroll, logout, more customizations...

export default VideoChat;