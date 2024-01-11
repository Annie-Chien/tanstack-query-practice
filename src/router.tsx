import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import RQfriends from "./pages/RQfriends";
import RQfriend from "./pages/RQfriend";
import RQparallel from "./pages/RQparallel";
import RQdependent from "./pages/RQdependent";
import RootLayout from "./components/RootLayout";
import RQpaginated from "./pages/RQpaginated";
import RQinfinite from "./pages/RQifinite";
import RQmutation from "./pages/RQmutation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/friends",
        element: <Friends />,
      },
      {
        path: "/rq-friends",
        children: [
          {
            index: true,
            element: <RQfriends />,
          },
          {
            path: ":id",
            element: <RQfriend />,
          },
        ],
      },

      {
        path: "/rq-parallel",
        element: <RQparallel />,
      },
      {
        path: "/rq-dependent",
        element: <RQdependent userId="annie" />,
      },
      {
        path: "/rq-paginated",
        element: <RQpaginated />,
      },
      {
        path: "/rq-infinite",
        element: <RQinfinite />,
      },
      {
        path: "/rq-mutation",
        element: <RQmutation />,
      },
    ],
  },
]);

export default router;
