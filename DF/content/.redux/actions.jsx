export const actions = {
    INIT_EVENTS: "Initializes the events from the server"
};

export const initEvents = events => {
    return {
        type: actions.INIT_EVENTS,
        events
    };
};