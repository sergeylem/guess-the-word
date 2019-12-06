import React from 'react';
import Sound from 'react-sound';

const PlaySound = (props) => {
  return (
    <Sound  //Sound must be in the same string where is RETURN or using ()
      url = {props.urlStr}
      autoLoad = {true}
      playStatus = {Sound.status.PLAYING} 
    />   
  )     
};

export default PlaySound;