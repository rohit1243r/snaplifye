function LatestLeadsTable({ leads }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">Latest Leads</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 text-left text-sm text-slate-400">
              <th className="pb-3 pr-4 font-medium">Name</th>
              <th className="pb-3 pr-4 font-medium">Email</th>
              <th className="pb-3 pr-4 font-medium">Phone</th>
              <th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-500">No leads yet</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id} className="border-b border-slate-800/50 text-sm hover:bg-slate-800/20">
                  <td className="py-3.5 pr-4 text-white font-medium">{lead.name}</td>
                  <td className="py-3.5 pr-4 text-slate-300">{lead.email}</td>
                  <td className="py-3.5 pr-4 text-slate-300">{lead.phone}</td>
                  <td className="py-3.5 pr-4">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      lead.status === "New" ? "bg-cyan-500/10 text-cyan-400" :
                      lead.status === "Completed" ? "bg-green-500/10 text-green-400" :
                      lead.status === "Contacted" ? "bg-amber-500/10 text-amber-400" :
                      "bg-blue-500/10 text-blue-400"
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-400 whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LatestLeadsTable;
