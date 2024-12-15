import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Routes,
} from "react-router-dom";
import {
  ErrorPage,
  Home,
  HomeUser,
  Login,
  Regagnks,
  Users,
  NewUser,
  Ltds,
} from "./pages";
import MainLayout from "./layouts/MainLayout";

import { action as RegisterAction } from "./pages/Regagnks";
import { action as LoginAction } from "./pages/Login";
import { ProtectedRoutes, EditUser, UsersList } from "./components/";
import { useAppStore } from "./components/zustand";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import RoleBasedRedirect from "./components/RoleBasedRedirect";

function App() {
  const user = useAppStore((state) => state.user);
  const rol = useAppStore((state) => state.rol);
  const isAuthReady = useAppStore((state) => state.isAuthReady);
  const setUser = useAppStore((state) => state.setUser);
  const setIsAuthReady = useAppStore((state) => state.setIsAuthReady);

  const routes = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: rol ? (
            rol === "admin" ? (
              <Home />
            ) : (
              <Navigate to="/homeuser" />
            )
          ) : null,
        },
        {
          path: "/homeuser",
          element: rol ? (
            rol === "user" ? (
              <HomeUser />
            ) : (
              <Navigate to="/" />
            )
          ) : null,
        },
        {
          path: "/users",
          element: rol ? (
            rol === "admin" ? (
              <Users />
            ) : (
              <Navigate to="/homeuser" />
            )
          ) : null,
        },
        {
          path: "/newuser",
          element: rol ? (
            rol === "admin" ? (
              <Home />
            ) : (
              <Navigate to="/homeuser" />
            )
          ) : null,
        },
        {
          path: "/users",
          element: rol ? (
            rol === "admin" ? (
              <UsersList />
            ) : (
              <Navigate to="/homeuser" />
            )
          ) : null,
        },
        {
          path: "/users/edit/:id",
          element: rol ? (
            rol === "admin" ? (
              <EditUser />
            ) : (
              <Navigate to="/homeuser" />
            )
          ) : null,
        },
        {
          path: "/ltds",
          element: rol ? (
            rol === "admin" ? (
              <Ltds />
            ) : (
              <Navigate to="/homeuser" />
            )
          ) : null,
        },
      ],
    },
    {
      path: "/regagnks",
      errorElement: <ErrorPage />,
      element: user ? <Navigate to="/" /> : <Regagnks />,
      action: RegisterAction,
    },
    {
      path: "/login",
      errorElement: <ErrorPage />,
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthReady(true);
    });
    return () => unsubscribe(); // Отписка от события
  }, []);
  return (
    <>
      {" "}
      {!isAuthReady ? (
        <div>Loading...</div>
      ) : (
        <RouterProvider router={routes} />
      )}
    </>
  );
}

export default App;
