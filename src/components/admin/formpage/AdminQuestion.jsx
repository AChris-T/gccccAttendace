import React, { useMemo, useState, useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  useDeleteFormMessages,
  useUpdateFormMessages,
} from '@/queries/form.query';

export default function AdminQuestion({ items = [] }) {
  const [questions, setQuestions] = useState(items);
  const [selectedIds, setSelectedIds] = useState([]);

  const updateFormMessages = useUpdateFormMessages({
    onSuccess: () => {
      setQuestions((prev) =>
        prev.map((q) =>
          selectedIds.includes(q.id) ? { ...q, attended: true } : q
        )
      );
      setSelectedIds([]);
    },
  });
  useEffect(() => {
    setQuestions(items);
  }, [items]);

  const deleteFormMessages = useDeleteFormMessages({
    onSuccess: () => {
      setQuestions((prev) =>
        prev.map((q) =>
          selectedIds.includes(q.id) ? { ...q, attended: true } : q
        )
      );
      setSelectedIds([]);
    },
  });

  useEffect(() => {
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

  const handleSelect = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  }, []);

  const handleSelectAll = (list) => {
    const allIds = list.map((q) => q.id);
    setSelectedIds((prev) => (prev.length === allIds.length ? [] : allIds));
  };

  const handleBulkDelete = () => {
    if (!selectedIds.length) return;
    deleteFormMessages.mutate({ ids: selectedIds });
  };
  const handleBulkMarkCompleted = () => {
    if (!selectedIds.length) return;
    updateFormMessages.mutate({ ids: selectedIds });
  };

  const renderList = (list) => (
    <div className="space-y-3">
      {list.map((q) => (
        <div
          key={q.id}
          className={
            `p-3 rounded-md border flex md:flex-row flex-col-reverse items-start justify-between gap-3 ` +
            (q.is_completed ? 'border-gray-200' : 'border-red-300')
          }
        >
          <label className="flex-1 cursor-pointer ml-2">
            <p className="text-sm text-gray-800 break-words dark:text-white">
              {q.content}
            </p>
            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-gray-500">
                {dayjs(q.created_at).format('dddd, MMM YYYY')} •{' '}
                {dayjs(q.created_at).format('h:mma')}
              </span>
            </div>
          </label>
          <div className="flex flex-row md:flex-col items-end md:gap-2 md:w-24 shrink-0">
            {' '}
            <input
              type="checkbox"
              checked={selectedIds.includes(q.id)}
              onChange={() => handleSelect(q.id)}
              className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />{' '}
            <div className="flex flex-col items-end gap-2 w-24 shrink-0">
              {q.is_completed && (
                <span className="inline-flex w-fit items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {' '}
                  Completed{' '}
                </span>
              )}{' '}
            </div>{' '}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {selectedIds.length > 0 && (
        <div className="flex gap-3 mb-4">
          <button
            onClick={handleBulkDelete}
            className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
          >
            Delete ({selectedIds.length})
          </button>
          <button
            onClick={handleBulkMarkCompleted}
            disabled={updateFormMessages.isLoading}
            className="px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-50"
          >
            {updateFormMessages.isLoading
              ? 'Updating...'
              : `Mark Completed (${selectedIds.length})`}
          </button>
        </div>
      )}

      <section>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold dark:text-white text-gray-700">
            Current questions
          </h4>
          {currentQuestions.length > 0 && (
            <button
              onClick={() => handleSelectAll(currentQuestions)}
              className="text-xs text-indigo-600"
            >
              {selectedIds.length === currentQuestions.length
                ? 'Unselect All'
                : 'Select All'}
            </button>
          )}
        </div>
        {currentQuestions.length ? (
          <div className="mt-2">{renderList(currentQuestions)}</div>
        ) : (
          <div className="mt-2 text-sm text-gray-500 dark:text-white">
            No current questions today.
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-white">
            Past questions
          </h4>
          {recentQuestions.length > 0 && (
            <button
              onClick={() => handleSelectAll(recentQuestions)}
              className="text-xs text-indigo-600"
            >
              {selectedIds.length === recentQuestions.length
                ? 'Unselect All'
                : 'Select All'}
            </button>
          )}
        </div>
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
