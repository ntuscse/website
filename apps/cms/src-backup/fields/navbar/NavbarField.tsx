import { useField } from 'payload/components/forms'
import React from 'react';

const NavbarField: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <input onChange={(e) => setValue(e.target.value)} value={value }/>
  );
}

export default NavbarField;
