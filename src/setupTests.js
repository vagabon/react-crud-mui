import '@testing-library/jest-dom';

console.error = jest.fn();
console.log = jest.fn();

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
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import store from './store/store';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(() => Promise.resolve()),
}));
global.useSelectorSpy = jest.spyOn(redux, 'useSelector');

const middlewares = [thunk];
global.mockStore = configureMockStore(middlewares)({});

global.dispatch = jest.fn();

jest.mock('./store/store', () => ({
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
  Trans: ({ i18nKey }) => <span data-testid='Trans'>{i18nKey}</span>,
  initReactI18next: {
    type: '3rdParty',
    init: () => jest.fn(),
  },
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
