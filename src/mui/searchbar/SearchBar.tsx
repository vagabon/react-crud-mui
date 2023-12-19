import React, { useCallback, useEffect, useRef, useState } from 'react';
import { JSONObject, Primitif } from '../../dto/api/ApiDto';
import MDInputTextSimple from '../../mui/form/MDInputTextSimple';

export interface SearchBarProps {
  search: Primitif;
  callBack: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const [defaultValue, setDefaultValue] = useState<string>('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDefaultValue(props.search as string);
  }, [props.search]);

  const handleChange = useCallback(
    (callback: (value: string) => void) => (event: React.ChangeEvent<JSONObject>) => {
      timeoutRef.current && clearInterval(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(event.target['value' as keyof JSONObject]);
        timeoutRef.current && clearInterval(timeoutRef.current);
      }, 500);
    },
    [],
  );

  return (
    <section className='search-bar'>
      <MDInputTextSimple
        name='searching'
        handleChange={handleChange(props.callBack)}
        label='SEARCH'
        variant='outlined'
        placeholder='Search...'
        size='small'
        value={defaultValue}
      />
    </section>
  );
};

export default SearchBar;
