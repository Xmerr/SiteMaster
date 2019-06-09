export const actions = {
    INIT_EVENTS: "Initializes the events from the server",
    SET_USER: "Sets the current user",
    SET_RSVP: "Sets if the current user is attending a specific event"
};

export const setrsvp = (event, data) => {
    return {
        type: actions.SET_RSVP,
        event,
        data
    }
}

export const initEvents = events => {
    return {
        type: actions.INIT_EVENTS,
        events
    };
};

export const setUser = user => {
    return {
        type: actions.SET_USER,
        user
    }
}