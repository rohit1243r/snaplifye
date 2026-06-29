import { useEffect, useState } from "react";
import { toast } from "sonner";

import AdminLayout from "@/layouts/AdminLayout";
import ContactsTable from "@/components/contacts/ContactsTable";
import ContactDetailsDialog from "@/components/contacts/ContactDetailsDialog";

import {
  getAllContacts,
  deleteContact,
} from "@/services/contact.service";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  const [selectedContact, setSelectedContact] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchContacts = async () => {
    try {
      const res = await getAllContacts();

      setContacts(res.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) return;

    try {
      await deleteContact(id);

      toast.success("Contact deleted successfully");

      fetchContacts();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete contact");
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white">
            Contact Messages
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all customer messages.
          </p>

        </div>

        {/* Table */}
        <ContactsTable
          contacts={contacts}
          onView={(contact) => {
            setSelectedContact(contact);
            setDialogOpen(true);
          }}
          onDelete={handleDelete}
        />

        {/* Dialog */}
        <ContactDetailsDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          contact={selectedContact}
        />

      </div>
    </AdminLayout>
  );
}

export default Contacts;