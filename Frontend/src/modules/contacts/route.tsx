import ContactList from "./pages/contactList";
import EditContact from "./pages/editContact";
import Layout from "../../components/layout/layout";

const ContactRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ContactList />,
      },
      {
        path: "/contacts/edit/:id",
        element: <EditContact />,
      },
    ],
  },
];

export default ContactRoutes;
