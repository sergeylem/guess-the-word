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
