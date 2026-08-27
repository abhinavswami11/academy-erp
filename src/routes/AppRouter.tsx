import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import DashboardPage from "../features/dashboard/DashboardPage";
import StudentsPage from "../features/students/pages/StudentsPage";
import StudentProfilePage from "../features/students/pages/StudentProfilePage";
import AttendancePage from "../features/attendance/AttendancePage";
import FeesPage from "../features/fees/FeesPage";
import HostelPage from "../features/hostel/HostelPage";
import TurfPage from "../features/turf/TurfPage";
import AccountsPage from "../features/accounts/AccountsPage";
import ReportsPage from "../features/reports/ReportsPage";
import SettingsPage from "../features/settings/SettingsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/:studentId" element={<StudentProfilePage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="fees" element={<FeesPage />} />
          <Route path="hostel" element={<HostelPage />} />
          <Route path="turf" element={<TurfPage />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
