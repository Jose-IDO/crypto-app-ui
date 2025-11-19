import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SwapIcon = ({ width = 24, height = 24, color = '#ffffff' }) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill={color}>
    <Path d="M5,16L5,4.8L2.4,7.4L1,6L7,0L7,16L5,16ZM11,11.2L13.6,8.6L15,10L9,16L9,0L11,0L11,11.2Z" />
  </Svg>
);

export default SwapIcon;

