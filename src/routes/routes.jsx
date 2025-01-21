import NavbarLayout from "../layouts/NavbarLayout";
import CreateProducts from "../pages/CreateProducts/CreateProducts";
import ManageProducts from "../pages/ManageProducts/ManageProducts";

const router = [
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      {
        index: true,
        element: <ManageProducts />,
      },
      {
        path: "/Create",
        element: <CreateProducts />,
      },
    ],
  },
];

export default router;
