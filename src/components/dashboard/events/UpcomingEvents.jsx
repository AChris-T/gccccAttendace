import { EmptyState } from '@/components/common/EmptyState';
import React, { useState } from 'react';
import EventCard from './EventCard';
import EventCalculator from './EventCalculator';
import { useGetMyRegistration } from '@/queries/picnic.query';

export default function UpcomingEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isError, isLoading } = useGetMyRegistration()
  const events = [

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
              isLoading={isLoading}
              isError={isError}
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
