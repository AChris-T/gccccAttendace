export default function EventHeader({ event }) {
  return (
    <div className="relative h-48 overflow-hidden bg-linear-to-br from-red-700 via-red-600 to-amber-600">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative flex items-center justify-center h-full px-6 text-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            {event.title}
          </h1>
          <p className="text-lg text-white/90">{event.date}</p>
        </div>
      </div>
    </div>
  );
}

