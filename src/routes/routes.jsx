import NavbarLayout from "../layouts/NavbarLayout";
import CreateIngredient from "../pages/CreateIngredient/CreateIngredient";
import CreateCoffe from "../pages/CreateCoffe/CreateCoffe";
import ManageProducts from "../pages/ManageProducts/ManageProducts";

const router = [
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      {
        path: "/Products",
        index: true,
        element: <ManageProducts />,
      },
      {
        path: "/Products/:pathFetchType",
        element: <ManageProducts />,
      },
      {
        path: "/CreateCoffe",
        element: <CreateCoffe />,
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
        element: <CreateCoffe />,
      },
    ],
  },
];

export default router;
