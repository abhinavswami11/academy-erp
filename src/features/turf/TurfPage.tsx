import {
  useEffect,
  useMemo,
  useState,
} from "react";

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

import type {
  CreateBookingInput,
  TurfBooking,
} from "./types/turf.types";

function getToday(): string {
  return new Date()
    .toISOString()
    .split("T")[0];
}

export default function TurfPage() {
  const [bookings, setBookings] =
    useState<TurfBooking[]>([]);

  const [date, setDate] =
    useState(getToday);

  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  async function loadBookings() {
    try {
      setIsLoading(true);

      const data =
        await getBookings();

      setBookings(data);
    } catch (error) {
      console.error(
        "Failed to load turf bookings:",
        error,
      );

      window.alert(
        "Failed to load turf bookings.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadBookings();
  }, []);

  const filteredBookings =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return bookings.filter(
        (booking) => {
          const matchesDate =
            booking.date === date;

          const matchesSearch =
            !query ||
            booking.customerName
              .toLowerCase()
              .includes(query) ||
            booking.phone.includes(
              query,
            );

          return (
            matchesDate &&
            matchesSearch
          );
        },
      );
    }, [bookings, date, search]);

  async function handleCreateBooking(
    input: CreateBookingInput,
  ) {
    try {
      setIsSaving(true);

      const booking =
        await createBooking(input);

      if (!booking) {
        window.alert(
          "This turf slot is already booked. Please select another slot.",
        );

        return;
      }

      await loadBookings();

      setShowForm(false);

      window.alert(
        "Turf booking created successfully.",
      );
    } catch (error) {
      console.error(
        "Failed to create turf booking:",
        error,
      );

      window.alert(
        "Failed to create turf booking.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleCancelBooking(
    bookingId: string,
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to cancel this booking?",
      );

    if (!confirmed) {
      return;
    }

    try {
      setIsSaving(true);

      const success =
        await cancelBooking(
          bookingId,
        );

      if (!success) {
        window.alert(
          "Booking could not be found.",
        );

        return;
      }

      await loadBookings();

      window.alert(
        "Turf booking cancelled successfully.",
      );
    } catch (error) {
      console.error(
        "Failed to cancel turf booking:",
        error,
      );

      window.alert(
        "Failed to cancel turf booking.",
      );
    } finally {
      setIsSaving(false);
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
          onClick={() =>
            setShowForm(true)
          }
          disabled={isSaving}
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
          New Booking
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">
            Loading turf bookings...
          </p>
        </div>
      ) : (
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
            bookings={
              filteredBookings
            }
            onCancel={
              handleCancelBooking
            }
          />
        </div>
      )}

      {showForm && (
        <TurfBookingForm
          date={date}
          onSubmit={
            handleCreateBooking
          }
          onClose={() =>
            setShowForm(false)
          }
        />
      )}
    </div>
  );
}