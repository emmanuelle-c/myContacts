import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginRegister from "./pages/LoginRegister";
import Contact from "./pages/Contact";


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
        element: <Contact />,
      },
    ],
  },
]);

export default router;
