import { HashRouter, Route, Routes } from 'react-router-dom'
import useAuthStore from './store/auth'
import Login from './pages/login'
import Patients from './pages/patients'
import MainLayout from './layouts/Main.layout'
import Services from './pages/services'
import Rooms from './pages/rooms'

function App() {
  const { token } = useAuthStore()

  return (
    <HashRouter>
      {/* {!token ? (
        <Routes>
          <Route path='/*' element={<Login />} />
        </Routes>
      ) : ( */}
      <MainLayout>
        <Routes>
          <Route path='/'>
            <Route index element={<Patients />} />
            <Route path='patients' element={<Patients />} />
            <Route path='services' element={<Services />} />
            <Route path='rooms' element={<Rooms />} />
            <Route path='*' element={<>NOT FOUNND</>} />
          </Route>
        </Routes>
      </MainLayout>
      {/* )} */}
    </HashRouter>
  )
}

export default App
