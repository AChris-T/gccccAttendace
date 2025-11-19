import React from 'react';
import { ArrowLeftIcon } from '@/icons/EventsIcons';
import EventHeader from './EventHeader';
import AccommodationType from './AccommodationType';
import DaySelector from './DaySelector';
import TransportationSection from './TransportationSection';
import FeedingSection from './FeedingSection';
import AdditionalInformation from './AdditionalInformation';
import CostBreakdown from './CostBreakdown';
import RegistrationSummary from './RegistrationSummary';
import { LoadingIcon2 } from '@/icons';
import useEventCalculatorState from '../../../hooks/useEventCalculatorState';

export default function EventCalculator({
  event,
  onBack,
  enableCouples = false,
  onSuccess,
}) {
  const {
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
  } = useEventCalculatorState({ event, enableCouples, onSuccess });

  return (
    <>
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 transition-colors text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
      >
        <ArrowLeftIcon />
        Back to Events
      </button>
      {isLoading ? (
        <div className="flex items-center justify-center w-full p-6 text-center text-slate-600 dark:text-slate-400">
          <LoadingIcon2 />
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-10 overflow-hidden bg-white rounded shadow md:grid-cols-2 dark:bg-slate-800">
          <div>
            <EventHeader event={event} />
            {enableCouples && (
              <AccommodationType
                couples={couples}
                onCouplesChange={handleCouplesChange}
              />
            )}

            <DaySelector
              dates={dates}
              selectedDays={selectedDays}
              isConsecutive={isConsecutive}
              onToggleDay={toggleDay}
            />

            <TransportationSection
              transportation={transportation}
              onTransportationChange={handleTransportationChange}
            />

            <FeedingSection
              feeding={feeding}
              onFeedingChange={handleFeedingChange}
            />

            <AdditionalInformation
              formData={formData}
              onFormDataChange={handleFormDataChange}
            />
          </div>

          <div>
            {selectedDays.length > 0 && isConsecutive && !saved && (
              <CostBreakdown
                calculations={calculations}
                transportation={transportation}
                saved={saved}
                isPending={isSaving}
                onSave={handleSave}
              />
            )}

            {saved && registrationData && (
              <RegistrationSummary
                registrationData={registrationData}
                readyToPay={readyToPay}
                onNewRegistration={handleNewRegistration}
                onProceedToPay={handleProceedToPay}
                isProcessingPayment={isProcessingPayment || isInitiating}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
