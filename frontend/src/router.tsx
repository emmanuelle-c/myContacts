import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginRegister from "./pages/LoginRegister";
import Contact from "./pages/Contact";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
        index: true,
      },
      {
        path: "login",
        element: <LoginRegister />,
      },
      {
        path: "contacts",
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
