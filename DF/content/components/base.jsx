import { Provider } from 'react-redux';
import { createStore } from 'redux';
import openSocket from 'socket.io-client';
import app from '_redux/reducers';
import { initEvents, setrsvp } from '../.redux/actions';
import Events from './events';
import SetUser from './setUser';

require('./base.scss');

// Creates the redux store
// This allows the user to refetch data quicker
let store = createStore(app);

// TODO: IndexDB needs to be added to save / load data - localstorage is too small for this

// This would be removed on a real application
// Allows devs to view the current state of the data store
global.getState = () => store.getState();

// Starts the persistent connection to the socket server
const socket = openSocket(`http://${location.hostname}`);
socket.on('initEvents', j => store.dispatch(initEvents(j)));
socket.on('log', msg => console.log(msg));
socket.emit('init');
socket.on('attending', (event, data) => store.dispatch(setrsvp(event, data)));

global.socket = socket;

class Base extends React.Component{
    render() {
        return(
            <div className='MainArea'>
                <SetUser />
                <Events />
            </div>
        );
    }
}

export default Base;

ReactDOM.render(
    <Provider store={store}>
        <Base />
    </Provider>,
    document.getElementById('content')
);