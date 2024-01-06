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

global.mockRouter = {
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockeUsedLocation,
  Link: mockComponentWithCallBack('Link'),
};

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
  Avatar: ({ children }) => <div data-testid='Avatar'>{children}</div>,
  Alert: ({ children }) => <div data-testid='Alert'>{children}</div>,
  Autocomplete: ({ name, value, onChange, onBlur, renderInput }) => (
    <>
      <input data-testid='Autocomplete' name={name} value={value} onClick={onChange} onBlur={onBlur} />
      {renderInput()}
    </>
  ),
  Box: ({ children }) => <div data-testid='Box'>{children}</div>,
  ButtonGroup: ({ children }) => <div data-testid='ButtonGroup'>{children}</div>,
  Card: ({ children }) => <div data-testid='Card'>{children}</div>,
  CardActions: ({ children }) => <div data-testid='CardActions'>{children}</div>,
  CardContent: ({ children }) => <div data-testid='CardContent'>{children}</div>,
  CardHeader: ({ title, children }) => (
    <div data-testid='CardHeader'>
      {title}
      {children}
    </div>
  ),
  CardMedia: ({ children }) => <div data-testid='CardMedia'>{children}</div>,
  Checkbox: ({ name, checked, onClick, onChange, onBlur }) => (
    <input data-testid='Checkbox' name={name} checked={checked} onClick={onClick} onChange={onChange} onBlur={onBlur} />
  ),
  Chip: ({ label, onDelete }) => <input data-testid='Chip' value={label} onClick={onDelete} />,
  Container: ({ children }) => <div data-testid='Container'>{children}</div>,
  CssBaseline: ({ children }) => <div data-testid='CssBaseline'>{children}</div>,
  Divider: ({ children }) => <div data-testid='Divider'>{children}</div>,
  Fab: ({ children, onClick }) => (
    <div data-testid='Fab' onClick={onClick}>
      {children}
    </div>
  ),
  FormControl: ({ children }) => <div data-testid='FormControl'>{children}</div>,
  Grid: ({ children }) => <div data-testid='Grid'>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <div data-testid='IconButton' onClick={onClick}>
      {children}
    </div>
  ),
  InputLabel: ({ children }) => <div data-testid='InputLabel'>{children}</div>,
  InputAdornment: ({ children }) => <div data-testid='InputAdornment'>{children}</div>,
  LinearProgress: ({ children }) => <div data-testid='LinearProgress'>{children}</div>,
  List: ({ children }) => <div data-testid='List'>{children}</div>,
  ListItem: ({ onClick, children }) => (
    <div data-testid='ListItem' onClick={onClick}>
      {children}
    </div>
  ),
  ListItemAvatar: ({ children }) => <div data-testid='ListItemAvatar'>{children}</div>,
  ListItemButton: ({ children }) => <div data-testid='ListItemButton'>{children}</div>,
  ListItemIcon: ({ children }) => <div data-testid='ListItemIcon'>{children}</div>,
  ListItemText: ({ children }) => <div data-testid='ListItemText'>{children}</div>,
  MenuItem: ({ value, children }) => (
    <option data-testid='Modal' value={value}>
      {children}
    </option>
  ),
  Modal: ({ children }) => <div data-testid='Modal'>{children}</div>,
  Select: ({ name, onChange, children }) => (
    <>
      <input name={name} data-testid='Select' onChange={onChange}></input>
      {children}
    </>
  ),
  Snackbar: ({ children }) => <div data-testid='Snackbar'>{children}</div>,
  Switch: ({ children }) => <div data-testid='Switch'>{children}</div>,
  Table: ({ children }) => <div data-testid='Table'>{children}</div>,
  TableBody: ({ children }) => <div data-testid='TableBody'>{children}</div>,
  TableCell: ({ children }) => <div data-testid='TableCell'>{children}</div>,
  TableFooter: ({ children }) => <div data-testid='TableFooter'>{children}</div>,
  TableHead: ({ children }) => <div data-testid='TableHead'>{children}</div>,
  TablePagination: ({ children }) => <div data-testid='TablePagination'>{children}</div>,
  TableRow: ({ children }) => <div data-testid='TableRow'>{children}</div>,
  TableSortLabel: ({ children }) => <div data-testid='TableSortLabel'>{children}</div>,
  Tab: ({ children }) => <div data-testid='Tab'>{children}</div>,
  Tabs: ({ children }) => <div data-testid='Tabs'>{children}</div>,
  TextField: ({ label, name, onChange, children }) => (
    <>
      <label>{label}</label>
      <input data-testid='TextField' name={name} onChange={onChange}>
        {children}
      </input>
    </>
  ),
  ThemeProvider: ({ children }) => <div data-testid='ThemeProvider'>{children}</div>,
  Toolbar: ({ children }) => <div data-testid='Toolbar'>{children}</div>,
  Typography: ({ children }) => <div data-testid='Typography'>{children}</div>,
  createTheme: () => {
    return {};
  },
}));

jest.mock('@mui/material/Button', () => ({ children, onClick }) => (
  <button data-testid='Button' onClick={onClick}>
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
  MuiMarkdown: ({ children }) => <div data-testid='MuiMarkdown'>{children}</div>,
}));

jest.mock('@mui/x-date-pickers/DateTimePicker', () => ({
  DateTimePicker: ({ children }) => <div data-testid='DateTimePicker'>{children}</div>,
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
