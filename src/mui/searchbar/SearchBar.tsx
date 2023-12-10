import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { Primitif } from 'dto/api/ApiDto';
import React from 'react';

export interface SearchBarProps {
  search: Primitif;
  callBack: Function;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    props?.callBack(event.target.value);
  };

  return (
    <section className='search-bar'>
      <TextField
        name='search'
        className='text'
        onChange={handleInput}
        label='Search'
        variant='outlined'
        placeholder='Search...'
        size='small'
        defaultValue={props.search}
        autoComplete='off'
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
