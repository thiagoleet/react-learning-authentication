import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  EventDetailPage,
  loader as eventLoader,
  action as deleteEventAction,
} from "./pages/EventDetailPage";
import { EditEventPage } from "./pages/EditEventPage";
import { ErrorPage } from "./pages/Error";
import { EventsPage, loader as eventsLoader } from "./pages/EventsPage";
import { EventsRootLayout } from "./pages/EventsRoot";
import { HomePage } from "./pages/HomePage";
import { NewEventPage } from "./pages/NewEventPage";
import {
  NewsletterPage,
  action as newsletterAction,
} from "./pages/NewsletterPage";
import { RootLayout } from "./pages/Root";
import {
  AuthenticationPage,
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { action as manipulateEventAction } from "./components/EventForm";
import { tokenLoader, checkAuthLoader } from "./utils";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
