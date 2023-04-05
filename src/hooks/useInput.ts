import React, { useCallback, useState } from 'react';

const useInput = (
  initialValue: string,
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) setValue(e.target.value);
    else setValue('');
  }, []);

  return [value, handler];
};

export default useInput;
