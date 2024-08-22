import './App.css';
import { Route, Routes } from 'react-router';
import { lazy, Suspense, useEffect } from 'react';
import Loading from './components/Loading/Loading';
import Layout from './components/Layout/Layout';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/auth/operations';
import PrivateRoute from './routes/PrivateRoute';
import RestrictedRoute from './routes/RestrictedRoute';

const Home = lazy(() => import('./pages/Home/Home'));
const ContactList = lazy(() => import('./components/ContactList/ContactList'));
const Register = lazy(() => import('./pages/Registration/Register'));
const Login = lazy(() => import('./pages/Login/Login'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <div>
      <div>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />

              <Route
                path="/contacts"
                element={
                  <PrivateRoute>
                    <ContactList />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path="/registration"
              element={
                <RestrictedRoute>
                  <Register />
                </RestrictedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute>
                  <Login />
                </RestrictedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
