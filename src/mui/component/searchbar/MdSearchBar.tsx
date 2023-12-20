import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { JSONObject, Primitif } from '../../../dto/api/ApiDto';
import MdInputTextSimple from '../form/MdInputTextSimple';

export interface IMdSearchBarProps {
  search: Primitif;
  callBack: (value: string) => void;
}

const MdSearchBar: React.FC<IMdSearchBarProps> = (props) => {
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

  const handleReset = useCallback(
    (callback: (value: string) => void) => () => {
      setDefaultValue('');
      callback('');
    },
    [],
  );

  return (
    <section className='search-bar'>
      <MdInputTextSimple
        name='searching'
        handleChange={handleChange(props.callBack)}
        label='SEARCH'
        variant='outlined'
        placeholder='Search...'
        size='small'
        value={defaultValue}
        inputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon sx={{ fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton
              sx={{ visibility: defaultValue !== '' ? 'visible' : 'hidden' }}
              onClick={handleReset(props.callBack)}>
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
    </section>
  );
};

export default MdSearchBar;
