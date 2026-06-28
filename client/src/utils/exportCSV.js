export const exportToCSV = (quotes) => {
  if (!quotes.length) return;

  const headers = [
    "Name",
    "Email",
    "Phone",
    "Business",
    "Status",
    "Details",
    "Created At",
  ];

  const rows = quotes.map((quote) => [
    quote.name,
    quote.email,
    quote.phone,
    quote.business,
    quote.status,
    quote.details,
    new Date(quote.createdAt).toLocaleString(),
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row.map((item) => `"${item ?? ""}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "snaplifye-leads.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};