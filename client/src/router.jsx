import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Library from './pages/Library';
import Player from './pages/Player';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import SongPage from './pages/SongPage'; // 👈 importamos la nueva página
import Layout from './App'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/explore', element: <Explore /> },
      { path: '/login', element: <Login /> },
      { path: '/library', element: <Library /> },
      { path: '/player', element: <Player /> },
      { path: '/profile', element: <Profile /> },
      { path: '/home', element: <Home /> },
      { path: '/song/:id', element: <SongPage /> }, // 👈 NUEVA RUTA
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
