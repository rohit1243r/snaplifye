import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoutes from "./routes/AppRoutes";
import QuoteDialog from "@/components/forms/QuoteDialog";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AppRoutes />
      <QuoteDialog />
    </GoogleOAuthProvider>
  );
}

export default App;
