import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AuthInit from 'src/features/Auth/AuthInit'
import Routers from './Routers'

function App({ store, persistor }) {
  return (
    <Provider store={store}>
      <PersistGate loading={'Đang tải ...'} persistor={persistor}>
        <AuthInit>
          <Routers />
        </AuthInit>
      </PersistGate>
    </Provider>
  )
}

export default App
