import { EmptyState } from '@/components/common/EmptyState';
import React, { useState, useMemo } from 'react';
import EventCard from './EventCard';
import EventCalculator from './EventCalculator';

export default function UpcomingEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);
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
