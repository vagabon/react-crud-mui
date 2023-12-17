import { JSONObject, Primitif } from 'dto/api/ApiDto';
import MDInputTextSimple from 'mui/form/MDInputTextSimple';
import React, { useRef } from 'react';

export interface SearchBarProps {
  search: Primitif;
  callBack: Function;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const defaultValue = useRef(props.search);
  const handleInput = (event: React.ChangeEvent<JSONObject>) => {
    props?.callBack(event.target['value' as keyof JSONObject]);
  };

  return (
    <section className='search-bar'>
      <MDInputTextSimple
        name='searching'
        handleChange={handleInput}
        label='SEARCH'
        variant='outlined'
        placeholder='Search...'
        size='small'
        value={defaultValue.current}
      />
    </section>
  );
};

export default SearchBar;
