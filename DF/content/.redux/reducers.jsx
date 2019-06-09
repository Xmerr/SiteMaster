import { combineReducers } from 'redux';
import { actions } from './actions';

const user = (state = window.location.pathname.substr(1) || "test", action) => {
    if(action.type === actions.SET_USER)
        return action.user;

    return state;
}

const events = (state = [], action) => {
    switch (action.type) {
        case actions.INIT_EVENTS:
            return action.events;

        case actions.SET_RSVP:
            return state.map(eve => {
                if(eve.id === action.event)
                    eve.coming = action.data.coming;

                return eve;
            });

        default:
            return state;
    }
};

export default combineReducers({
    events,
    user
});