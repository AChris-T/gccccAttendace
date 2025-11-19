import { useState, useMemo, useEffect, useCallback } from 'react';
import { Toast } from '@/lib/toastify';
import usePayment from '@/hooks/usePayment';
import { useAuthStore } from '@/store/auth.store';
import {
  useCreateEvent,
  useGetEvent,
  useUpdateEvent,
} from '@/queries/events.query';

export default function useEventCalculatorState({
  event,
  enableCouples,
  onSuccess,
}) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [transportation, setTransportation] = useState({
    to: false,
    fro: false,
  });
  const [feeding, setFeeding] = useState(false);
  const [couples, setCouples] = useState(false);
  const [saved, setSaved] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [formData, setFormData] = useState({
    interested_in_serving: true,
    integrated_into_a_unit: true,
    specify_unit: '',
    is_student: false,
    institution: '',
  });
  const [readyToPay, setReadyToPay] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [hasLoadedExisting, setHasLoadedExisting] = useState(false);

  const eventKey = event?.title;

  const { openPaystack, createReference, startPayment, isInitiating } =
    usePayment();
  const { user } = useAuthStore();

  const {
    data: members,
    isLoading,
    refetch,
  } = useGetEvent(
    eventKey ? { event: eventKey } : {},
    { enabled: Boolean(eventKey) }
  );

  const { mutate: registerEvent, isPending: isCreating } = useCreateEvent({
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: updateEvent, isPending: isUpdating } = useUpdateEvent({
    onSuccess: () => {
      refetch();
    },
  });

  const isSaving = isCreating || isUpdating;

  const resetSavedState = useCallback(() => {
    setSaved(false);
    setRegistrationData(null);
    setReadyToPay(false);
  }, []);

  const dates = useMemo(() => {
    const start = new Date(2025, 11, 15);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push({
        date: date.getDate(),
        day: date.toLocaleDateString('en-NG', { weekday: 'short' }),
        full: date.toLocaleDateString('en-NG', {
          month: 'short',
          day: 'numeric',
        }),
      });
    }
    return days;
  }, []);

  const normalizedRegistrations = useMemo(() => {
    if (!members?.data) return [];
    return Array.isArray(members.data) ? members.data : [members.data];
  }, [members?.data]);

  const existingRegistration = useMemo(() => {
    if (!eventKey) return null;
    return (
      normalizedRegistrations.find((reg) => reg.event === eventKey) || null
    );
  }, [normalizedRegistrations, eventKey]);

  useEffect(() => {
    if (existingRegistration && !hasLoadedExisting && !saved) {
      const mappedData = {
        id: existingRegistration.id,
        event: existingRegistration.event,
        selectedDates: existingRegistration.selected_dates || [],
        numDays: existingRegistration.num_days || 0,
        nights: existingRegistration.nights || 0,
        accommodation: existingRegistration.accommodation
          ? existingRegistration.couples
            ? (existingRegistration.nights || 0) * 10000
            : (existingRegistration.nights || 0) * 7000
          : 0,
        feeding: existingRegistration.feeding || false,
        feedingCost: parseFloat(existingRegistration.feeding_cost || 0),
        transportCost: parseFloat(existingRegistration.transport_cost || 0),
        couples: existingRegistration.couples || false,
        couplesCost: parseFloat(existingRegistration.couples_cost || 0),
        total: parseFloat(existingRegistration.total || 0),
        transportation: existingRegistration.transportation || {
          to: false,
          fro: false,
        },
        timestamp: existingRegistration.created_at,
      };

      setRegistrationData(mappedData);
      setSaved(true);
      setReadyToPay(true);
      setHasLoadedExisting(true);
      setRegistrationId(existingRegistration.id);

      if (existingRegistration.selected_dates && dates.length > 0) {
        const dayIndices = existingRegistration.selected_dates
          .map((dateStr) => dates.findIndex((d) => d.full === dateStr))
          .filter((idx) => idx !== -1);
        setSelectedDays(dayIndices);
      }

      if (existingRegistration.transportation) {
        setTransportation({
          to: existingRegistration.transportation.to || false,
          fro: existingRegistration.transportation.fro || false,
        });
      }

      setFeeding(existingRegistration.feeding || false);
      setCouples(existingRegistration.couples || false);
      setFormData({
        interested_in_serving:
          existingRegistration.interested_in_serving ?? true,
        integrated_into_a_unit:
          existingRegistration.integrated_into_a_unit ?? true,
        specify_unit: existingRegistration.specify_unit || '',
        is_student: existingRegistration.is_student || false,
        institution: existingRegistration.institution || '',
      });
    }
  }, [
    existingRegistration,
    dates,
    hasLoadedExisting,
    saved,
  ]);

  const toggleDay = useCallback(
    (index) => {
      resetSavedState();
      const newSelected = [...selectedDays];
      const dayIndex = newSelected.indexOf(index);
      if (dayIndex > -1) newSelected.splice(dayIndex, 1);
      else newSelected.push(index);
      setSelectedDays(newSelected.sort((a, b) => a - b));
    },
    [selectedDays, resetSavedState]
  );

  const handleCouplesChange = useCallback(
    (checked) => {
      resetSavedState();
      setCouples(checked);
    },
    [resetSavedState]
  );

  const handleTransportationChange = useCallback(
    (newTransportation) => {
      resetSavedState();
      setTransportation(newTransportation);
    },
    [resetSavedState]
  );

  const handleFeedingChange = useCallback(
    (checked) => {
      resetSavedState();
      setFeeding(checked);
    },
    [resetSavedState]
  );

  const handleFormDataChange = useCallback(
    (newFormData) => {
      resetSavedState();
      setFormData(newFormData);
    },
    [resetSavedState]
  );

  const handleNewRegistration = useCallback(() => {
    resetSavedState();
    setSelectedDays([]);
    setTransportation({ to: false, fro: false });
    setFeeding(false);
    setCouples(false);
    setHasLoadedExisting(false);
    setRegistrationId(null);
    setIsProcessingPayment(false);
  }, [resetSavedState]);

  const isConsecutive = useMemo(() => {
    if (selectedDays.length === 0) return true;
    const sorted = [...selectedDays].sort((a, b) => a - b);
    for (let i = 1; i < sorted.length; i++)
      if (sorted[i] - sorted[i - 1] !== 1) return false;
    return true;
  }, [selectedDays]);

  const calculations = useMemo(() => {
    const numDays = selectedDays.length;
    const nights = Math.max(0, numDays - 1);
    const isCouples = enableCouples && couples;
    const accommodation = isCouples ? nights * 10000 : nights * 7000;
    const feedingCost = feeding ? numDays * 1500 : 0;
    const transportCost =
      (transportation.to ? 5000 : 0) + (transportation.fro ? 5000 : 0);
    const couplesCost = 0;
    const total = accommodation + feedingCost + transportCost + couplesCost;
    return {
      numDays,
      nights,
      accommodation,
      feeding,
      feedingCost,
      transportCost,
      couples: isCouples,
      couplesCost,
      total,
    };
  }, [selectedDays, transportation, feeding, couples, enableCouples]);

  const handleSave = useCallback(async () => {
    if (!eventKey) {
      Toast.error('Event information is missing.');
      return;
    }

    if (!isConsecutive || selectedDays.length === 0) return;
    if (formData.integrated_into_a_unit && !formData.specify_unit?.trim()) {
      Toast.error('Please specify your unit');
      return;
    }
    if (formData.is_student && !formData.institution?.trim()) {
      Toast.error('Please enter your institution');
      return;
    }

    const savedData = {
      event: eventKey,
      selectedDates: selectedDays.map((i) => dates[i].full),
      ...calculations,
      transportation,
      timestamp: new Date().toISOString(),
    };

    const payload = {
      event: savedData.event,
      selected_dates: savedData.selectedDates,
      num_days: savedData.numDays,
      nights: savedData.nights,
      accommodation: selectedDays.length > 0,
      feeding: savedData.feeding,
      feeding_cost: savedData.feedingCost,
      transport_cost: savedData.transportCost,
      couples: savedData.couples,
      couples_cost: savedData.couplesCost,
      total: savedData.total,
      interested_in_serving: formData.interested_in_serving,
      integrated_into_a_unit: formData.integrated_into_a_unit,
      specify_unit: formData.specify_unit,
      is_student: formData.is_student,
      institution: formData.institution,
      transportation: {
        to: savedData.transportation.to,
        fro: savedData.transportation.fro,
      },
    };

    const mutationFn = registrationId ? updateEvent : registerEvent;
    const mutationPayload = registrationId
      ? { id: registrationId, ...payload }
      : payload;

    try {
      mutationFn(mutationPayload, {
        onSuccess: (responseData) => {
          const backendRegistrationId = responseData?.data?.id;

          const resolvedRegistrationId =
            backendRegistrationId ?? registrationId ?? existingRegistration?.id ?? null;

          const updatedSavedData = {
            ...savedData,
            id: resolvedRegistrationId,
          };

          setRegistrationId(resolvedRegistrationId);
          setRegistrationData(updatedSavedData);
          setReadyToPay(true);
          setSaved(true);
          onSuccess?.(updatedSavedData);
        },
      });
    } catch (error) {
    }
  }, [
    calculations,
    eventKey,
    existingRegistration,
    formData,
    isConsecutive,
    registerEvent,
    registrationId,
    selectedDays,
    transportation,
    updateEvent,
    dates,
    onSuccess,
  ]);

  const handleProceedToPay = useCallback(async () => {
    if (isProcessingPayment || isInitiating) return;
    if (!registrationData) {
      Toast.error('Please save your registration before proceeding to payment.');
      return;
    }

    if (!registrationId) {
      Toast.error('Unable to locate your registration record. Please save again.');
      return;
    }

    const amount = Number(registrationData.total);
    if (!amount || amount <= 0) {
      Toast.error('Invalid amount. Please review your selection.');
      return;
    }

    const email = user?.email || user?.username || 'user@example.com';
    const reference = createReference('EVT');
    const metadata = {
      eventId: event?.id,
      eventTitle: eventKey,
      dates: registrationData.selectedDates,
    };

    try {
      setIsProcessingPayment(true);
      const paymentResult = await openPaystack({
        email,
        amount,
        reference,
        metadata,
      });

      if (paymentResult?.status !== 'success') {
        Toast.error('Payment was not completed.');
        return;
      }

      const transactionReference =
        paymentResult?.response?.reference || reference;

      await startPayment({
        registration: registrationId,
        payload: {
          amount,
          payment_method: 'paystack',
          note: `Payment for ${registrationData.event}`,
          transaction_reference: transactionReference,
        },
      });

      setReadyToPay(false);
    } catch (error) {
      // Toast handled by hooks
    } finally {
      setIsProcessingPayment(false);
    }
  }, [
    createReference,
    event?.id,
    eventKey,
    isInitiating,
    isProcessingPayment,
    openPaystack,
    registrationData,
    registrationId,
    startPayment,
    user?.email,
    user?.username,
  ]);

  return {
    dates,
    selectedDays,
    transportation,
    feeding,
    couples,
    formData,
    saved,
    registrationData,
    readyToPay,
    isConsecutive,
    calculations,
    isLoading,
    isSaving,
    isProcessingPayment,
    isInitiating,
    toggleDay,
    handleCouplesChange,
    handleTransportationChange,
    handleFeedingChange,
    handleFormDataChange,
    handleNewRegistration,
    handleSave,
    handleProceedToPay,
  };
}

