import { combineReducers } from 'redux';
import { actions } from './actions';

const events = (state = [], action) => {
    switch (action.type) {
        case actions.INIT_EVENTS:
            return action.events;

        default:
            return state;
    }
};

export default combineReducers({
    events
});