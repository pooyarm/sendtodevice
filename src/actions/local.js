import {createAction} from 'redux-actions';
import { ACTION_SET_LOCAL_TOKEN, ACTION_SET_ENABLE_NOTIFICATION } from '../constants/actions';

export const set_local_token = createAction(ACTION_SET_LOCAL_TOKEN);
export const set_enable_notification = createAction(ACTION_SET_ENABLE_NOTIFICATION);