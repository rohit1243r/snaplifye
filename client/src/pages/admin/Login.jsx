import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import { loginAdmin } from "@/services/auth.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/layout/Logo";
function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginAdmin(data);

      localStorage.setItem("token", res.token);

      toast.success("Login Successful 🎉");

      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };
  return (
    <AdminLayout>
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h1 className="mb-2 text-3xl font-bold">Admin Login</h1>

          <p className="mb-8 text-slate-400">Login to <Logo className="inline h-4 align-middle" /> Dashboard</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              type="email"
              placeholder="Admin Email"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}

            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Login;
