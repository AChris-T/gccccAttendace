import React, { useState } from 'react';
import { EmptyState } from '@/components/common/EmptyState';

export default function OngoingEvents() {
  const events = [
    {
      id: 202,
      title: 'Divine Demand 2025',
      subtitle: 'Pressing In',
      date: 'Mon 1 Sept - Tues 9th Dec, 2025',
      location: 'GCCC, Ibadan',
      description:
        'Corporate waiting on the Lord with daily impartations and teachings.',
      status: 'Ongoing',
      imageUrl: '/images/ongoing2.jpeg',
      ministers: ['Resident Pastors'],
    },
  ];

  return (
    <>
      {events.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <img
              key={event.id}
              src={event.imageUrl}
              alt={event.title}
              className="object-cover w-full h-full"
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No ongoing events"
          description="Check back later for ongoing events"
        />
      )}
    </>
  );
}
