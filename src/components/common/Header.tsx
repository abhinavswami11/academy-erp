import { Bell, Menu, Search, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { pathname } = useLocation();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2.5 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h2 className="text-lg font-semibold text-slate-900 lg:text-xl">
        {pageTitle}
      </h2>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search..."
            className="h-10 w-56 rounded-lg border border-slate-200 bg-slate-50 pr-4 pl-9 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary lg:w-64"
          />
        </div>

        <button
          type="button"
          className="relative rounded-lg p-2.5 text-slate-600 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden text-sm font-medium text-slate-700 sm:inline">
            Owner
          </span>
        </div>
      </div>
    </header>
  );
}
