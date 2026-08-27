export interface NavigationItem {
  label: string;
  path: string;
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Students",
    path: "/students",
  },
  {
    label: "Attendance",
    path: "/attendance",
  },
  {
    label: "Fees",
    path: "/fees",
  },
  {
    label: "Hostel",
    path: "/hostel",
  },
  {
    label: "Turf",
    path: "/turf",
  },
  {
    label: "Accounts",
    path: "/accounts",
  },
  {
    label: "Reports",
    path: "/reports",
  },
  {
    label: "Settings",
    path: "/settings",
  },
];
