import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useAllFormMessages,
  useUpdateFormMessages,
  useDeleteFormMessages,
} from '@/queries/form.query';

export function useFormMessagesSelection(type) {
  const { data = [], isLoading, refetch } = useAllFormMessages(type);

  const [selectedIds, setSelectedIds] = useState([]);

  const allIds = useMemo(() => data.map((p) => p.id), [data]);
  const isAllSelected = selectedIds.length > 0 && selectedIds.length === allIds.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < allIds.length;

  // Clear selection whenever the active type (tab) changes
  useEffect(() => {
    setSelectedIds([]);
  }, [type]);

  // Clamp selection to only IDs present in current data
  useEffect(() => {
    setSelectedIds((prev) => prev.filter((id) => allIds.includes(id)));
  }, [allIds]);

  const toggleSelect = useCallback((id, checked) => {
    setSelectedIds((prev) => {
      const set = new Set(prev);
      if (checked) set.add(id);
      else set.delete(id);
      return Array.from(set);
    });
  }, []);

  const toggleSelectAll = useCallback(
    (checked) => {
      setSelectedIds(checked ? allIds : []);
    },
    [allIds]
  );

  const clearSelection = useCallback(() => setSelectedIds([]), []);

  const { mutate: updateMessages, isLoading: isUpdating } = useUpdateFormMessages({
    onSuccess: () => {
      clearSelection();
      refetch();
    },
  });

  const { mutate: deleteMessages, isLoading: isDeleting } = useDeleteFormMessages({
    onSuccess: () => {
      clearSelection();
      refetch();
    },
  });

  const updateSelected = useCallback(
    (attended) => {
      if (selectedIds.length === 0) return;
      updateMessages({ ids: selectedIds, attended });
    },
    [selectedIds, updateMessages]
  );

  const deleteSelected = useCallback(() => {
    if (selectedIds.length === 0) return;
    deleteMessages({ ids: selectedIds });
  }, [selectedIds, deleteMessages]);

  return {
    data,
    isLoading,
    selectedIds,
    isAllSelected,
    isIndeterminate,
    toggleSelect,
    toggleSelectAll,
    isUpdating,
    isDeleting,
    updateSelected,
    deleteSelected,
  };
}

export default useFormMessagesSelection;
