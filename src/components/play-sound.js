import React from 'react';
import Sound from 'react-sound';

const PlaySound = (props) => {
  return (
    <Sound
      url={props.urlStr}
      autoLoad={true}
      playStatus={Sound.status.PLAYING}
    />
  )
};

export default PlaySound;