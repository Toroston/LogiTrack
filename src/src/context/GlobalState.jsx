import PropTypes from 'prop-types';
import { useReducer } from 'react';
import globalReducer from './GlobalReducer';
import { GlobalContext } from './GlobalContext';

const GlobalState = (props) => {
    const INITIAL_STATE = {
        "name": "John Doe"
    }

    const [state, dispatch] = useReducer(globalReducer, INITIAL_STATE);

    const setName = (name) => {
        dispatch({ type: "NAME", payload: name });
    }

    return (
        <GlobalContext.Provider value={{ name: state.name, setName}}>
            {props.children}
        </GlobalContext.Provider>
    )
}

GlobalState.propTypes = {
    children: PropTypes.node.isRequired
}

export default GlobalState;