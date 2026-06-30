import { useState, useEffect } from "react";
import { Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getClientProfile, updateClientProfile } from "@/services/clientAuth.service";
import { toast } from "sonner";

function Profile() {
  const [client, setClient] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getClientProfile();
        setClient(res.client);
        setForm({
          name: res.client.name || "",
          email: res.client.email || "",
          phone: res.client.phone || "",
          company: res.client.company || "",
          password: "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { name: form.name, phone: form.phone, company: form.company };
      if (form.password) payload.password = form.password;
      const res = await updateClientProfile(payload);
      localStorage.setItem("client", JSON.stringify(res.client));
      setClient(res.client);
      toast.success("Profile updated");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <p className="mt-1 text-slate-400">Manage your account details</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="mb-8 flex items-center gap-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-3xl font-bold text-white">
              {client?.name?.charAt(0)?.toUpperCase() || "C"}
            </div>
            <button className="absolute -bottom-1 -right-1 rounded-full border-2 border-slate-900 bg-slate-800 p-1.5 text-slate-400 transition hover:text-cyan-400">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{client?.name}</h2>
            <p className="text-sm text-slate-400">{client?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm text-slate-400">Name</label>
            <Input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-slate-400">Email</label>
            <Input name="email" value={form.email} disabled placeholder="Email" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-slate-400">Phone</label>
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-slate-400">Company</label>
            <Input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-slate-400">New Password (leave blank to keep current)</label>
            <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="New Password" />
          </div>

          <Button type="submit" disabled={saving} className="w-full sm:w-auto">
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
