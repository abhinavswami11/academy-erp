import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";

import TurfSummaryCards from "./components/TurfSummaryCards";
import TurfFilters from "./components/TurfFilters";
import TurfBookingTable from "./components/TurfBookingTable";
import TurfBookingForm from "./components/TurfBookingForm";

import {
  cancelBooking,
  createBooking,
  getBookings,
} from "./services/turf.service";

import type { CreateBookingInput } from "./types/turf.types";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export default function TurfPage() {
  const [bookings, setBookings] = useState(
    () => getBookings(),
  );

  const [date, setDate] = useState(getToday);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesDate =
        booking.date === date;

      const matchesSearch =
        !query ||
        booking.customerName
          .toLowerCase()
          .includes(query) ||
        booking.phone.includes(query);

      return matchesDate && matchesSearch;
    });
  }, [bookings, date, search]);

  function handleCreateBooking(
    input: CreateBookingInput,
  ) {
    const booking = createBooking(input);

    if (!booking) {
      window.alert(
        "This turf slot is already booked. Please select another slot.",
      );
      return;
    }

    setBookings(getBookings());
    setShowForm(false);

    window.alert(
      "Turf booking created successfully.",
    );
  }

  function handleCancelBooking(
    bookingId: string,
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) {
      return;
    }

    const success = cancelBooking(bookingId);

    if (success) {
      setBookings(getBookings());
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Turf"
          description="Schedule turf bookings, manage slots, and track revenue."
        />

        <Button
          onClick={() => setShowForm(true)}
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
          New Booking
        </Button>
      </div>

      <div className="space-y-6">
        <TurfFilters
          date={date}
          search={search}
          onDateChange={setDate}
          onSearchChange={setSearch}
        />

        <TurfSummaryCards
          bookings={bookings}
          date={date}
        />

        <TurfBookingTable
          bookings={filteredBookings}
          onCancel={handleCancelBooking}
        />
      </div>

      {showForm && (
        <TurfBookingForm
          date={date}
          onSubmit={handleCreateBooking}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}