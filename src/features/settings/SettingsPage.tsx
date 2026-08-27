import { useState } from "react";
import { Save, Building2, Bell, Database } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";

export default function SettingsPage() {
  const [academyName, setAcademyName] = useState("AcademyERP");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [currency, setCurrency] = useState("INR");
  const [academicYear, setAcademicYear] = useState("2026-27");
  const [defaultFee, setDefaultFee] = useState("3000");

  const [feeReminders, setFeeReminders] = useState(true);
  const [attendanceReminders, setAttendanceReminders] = useState(true);

  function handleSave() {
    window.alert("Settings saved successfully.");
  }

  function handleReset() {
    const confirmed = window.confirm(
      "Are you sure you want to reset demo data? This action cannot be undone."
    );

    if (confirmed) {
      window.alert("Demo data reset functionality will be connected later.");
    }
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage academy information and application preferences."
      />

      <div className="mt-6 space-y-6">
        {/* Academy Information */}
        <Card className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-slate-100 p-2">
              <Building2 className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Academy Information
              </h2>
              <p className="text-sm text-slate-500">
                Basic information about your academy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Academy Name
              </label>
              <input
                type="text"
                value={academyName}
                onChange={(e) => setAcademyName(e.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Academy phone number"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="academy@example.com"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Academy address"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </Card>

        {/* General Settings */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-slate-900">
            General Settings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure default values used throughout the academy.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Currency
              </label>

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Academic Year
              </label>

              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Default Monthly Fee
              </label>

              <input
                type="number"
                min="0"
                value={defaultFee}
                onChange={(e) => setDefaultFee(e.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-slate-100 p-2">
              <Bell className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Notifications
              </h2>

              <p className="text-sm text-slate-500">
                Configure academy notification preferences.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Fee Payment Reminders
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Receive reminders for pending student fees.
                </p>
              </div>

              <input
                type="checkbox"
                checked={feeReminders}
                onChange={(e) => setFeeReminders(e.target.checked)}
                className="h-4 w-4"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Attendance Reminders
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Receive reminders when attendance needs to be recorded.
                </p>
              </div>

              <input
                type="checkbox"
                checked={attendanceReminders}
                onChange={(e) =>
                  setAttendanceReminders(e.target.checked)
                }
                className="h-4 w-4"
              />
            </label>
          </div>
        </Card>

        {/* Data */}
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-slate-100 p-2">
              <Database className="h-5 w-5 text-slate-700" />
            </div>

            <div className="flex-1">
              <h2 className="text-base font-semibold text-slate-900">
                Data
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage demo and application data.
              </p>

              <Button
                variant="outline"
                className="mt-4"
                onClick={handleReset}
              >
                Reset Demo Data
              </Button>
            </div>
          </div>
        </Card>

        {/* Save */}
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}