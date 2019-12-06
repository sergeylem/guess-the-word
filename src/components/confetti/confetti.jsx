import React from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default (props) => {
  useWindowSize();
  return (
    <Confetti
      width={props.viewportWidth}
      height={props.viewportHeight}
      numberOfPieces={props.numberOfPieces}      
    />
  )
}

// import React from 'react'
// import useWindowSize from 'react-use/lib/useWindowSize'
// import Confetti from 'react-confetti'
 
// export default () => {
//   const { width, height } = useWindowSize()
//   return (
//     <Confetti
//       width={width}
//       height={height}
//     />
//   )
// }