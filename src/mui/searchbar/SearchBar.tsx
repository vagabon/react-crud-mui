import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Primitif } from 'dto/api/ApiDto';

export interface SearchBarProps {
  search: Primitif;
  callBack: Function;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.callBack && props.callBack(event.target.value);
  };

  return (
    <section className='search-bar'>
      <TextField
        className='text'
        onChange={handleInput}
        label='Search'
        variant='outlined'
        placeholder='Search...'
        size='small'
        value={props.search}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon sx={{ fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </section>
  );
};

export default SearchBar;
