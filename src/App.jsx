import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout';
import Profile from './pages/Profile';
import About from './pages/About';
import Page404 from './components/Page404';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './routes/PrivateRoute';
import Postman from './Tools/Postman';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <About />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: 'postman',
        element: <Postman />
      },
      {
        path: '*',
        element: <Page404 />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;