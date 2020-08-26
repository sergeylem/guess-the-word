import React from 'react';
import ReactPlayer from 'react-player'

const playSound = (props) => {

  return <ReactPlayer  
    playing
    url={[props.urlStr]}
    config={{
      file: {
      }
    }}
  />
};

export default playSound;


// const PlaySound = (props) => {
//   return (
//     <Sound
//       url={props.urlStr}
//       autoLoad={true}
//       playStatus={Sound.status.PLAYING}
//     />
//   )
// };

// export default PlaySound;