import React from 'react';
import { useReward } from 'react-rewards';

import JogoDaVelha from './componentes/JogoDaVelha.jsx'

import './App.css'

export default function App() {
  const {reward,isAnimating} = useReward('id','emoji',{
    fps:60,
    lifetime:200,
    angle:90,
    decay:0.94,
    spread:70,
    rotate:true,
    startVelocity:20,
    elementCount:50,
    elementSize:20,
    zIndex:0,
    position:'fixed',
    emoji:['✨'],
  });

  return (
    <>
      <JogoDaVelha/>
      <button onClick={reward}>
        <span id="id" />
        sla
      </button>
    </>
  )
}
