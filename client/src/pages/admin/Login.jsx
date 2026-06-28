import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Login() {
  return (
    <AdminLayout>
      <div className="flex min-h-screen items-center justify-center px-6">

        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h1 className="mb-2 text-3xl font-bold">
            Admin Login
          </h1>

          <p className="mb-8 text-slate-400">
            Login to Snaplifye Dashboard
          </p>

          <div className="space-y-5">

            <Input
              type="email"
              placeholder="Admin Email"
            />

            <Input
              type="password"
              placeholder="Password"
            />

            <Button className="w-full">
              Login
            </Button>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

export default Login;