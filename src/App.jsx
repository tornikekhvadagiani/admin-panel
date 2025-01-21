import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "./App.css";
const App = () => {
  const API_KEY = "ZPuxX_W7Yqznq29IU1rmTJ97DDvxJUKEBDYPdEy8gPAGp6A4Ag";

  return <RouterProvider router={createBrowserRouter(router)} />;
};

export default App;
