import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducers/reducers'
import rootReducer from './reducers/index'


let store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
    )

export default store