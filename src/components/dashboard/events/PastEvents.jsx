import React from 'react';
import { EmptyState } from '@/components/common/EmptyState';
import EventCard from './EventCard';

export default function PastEvents() {
  const events = [
    {
      id: 1,
      title: 'School of Destiny 2025',
      // subtitle: 'The Call',
      // date: 'December 15-21, 2025',
      // location: 'Glory Centre Community Church, Lagos',
      // address:
      //   'No 12, Efon Alaye Close, Off Olajide Street, Ojodu Berger, Lagos',
      // description:
      //   "A life-changing annual convention where we seek God's face and prepare for the upcoming year. This year's theme 'The Call' is an important beckoning to everyone whom God will use and walk with in these times.",
      // status: 'Preparation',
      eventType: 'past',
      imageUrl: '/images/sod-2025.png',
      // ministers: ['Pst. Olakunle Zakariya', 'Pst. Adesola Zakariya'],
    },
    {
      id: 202,
      title: 'Divine Demand 2025',
      imageUrl: '/images/ongoing1.jpeg',
      eventType: 'past',
    },
    {
      id: 203,
      title: 'Global Fasting and Prayer',
      imageUrl: '/images/ongoing3.jpeg',
      eventType: 'past',
    },
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
