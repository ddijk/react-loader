import React from 'react'
import { createStore } from 'redux'
import ReactDOM from "react-dom";
import {Dimmer, Loader} from "semantic-ui-react";

const myreducer = (state = { counter: 0, loading: false }, action) => {

    console.log('reducer called ' + state.counter);
    switch (action.type) {
        case 'START_REQ':
            return { ...state, counter: state.counter + 1, loading: true };
        case 'RECEIVE_REQ':
            return { ...state, counter: state.counter + 1 , loading: false};
        default:
            return state;
    }
}
const store = createStore(myreducer);


class MyReport extends React.Component {

    componentDidMount() {

        store.subscribe(() => this.forceUpdate());
    }

    render() {
        console.log('render called');
        return (<div><div>hallo {store.getState().counter}</div>

            <div><button onClick={() => this.doit()}>click me</button></div>

           { store.getState().loading && <Dimmer active >
                <Loader active inline='centered'  >Loading</Loader>
            </Dimmer>}
        </div>)
    }

    doit() {
        store.dispatch({ type: 'START_REQ' });
        setTimeout(()=>store.dispatch({ type: 'RECEIVE_REQ' }), 3000);
    }
}

export default MyReport