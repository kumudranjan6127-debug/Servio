import { Navigate, Route, Routes } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import { PinGateProvider } from "./context/PinProvider";
import { AdminLayout } from "./components/AdminLayout";
import { ProtectedAdminRoute } from "./components/guards/ProtectedAdminRoute";
import { RequirePinSession } from "./components/guards/RequirePinSession";
import { RequirePermission } from "./components/guards/RequirePermission";
import { AdminLogin } from "./pages/AdminLogin";
import { Unauthorized } from "./pages/Unauthorized";
import { PinVerify } from "./pages/PinVerify";
import { PinSetup } from "./pages/PinSetup";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Clients } from "./pages/Clients";
import { Messages } from "./pages/Messages";
import { Audit } from "./pages/Audit";
import { Settings } from "./pages/Settings";

/**
 * The `/admin/*` route subtree. Mounted from the app router under the shared
 * <AuthProvider>, it layers admin role/permission state (AdminProvider) and the
 * security-PIN gate (PinGateProvider) on top, then defines the protected routes.
 *
 * Authentication + PIN flow:
 *   1. /admin/login        → email/password sign-in
 *   2a. /admin/pin-setup   → PIN creation (first login / PIN missing)
 *   2b. /admin/pin-verify  → PIN entry (PIN already configured)
 *   3.  /admin/dashboard   → full access after PIN gate passes
 */
export function AdminApp() {
  return (
    <AdminProvider>
      <PinGateProvider>
        <Routes>
          {/* ── Public / semi-public routes ─────────────────────────── */}
          <Route path="login" element={<AdminLogin />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* ── PIN flow: requires Firebase auth + admin role ────────── */}
          {/*    but does NOT require pinSessionVerified yet              */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="pin-verify" element={<PinVerify />} />
            <Route path="pin-setup" element={<PinSetup />} />

            {/* ── Protected admin area: requires PIN session ──────── */}
            <Route element={<RequirePinSession />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route
                  path="dashboard"
                  element={
                    <RequirePermission permission="dashboard:view">
                      <Dashboard />
                    </RequirePermission>
                  }
                />
                <Route
                  path="projects"
                  element={
                    <RequirePermission permission="projects:view">
                      <Projects />
                    </RequirePermission>
                  }
                />
                <Route
                  path="clients"
                  element={
                    <RequirePermission permission="clients:view">
                      <Clients />
                    </RequirePermission>
                  }
                />
                <Route
                  path="messages"
                  element={
                    <RequirePermission permission="messages:view">
                      <Messages />
                    </RequirePermission>
                  }
                />
                <Route
                  path="audit"
                  element={
                    <RequirePermission permission="audit:view">
                      <Audit />
                    </RequirePermission>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <RequirePermission permission="settings:view">
                      <Settings />
                    </RequirePermission>
                  }
                />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </PinGateProvider>
    </AdminProvider>
  );
}
