import { useField } from 'payload/components/forms'
import React from 'react';

const NavbarView: React.FC<{ data }> = ({ data }) => {
  return (
    <div className='navbar'>
      <img src="/assets/scse-logo.png" alt="SCSE LOGO" height={80} width={80}/>
    </div>
  )
}

export default NavbarView;
