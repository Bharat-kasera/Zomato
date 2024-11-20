import React from 'react'
import Navigation from '@navigation/Navigation'
import '@unistyles/unistyles'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@states/store'


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <Navigation />
      </PersistGate>
    </Provider>
  )
}

export default App