<<<<<<< HEAD
import {createStore, applyMiddleware} from "redux"
import reducer from './reducers/reducer'
import defSaga from './sagas/index'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer,{},applyMiddleware(sagaMiddleware))
sagaMiddleware.run(defSaga)
=======
import {createStore} from "redux"
import reducer from './reducers/reducer'
const store = createStore(reducer)
>>>>>>> 8a0aadb (CEO)
export default store