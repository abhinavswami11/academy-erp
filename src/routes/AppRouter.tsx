import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

import DashboardPage from "../features/dashboard/DashboardPage";

import StudentsPage from "../features/students/pages/StudentsPage";
import StudentProfilePage from "../features/students/pages/StudentProfilePage";

import AttendancePage from "../features/attendance/AttendancePage";

import FeesPage from "../features/fees/pages/FeesPage";

import HostelPage from "../features/hostel/HostelPage";

import TurfPage from "../features/turf/TurfPage";

import AccountsPage from "../features/accounts/AccountsPage";

import ReportsPage from "../features/reports/ReportsPage";

import SettingsPage from "../features/settings/SettingsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main application shell */}
        <Route element={<DashboardLayout />}>
          {/* Dashboard */}
          <Route index element={<DashboardPage />} />

          {/* Students */}
          <Route path="students" element={<StudentsPage />} />
          <Route
            path="students/:studentId"
            element={<StudentProfilePage />}
          />

          {/* Attendance */}
          <Route path="attendance" element={<AttendancePage />} />

          {/* Fees */}
          <Route path="fees" element={<FeesPage />} />

          {/* Hostel */}
          <Route path="hostel" element={<HostelPage />} />

          {/* Turf */}
          <Route path="turf" element={<TurfPage />} />

          {/* Accounts */}
          <Route path="accounts" element={<AccountsPage />} />

          {/* Reports */}
          <Route path="reports" element={<ReportsPage />} />

          {/* Settings */}
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}