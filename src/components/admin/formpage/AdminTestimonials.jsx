import React, { useMemo, useState, useCallback } from 'react';
import dayjs from 'dayjs';

export default function AdminTestimonials({ items = [], isLoading, isError, error, type = 'testimony' }) {
  const [questions, setQuestions] = useState(items);

  React.useEffect(() => {
    setQuestions(items);
  }, [items]);

  const currentQuestions = useMemo(() => {
    return [...questions]
      .filter((q) => dayjs(q.created_at).isSame(dayjs(), 'day'))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [questions]);

  const recentQuestions = useMemo(() => {
    return [...questions]
      .filter((q) => !dayjs(q.created_at).isSame(dayjs(), 'day'))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [questions]);

  const formatDisplayDate = useCallback((iso) => {
    const d = dayjs(iso);
    const weekday = d.format('dddd');
    let month = d.format('MMM');
    if (month === 'Sep') month = 'Sept';
    const year = d.format('YYYY');
    return `${weekday},${month},${year}`;
  }, []);

  const formatDisplayTime = useCallback((iso) => {
    return dayjs(iso).format('h:mma');
  }, []);

  const handleToggleAttended = useCallback((id) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              attended: !q.attended,
            }
          : q
      )
    );
  }, []);

  if (isLoading) {
    return <div className="text-sm text-gray-500 dark:text-white">Loading testimonies...</div>;
  }

  if (isError) {
    return <div className="text-sm text-red-600">{error?.message || 'Failed to load testimonies.'}</div>;
  }

  if (!questions.length) {
    return <div className="text-sm text-gray-500 dark:text-white">No testimonies available.</div>;
  }

  const renderList = (list) => (
    <div className="space-y-3">
      {list.map((q) => (
        <div
          key={q.id}
          className={
            `p-3 rounded-md border flex items-start justify-between gap-3 dark:text-white ` +
            (q.attended ? 'border-gray-200' : 'border-red-300')
          }
        >
          <label htmlFor={`attended-${q.id}`} className="flex-1 cursor-pointer">
            <p className="text-sm text-gray-800 break-words dark:text-white">
              {q.content}
            </p>
            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-gray-500 dark:text-white">
                {formatDisplayDate(q.created_at)} •{' '}
                {formatDisplayTime(q.created_at)}
              </span>
            </div>
          </label>
          <div className="flex flex-col items-end gap-2 w-24 shrink-0">
            <input
              id={`attended-${q.id}`}
              type="checkbox"
              checked={q.attended}
              onChange={() => handleToggleAttended(q.id)}
              className="h-4 w-4 rounded mr-3 border-gray-300 text-[#24244e] focus:ring-[#24244e]"
            />
            {q.attended && (
              <span className="inline-flex w-fit items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Completed
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <section>
        <h4 className="text-sm font-semibold text-gray-700 dark:text-white">
          Current Testimony
        </h4>
        {currentQuestions.length ? (
          <div className="mt-2">{renderList(currentQuestions)}</div>
        ) : (
          <div className="mt-2 text-sm text-gray-500">
            No current questions today.
          </div>
        )}
      </section>
      <section>
        <h4 className="text-sm font-semibold text-gray-700 dark:text-white">
          Past Testimony
        </h4>
        {recentQuestions.length ? (
          <div className="mt-2">{renderList(recentQuestions)}</div>
        ) : (
          <div className="mt-2 text-sm text-gray-500 dark:text-white">
            No recent questions.
          </div>
        )}
      </section>
    </div>
  );
}
