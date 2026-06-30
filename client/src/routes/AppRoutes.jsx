import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Portfolio from "../pages/Portfolio";
import Pricing from "../pages/Pricing";
import Contact from "../pages/Contact";
import CostEstimator from "../pages/CostEstimator";
import NotFound from "../pages/NotFound";

import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import Projects from "@/pages/admin/Projects";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ClientProtectedRoute from "@/components/auth/ClientProtectedRoute";
import Contacts from "@/pages/admin/Contacts";
import Clients from "@/pages/admin/Clients";
import ClientDetail from "@/pages/admin/ClientDetail";

import ClientLayout from "@/layouts/ClientLayout";
import ClientLogin from "@/pages/client/Login";
import ClientDashboard from "@/pages/client/Dashboard";
import ClientProjects from "@/pages/client/Projects";
import ClientProjectDetail from "@/pages/client/ProjectDetail";
import ClientMessages from "@/pages/client/Messages";
import ClientInvoices from "@/pages/client/Invoices";
import ClientFiles from "@/pages/client/Files";
import ClientProfile from "@/pages/client/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />

        <Route
          path="/services"
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />

        <Route
          path="/portfolio"
          element={
            <Layout>
              <Portfolio />
            </Layout>
          }
        />

        <Route
          path="/pricing"
          element={
            <Layout>
              <Pricing />
            </Layout>
          }
        />

        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />

        <Route
          path="/cost-estimator"
          element={
            <Layout>
              <CostEstimator />
            </Layout>
          }
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<Login />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Projects */}
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/clients"
          element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/clients/:id"
          element={
            <ProtectedRoute>
              <ClientDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />

        {/* Client Login */}
        <Route
          path="/client/login"
          element={<ClientLogin />}
        />

        {/* Client Dashboard (Protected) */}
        <Route
          path="/client/dashboard"
          element={
            <ClientProtectedRoute>
              <ClientLayout>
                <ClientDashboard />
              </ClientLayout>
            </ClientProtectedRoute>
          }
        />

        <Route
          path="/client/projects"
          element={
            <ClientProtectedRoute>
              <ClientLayout>
                <ClientProjects />
              </ClientLayout>
            </ClientProtectedRoute>
          }
        />

        <Route
          path="/client/projects/:id"
          element={
            <ClientProtectedRoute>
              <ClientLayout>
                <ClientProjectDetail />
              </ClientLayout>
            </ClientProtectedRoute>
          }
        />

        <Route
          path="/client/messages"
          element={
            <ClientProtectedRoute>
              <ClientLayout>
                <ClientMessages />
              </ClientLayout>
            </ClientProtectedRoute>
          }
        />

        <Route
          path="/client/invoices"
          element={
            <ClientProtectedRoute>
              <ClientLayout>
                <ClientInvoices />
              </ClientLayout>
            </ClientProtectedRoute>
          }
        />

        <Route
          path="/client/files"
          element={
            <ClientProtectedRoute>
              <ClientLayout>
                <ClientFiles />
              </ClientLayout>
            </ClientProtectedRoute>
          }
        />

        <Route
          path="/client/profile"
          element={
            <ClientProtectedRoute>
              <ClientLayout>
                <ClientProfile />
              </ClientLayout>
            </ClientProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />



      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;