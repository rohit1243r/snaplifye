import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginClient, registerClient, googleLogin } from "@/services/clientAuth.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/layout/Logo";
import { useState } from "react";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function ClientLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data) => {
    try {
      const res = await loginClient(data);
      localStorage.setItem("clientToken", res.token);
      localStorage.setItem("client", JSON.stringify(res.client));
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  const onRegister = async (data) => {
    try {
      const res = await registerClient({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
      localStorage.setItem("clientToken", res.token);
      localStorage.setItem("client", JSON.stringify(res.client));
      toast.success("Registration Successful");
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Registration Failed";
      toast.error(message);
      if (error.response?.status === 409) {
        registerForm.setError("root.serverError", { message });
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute left-6 top-6 rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="mb-8 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-white">
            Client Portal
          </h1>
          <p className="mt-2 text-slate-400">
            {mode === "login" ? "Login to your client dashboard" : "Create your client account"}
          </p>
        </div>

        <div className="mb-6 flex rounded-xl border border-slate-800 bg-slate-950 p-1">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === "login"
                ? "bg-cyan-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === "register"
                ? "bg-cyan-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {mode === "login" ? (
          <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-5">
            <div>
              <Input
                type="email"
                placeholder="Email"
                {...loginForm.register("email")}
              />
              {loginForm.formState.errors.email && (
                <p className="mt-1 text-xs text-red-500">{loginForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...loginForm.register("password")}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {loginForm.formState.errors.password && (
                <p className="mt-1 text-xs text-red-500">{loginForm.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
              {loginForm.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-5">
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                {...registerForm.register("name")}
              />
              {registerForm.formState.errors.name && (
                <p className="mt-1 text-xs text-red-500">{registerForm.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email Address"
                {...registerForm.register("email")}
              />
              {registerForm.formState.errors.email && (
                <p className="mt-1 text-xs text-red-500">{registerForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Mobile Number"
                {...registerForm.register("phone")}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  registerForm.setValue("phone", val);
                }}
              />
              {registerForm.formState.errors.phone && (
                <p className="mt-1 text-xs text-red-500">{registerForm.formState.errors.phone.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...registerForm.register("password")}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {registerForm.formState.errors.password && (
                <p className="mt-1 text-xs text-red-500">{registerForm.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...registerForm.register("confirmPassword")}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {registerForm.formState.errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            {registerForm.formState.errors.root?.serverError && (
              <p className="text-center text-sm text-red-500">
                {registerForm.formState.errors.root.serverError.message}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={registerForm.formState.isSubmitting}>
              {registerForm.formState.isSubmitting ? "Creating account..." : "Register"}
            </Button>

            <p className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  registerForm.reset();
                }}
                className="text-cyan-400 hover:text-cyan-300 transition"
              >
                Login
              </button>
            </p>
          </form>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-3 text-slate-500">or</span>
          </div>
        </div>

        <GoogleLoginButton
          onSuccess={async (accessToken) => {
            try {
              const res = await googleLogin(accessToken);
              localStorage.setItem("clientToken", res.token);
              localStorage.setItem("client", JSON.stringify(res.client));
              toast.success("Google login successful");
              navigate("/");
            } catch (err) {
              toast.error(err.response?.data?.message || "Google login failed");
            }
          }}
          onError={() => {}}
        />
      </div>
    </div>
  );
}

export default ClientLogin;
