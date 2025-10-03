// hooks/useSelectableList.js
import { useState, useMemo, useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  useDeleteFormMessages,
  useUpdateFormMessages,
} from '@/queries/form.query';

export function useSelectableList(items = []) {
  const [data, setData] = useState(items);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setData(items);
  }, [items]);

  const updateFormMessages = useUpdateFormMessages({
    onSuccess: () => {
      setData((prev) =>
        prev.map((q) =>
          selectedIds.includes(q.id) ? { ...q, attended: true } : q
        )
      );
      setSelectedIds([]);
    },
  });

  const deleteFormMessages = useDeleteFormMessages({
    onSuccess: () => {
      setData((prev) => prev.filter((q) => !selectedIds.includes(q.id)));
      setSelectedIds([]);
    },
  });

  const current = useMemo(
    () =>
      [...data]
        .filter((q) => dayjs(q.created_at).isSame(dayjs(), 'day'))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    [data]
  );

  const past = useMemo(
    () =>
      [...data]
        .filter((q) => !dayjs(q.created_at).isSame(dayjs(), 'day'))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    [data]
  );

  const handleSelect = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  }, []);

  const handleSelectAll = (list) => {
    const allIds = list.map((q) => q.id);
    setSelectedIds((prev) => (prev.length === allIds.length ? [] : allIds));
  };

  const handleConfirmDelete = () => {
    if (!selectedIds.length) return;
    deleteFormMessages.mutate({ ids: selectedIds });
    setShowDeleteModal(false);
  };

  const handleBulkMarkCompleted = () => {
    if (!selectedIds.length) return;
    updateFormMessages.mutate({ ids: selectedIds });
  };

  return {
    data,
    selectedIds,
    showDeleteModal,
    setShowDeleteModal,
    current,
    past,
    handleSelect,
    handleSelectAll,
    handleConfirmDelete,
    handleBulkMarkCompleted,
    updateFormMessages,
    deleteFormMessages,
  };
}
