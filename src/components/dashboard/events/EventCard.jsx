import React from 'react';
import { CalendarIcon, MapPinIcon, UsersIcon } from '@/icons/EventsIcons';

export default function EventCard({ event, onRegister }) {
  return (
    <div className="overflow-hidden transition-all duration-300 bg-white rounded shadow dark:bg-slate-800 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
        {event.imageUrl ? (
          <>
            <img
              src={event.imageUrl}
              alt={event.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-linear-to-br from-red-700 via-red-600 to-amber-600"></div>
            <div className="absolute inset-0 bg-black/20"></div>
          </>
        )}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-bold rounded-full shadow-lg bg-amber-400 text-slate-900">
            {event.status}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="mb-1 text-2xl font-bold text-white drop-shadow-lg">
            {event.title}
          </h3>
          <p className="text-white/90 drop-shadow-md">{event.subtitle}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 space-y-1 font-medium">
          <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
            <CalendarIcon />
            <span className="text-base">{event.date}</span>
          </div>
          <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
            <MapPinIcon />
            <span className="text-base">{event.location}</span>
          </div>
          <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
            <UsersIcon />
            <span className="text-base">{event.ministers.join(', ')}</span>
          </div>
        </div>

        <p className="mb-4 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
          {event.description}
        </p>

        <button
          onClick={onRegister}
          className="w-full py-3 font-semibold text-white transition-colors duration-200 bg-blue-600 hover:bg-blue-700 rounded-xl"
        >
          Register Now
        </button>
      </div>
    </div>
  );
}
