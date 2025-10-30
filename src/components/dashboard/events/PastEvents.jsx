import React from 'react';
import { EmptyState } from '@/components/common/EmptyState';
import EventCard from './EventCard';

export default function PastEvents() {
  const events = [
  ];

  return (
    <>
      {events.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onRegister={() => { }} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No past events"
          description="When events end, they'll appear here"
        />
      )}
    </>
  );
}
