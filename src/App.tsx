import { HashRouter, Route, Routes } from "react-router-dom";
import useAuthStore from "./store/auth";
import Login from "./pages/login";
import Patients from "./pages/patients";
import MainLayout from "./layouts/Main.layout";
import Services from "./pages/services";
import Rooms from "./pages/rooms";
import SinglePatient from "./pages/patients/single-patient";
import Dashboards from "./pages/dashboards";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import { Toaster } from "./components/ui/toaster";

function App() {
  const { token, setAccount } = useAuthStore();

  const { getUserDetailsQuery } = useAuth();

  const { data } = getUserDetailsQuery(!!token);

  useEffect(() => {
    if (data) {
      setAccount(data.data);
    }
  }, [data]);

  return (
    <HashRouter>
      {!token ? (
        <Routes>
          <Route path="/*" element={<Login />} />
        </Routes>
      ) : (
        <MainLayout>
          <Routes>
            <Route path="/">
              <Route index element={<Dashboards />} />
              <Route path="dashboards" element={<Dashboards />} />
              <Route path="patients" element={<Patients />} />
              <Route path="patients/:id" element={<SinglePatient />} />
              <Route path="services" element={<Services />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="*" element={<>NOT FOUNND</>} />
            </Route>
          </Routes>
        </MainLayout>
      )}
      <Toaster />
    </HashRouter>
  );
}

export default App;
