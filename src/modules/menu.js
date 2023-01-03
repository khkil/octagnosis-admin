import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { sidebarRoutes } from '../routers';

const TOGGLE_MENU = 'menu/TOGGLE_MENU';

export const toggleManu = createAction(TOGGLE_MENU, menuName => menuName);

const initialState = sidebarRoutes
  .filter(({ children }) => children && children.filter(({ path }) => path.indexOf(':') === -1).length > 0)
  .reduce((a, b) => ({ ...a, [b.path]: true }), {});

const menu = handleActions(
  {
    [TOGGLE_MENU]: (state, action) => ({
      ...state,
      [action.payload]: !state[action.payload],
    }),
  },
  initialState,
);

export default menu;
