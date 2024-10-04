import React from 'react';

const Header = ({ data }) => {
  return (
    <h1
      className='mt-1'
      style={{ color: data?.style?.color, fontSize: data?.style?.fontSize + 'px', textAlign: data?.style?.position }}>
      {data?.title}
    </h1>
  )
}

export default Header;

