import localStorage from 'localStorage';

import { ACTION_SET_LOCAL_TOKEN, ACTION_SET_ENABLE_NOTIFICATION } from "../constants/actions";

console.log((localStorage.getItem('isNotificationEnable') !== null && localStorage.getItem('isNotificationEnable') !== undefined)? localStorage.getItem('isNotificationEnable') : 1);

const defaultData = {
    lastToken: localStorage.getItem('lastToken'),
    isNotificationEnable: (localStorage.getItem('isNotificationEnable') !== null && localStorage.getItem('isNotificationEnable') !== undefined)? localStorage.getItem('isNotificationEnable') : 1
};

const localReducer = (db = defaultData, action) => {
    switch(action.type) {
        case ACTION_SET_LOCAL_TOKEN:
            db.lastToken = action.payload;
            localStorage.setItem('lastToken', action.payload);
        break;
        case ACTION_SET_ENABLE_NOTIFICATION:
            var intFlag = (action.payload)?1:0;
            db.isNotificationEnable = intFlag;
            localStorage.setItem('isNotificationEnable', intFlag);
        break;
    }

	return db;
};

export default localReducer;