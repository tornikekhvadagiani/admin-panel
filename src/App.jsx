import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Correctly import createBrowserRouter
import router from "./routes/routes";
import "./App.css";

const App = () => {
  return <RouterProvider router={createBrowserRouter(router)} />;
};

export default App;
