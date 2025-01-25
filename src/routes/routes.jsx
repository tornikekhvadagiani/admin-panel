import NavbarLayout from "../layouts/NavbarLayout";
import CreateIngredient from "../pages/CreateIngredient/CreateIngredient";
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
        path: "/CreateCoffe",
        element: <CreateProducts />,
      },
      {
        path: "/CreateIngredient",
        element: <CreateIngredient />,
      },
      {
        path: "/CreateIngredient/:id",
        element: <CreateIngredient />,
      },
      {
        path: "/CreateCoffe/:id",
        element: <CreateProducts />,
      },
    ],
  },
];

export default router;
