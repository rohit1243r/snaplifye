import { FileText, FileImage, FileCode2, FolderOpen, Download } from "lucide-react";

const fileCategories = [
  {
    title: "Invoices",
    icon: <FileText size={24} />,
    color: "from-cyan-500 to-blue-600",
    files: [
      { name: "Invoice_2025_001.pdf", size: "245 KB" },
      { name: "Invoice_2025_002.pdf", size: "189 KB" },
    ],
  },
  {
    title: "Quotations",
    icon: <FileText size={24} />,
    color: "from-emerald-500 to-teal-600",
    files: [
      { name: "Project_Quote_Q1_2025.pdf", size: "312 KB" },
    ],
  },
  {
    title: "Project Documents",
    icon: <FileCode2 size={24} />,
    color: "from-violet-500 to-purple-600",
    files: [
      { name: "SRS_Document_v2.pdf", size: "1.2 MB" },
      { name: "Technical_Specs.pdf", size: "890 KB" },
    ],
  },
  {
    title: "Source Files",
    icon: <FileCode2 size={24} />,
    color: "from-amber-500 to-orange-600",
    files: [
      { name: "frontend_source.zip", size: "4.5 MB" },
      { name: "backend_source.zip", size: "3.2 MB" },
    ],
  },
  {
    title: "Images & Assets",
    icon: <FileImage size={24} />,
    color: "from-pink-500 to-rose-600",
    files: [
      { name: "brand_assets.zip", size: "15 MB" },
      { name: "logo_package.zip", size: "8 MB" },
    ],
  },
  {
    title: "Brand Assets",
    icon: <FolderOpen size={24} />,
    color: "from-sky-500 to-indigo-600",
    files: [
      { name: "brand_guidelines.pdf", size: "2.1 MB" },
      { name: "logo_variants.zip", size: "6.7 MB" },
    ],
  },
];

function Files() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">My Files</h1>
        <p className="mt-1 text-slate-400">Download project files and assets</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {fileCategories.map((cat) => (
          <div
            key={cat.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-slate-700"
          >
            <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${cat.color} p-3 text-white`}>
              {cat.icon}
            </div>
            <h3 className="mb-4 text-lg font-semibold text-white">{cat.title}</h3>
            {cat.files.length === 0 ? (
              <p className="text-sm text-slate-500">No files yet.</p>
            ) : (
              <div className="space-y-3">
                {cat.files.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-200">{file.name}</p>
                      <p className="text-xs text-slate-500">{file.size}</p>
                    </div>
                    <button className="ml-3 rounded-lg border border-slate-700 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400">
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Files;
