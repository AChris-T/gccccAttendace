import { EmptyState } from '@/components/common/EmptyState';
import React, { useState, useMemo } from 'react';
import { useAuthStore } from '@/store/auth.store';
import usePayment from '@/hooks/usePayment';
import EventCard from './EventCard';
import EventCalculator from './EventCalculator';

export default function UpcomingEvents({ onSuccess }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useAuthStore();
  const { openPaystack } = usePayment();
  const events = [
    {
      id: 1,
      title: 'School of Destiny 2025',
      subtitle: 'The Call',
      date: 'December 15-21, 2025',
      location: 'Glory Centre Community Church, Lagos',
      address:
        'No 12, Efon Alaye Close, Off Olajide Street, Ojodu Berger, Lagos',
      description:
        "A life-changing annual convention where we seek God's face and prepare for the upcoming year. This year's theme 'The Call' is an important beckoning to everyone whom God will use and walk with in these times.",
      status: 'Preparation',
      imageUrl: '/images/sod-2025.png',
      ministers: ['Pst. Olakunle Zakariya', 'Pst. Adesola Zakariya'],
    },
  ];

  if (selectedEvent) {
    return (
      <EventCalculator
        event={selectedEvent}
        onBack={() => setSelectedEvent(null)}
        enableCouples
        onSuccess={async (registration) => {
          const email = user?.email || user?.username || 'user@example.com';
          const reference = `EVT-${selectedEvent.id}-${Date.now()}`;
          const metadata = {
            eventId: selectedEvent.id,
            eventTitle: selectedEvent.title,
            dates: registration.selectedDates,
          };
          // Open Paystack inline immediately after save
          await openPaystack({
            email,
            amount: registration.total,
            reference,
            metadata,
          });
          // Also bubble up to parent if provided
          onSuccess?.({ email, amount: registration.total, reference, metadata });
        }}
      />
    );
  }

  return (
    <>
      {events.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No ${activeTab} events`}
          description={`Check back later for ${activeTab} events`}
        />
      )}
    </>
  );
}
