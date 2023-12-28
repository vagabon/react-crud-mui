import '@testing-library/jest-dom';

console.error = jest.fn();

/********************************* MOCK COMPONENT ********************************/

global.mockComponent =
  (props) =>
  ({ children }) => {
    return <div data-testid={props}>{children}</div>;
  };
global.mockComponentWithCallBack =
  (name) =>
  ({ onClick, children }) =>
    (
      <>
        <input data-testid={name} onClick={onClick} />
        {children}
      </>
    );

/********************************** MOCK REDUX ***********************************/

import * as redux from 'react-redux';
import configureMockStore from 'redux-mock-store';
import store from './store/Store';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(() => Promise.resolve()),
}));
global.useSelectorSpy = jest.spyOn(redux, 'useSelector');

const middlewares = [];
global.mockStore = configureMockStore(middlewares)({});

global.dispatch = jest.fn();

jest.mock('./store/Store', () => ({
  useAppSelector: () => jest.fn(() => Promise.resolve()),
  useAppDispatch: () => jest.fn(() => Promise.resolve()),
}));
global.useAppSelectorSpy = jest.spyOn(store, 'useAppSelector');
global.useAppDispatchSpy = jest.spyOn(store, 'useAppDispatch');
global.mockDispatch = jest.fn();

/********************************** MOCK ROUTER **********************************/

const mockedUsedNavigate = jest.fn();
const mockeUsedLocation = {
  pathname: '/home',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockeUsedLocation,
  useParams: () => ({ id: '1' }),
  Link: mockComponentWithCallBack('Link'),
}));

global.mockedUsedNavigate = mockedUsedNavigate;
global.mockeUsedLocation = mockeUsedLocation;

/********************************** MOCK i18n **********************************/

/* global jest */
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => new Promise(() => jest.fn()),
    },
  }),
  Trans: ({ i18nKey }) => <span data-testid='Trans'>{i18nKey}</span>, // NOSONAR
  initReactI18next: {
    type: '3rdParty',
    init: () => jest.fn(),
  },
}));

/***************************** MUI *****************************/

/* global jest */
jest.mock('@mui/material', () => ({
  Alert: ({ children }) => <span data-testid='Alert'>{children}</span>,
  Autocomplete: ({ name, value, onChange, onBlur, renderInput }) => (
    <>
      <input data-testid='Autocomplete' name={name} value={value} onClick={onChange} onBlur={onBlur} />
      {renderInput()}
    </>
  ),
  Box: ({ children }) => <span data-testid='Box'>{children}</span>,
  ButtonGroup: ({ children }) => <span data-testid='ButtonGroup'>{children}</span>,
  Card: ({ children }) => <span data-testid='Card'>{children}</span>,
  CardActions: ({ children }) => <span data-testid='CardActions'>{children}</span>,
  CardContent: ({ children }) => <span data-testid='CardContent'>{children}</span>,
  CardHeader: ({ title, children }) => (
    <span data-testid='CardHeader'>
      {title}
      {children}
    </span>
  ),
  CardMedia: ({ children }) => <span data-testid='CardMedia'>{children}</span>,
  Checkbox: ({ name, checked, onChange, onBlur }) => (
    <input data-testid='Checkbox' name={name} checked={checked} onClick={onChange} onBlur={onBlur} />
  ),
  Chip: ({ label, onDelete }) => <input data-testid='Chip' value={label} onClick={onDelete} />,
  Container: ({ children }) => <span data-testid='Container'>{children}</span>,
  CssBaseline: ({ children }) => <span data-testid='CssBaseline'>{children}</span>,
  Fab: ({ children }) => <span data-testid='Fab'>{children}</span>,
  FormControl: ({ children }) => <span data-testid='FormControl'>{children}</span>,
  Grid: ({ children }) => <span data-testid='Grid'>{children}</span>,
  IconButton: ({ children }) => <span data-testid='IconButton'>{children}</span>,
  InputLabel: ({ children }) => <span data-testid='InputLabel'>{children}</span>,
  InputAdornment: ({ children }) => <span data-testid='InputAdornment'>{children}</span>,
  LinearProgress: ({ children }) => <span data-testid='LinearProgress'>{children}</span>,
  List: ({ children }) => <span data-testid='List'>{children}</span>,
  ListItem: ({ children }) => <span data-testid='ListItem'>{children}</span>,
  ListItemButton: ({ children }) => <span data-testid='ListItemButton'>{children}</span>,
  ListItemText: ({ children }) => <span data-testid='ListItemText'>{children}</span>,
  ListItemText: ({ children }) => <span data-testid='ListItemText'>{children}</span>,
  Modal: ({ children }) => <span data-testid='Modal'>{children}</span>,
  Select: ({ children }) => <span data-testid='Select'>{children}</span>,
  Snackbar: ({ children }) => <span data-testid='Snackbar'>{children}</span>,
  Switch: ({ children }) => <span data-testid='Switch'>{children}</span>,
  Table: ({ children }) => <span data-testid='Table'>{children}</span>,
  TableBody: ({ children }) => <span data-testid='TableBody'>{children}</span>,
  TableCell: ({ children }) => <span data-testid='TableCell'>{children}</span>,
  TableFooter: ({ children }) => <span data-testid='TableFooter'>{children}</span>,
  TableHead: ({ children }) => <span data-testid='TableHead'>{children}</span>,
  TablePagination: ({ children }) => <span data-testid='TablePagination'>{children}</span>,
  TableRow: ({ children }) => <span data-testid='TableRow'>{children}</span>,
  TableSortLabel: ({ children }) => <span data-testid='TableSortLabel'>{children}</span>,
  Tab: ({ children }) => <span data-testid='Tab'>{children}</span>,
  Tabs: ({ children }) => <span data-testid='Tabs'>{children}</span>,
  TextField: ({ label, name, onChange, children }) => (
    <>
      <label>{label}</label>
      <input data-testid='TextField' name={name} onChange={onChange}>
        {children}
      </input>
    </>
  ),
  ThemeProvider: ({ children }) => <span data-testid='ThemeProvider'>{children}</span>,
  Toolbar: ({ children }) => <span data-testid='Toolbar'>{children}</span>,
  Typography: ({ children }) => <span data-testid='Typography'>{children}</span>,
  createTheme: jest.fn(),
}));

jest.mock('@mui/material/Button', () => ({ children, onClick }) => (
  <button data-testid='BUTTON' onClick={onClick}>
    {children}
  </button>
));

jest.mock('@mui/material/Menu', () => ({ children, onClose }) => (
  <button data-testid='Menu' onClick={onClose}>
    {children}
  </button>
));

jest.mock('@mui/material/MenuItem', () => ({ children, onClick }) => (
  <button data-testid='MenuItem' onClick={onClick}>
    {children}
  </button>
));

jest.mock('mui-markdown', () => ({
  MuiMarkdown: ({ children }) => <span data-testid='MuiMarkdown'>{children}</span>,
}));

jest.mock('@mui/x-date-pickers/DateTimePicker', () => ({
  DateTimePicker: ({ children }) => <span data-testid='DateTimePicker'>{children}</span>,
}));

/***************************** AFTER EACH RESET MOCK *****************************/

beforeEach(() => {});

afterEach(() => {
  jest.resetAllMocks();
});

/********************************** LOCAL STORAGE *********************************/

const localStorageMock = (function () {
  let storageMock = {};
  return {
    getItem: (key) => storageMock[key],
    setItem: (key, value) => (storageMock[key] = value),
    clear: () => (storageMock = {}),
    removeItem: (key) => delete storageMock[key],
    getAll: () => storageMock,
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

global.localStorageMock = localStorageMock;

global.setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

window.ENV = {
  API_URL: 'http://localhost:8090',
};
window.scrollTo = jest.fn();
window.matchMedia = jest.fn().mockReturnValue({ matches: '' });
