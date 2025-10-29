import React from 'react';
import { EmptyState } from '@/components/common/EmptyState';
import EventCard from './EventCard';

export default function PastEvents() {
  const events = [
    {
      id: 301,
      title: 'SOD 2024',
      subtitle: 'Built To Last',
      date: 'Dec 16-22, 2024',
      location: 'GCCC, Lagos',
      description:
        'An unforgettable week of encounters and teachings from anointed ministers.',
      status: 'Completed',
      imageUrl: '/images/sod-2024.jpg',
      ministers: ['Guest Ministers'],
    },
    {
      id: 301,
      title: 'SOD 2024',
      subtitle: 'Built To Last',
      date: 'Dec 16-22, 2024',
      location: 'GCCC, Lagos',
      description:
        'An unforgettable week of encounters and teachings from anointed ministers.',
      status: 'Completed',
      imageUrl: '/images/sod-2024.jpg',
      ministers: ['Guest Ministers'],
    },
  ];

  return (
    <>
      {events.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onRegister={() => {}} />
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
