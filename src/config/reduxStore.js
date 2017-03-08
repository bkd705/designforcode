import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './rootReducer'
import saga from './rootSaga'

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(reducer,
      compose(
        applyMiddleware(sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    ),
    runSaga: sagaMiddleware.run(saga)
  }
}

export default configureStore
