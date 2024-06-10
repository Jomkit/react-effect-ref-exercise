import React from 'react'
import "../stylesheets/Card.css"

const Card = ({ code, image, angle }) => {
    // const rotateCard = () => {
    //     const deg = Math.random()* 360;
    //     return `rotate(${deg}deg)`;
    // }
    
  return (
    <div className='Card'>
        {/* <h3>{code} Card</h3> */}
        <img src={image} alt='card' style={{transform: angle}} />
    </div>
  )
}

export default Card