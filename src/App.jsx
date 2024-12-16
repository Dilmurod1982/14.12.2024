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
  NewLtd,
  NewStation,
  Stations,
} from "./pages";
import {
  Docs,
  Licence,
  IkCertificate,
  LicenceNew,
  IkCertificateNew,
  NgCertificate,
  NgCertificateNew,
  NamlikCertificate,
  NamlikCertificateNew,
} from "./docs";
import MainLayout from "./layouts/MainLayout";

import { action as RegisterAction } from "./pages/Regagnks";
import { action as LoginAction } from "./pages/Login";
import { action as NewUserAction } from "./pages/NewUser";

import {
  ProtectedRoutes,
  EditUser,
  UsersList,
  SingleStation,
} from "./components/";
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
              <NewUser />
            ) : (
              <Navigate to="/homeuser" />
            )
          ) : null,
          action: NewUserAction,
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
        {
          path: "/newltd",
          element: rol ? (
            rol === "admin" ? (
              <NewLtd />
            ) : (
              <Navigate to="/homeuser" />
            )
          ) : null,
        },
        {
          path: "/stations",
          element: rol ? (
            rol === "admin" ? (
              <Stations />
            ) : (
              <Navigate to="/homeuser" />
            )
          ) : null,
        },
        {
          path: "/newstation",
          element: rol ? (
            rol === "admin" ? (
              <NewStation />
            ) : (
              <Navigate to="/homeuser" />
            )
          ) : null,
        },
        {
          path: "/stations/edit/:id",
          element: <SingleStation />,
        },
        {
          path: "/docs",
          element: <Docs />,
        },
        {
          path: "/licence",
          element: <Licence />,
        },
        {
          path: "/licencenew",
          element: <LicenceNew />,
        },
        {
          path: "/ikcertificate",
          element: <IkCertificate />,
        },
        {
          path: "/ikcertificatenew",
          element: <IkCertificateNew />,
        },
        {
          path: "/ngcertificate",
          element: <NgCertificate />,
        },
        {
          path: "/ngcertificatenew",
          element: <NgCertificateNew />,
        },
        {
          path: "/namlikcertificate",
          element: <NamlikCertificate />,
        },
        {
          path: "/namlikcertificatenew",
          element: <NamlikCertificateNew />,
        },
      ],
    },
    // {
    //   path: "/regagnks",
    //   errorElement: <ErrorPage />,
    //   element: user ? <Navigate to="/" /> : <Regagnks />,
    //   action: RegisterAction,
    // },
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
