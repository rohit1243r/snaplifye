import { Eye, Trash2 } from "lucide-react";

function ContactsTable({
  contacts,
  onView,
  onDelete,
}) {
  if (contacts.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Contact Messages
        </h2>

        <p className="mt-2 text-slate-400">
          Messages submitted from your website will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-950">

            <tr>

              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Subject
              </th>

              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm text-slate-400">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {contacts.map((contact) => (

              <tr
                key={contact._id}
                className="border-t border-slate-800 hover:bg-slate-800/40"
              >

                <td className="px-6 py-4 text-white">
                  {contact.name}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {contact.email}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {contact.phone}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {contact.subject}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      contact.status === "New"
                        ? "bg-green-500/20 text-green-400"
                        : contact.status === "Read"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    {contact.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onView(contact)}
                      className="rounded-lg bg-cyan-500 p-2 hover:bg-cyan-600"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(contact._id)}
                      className="rounded-lg bg-red-500 p-2 hover:bg-red-600"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ContactsTable;