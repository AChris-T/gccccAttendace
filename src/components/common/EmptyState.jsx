const EmptyState = ({ message = "No data available", subMessage = "" }) => {
  return (
    <div className='flex flex-col gap-y-10 items-center justify-center text-center mt-5'>
      <div>
        <h2 className='lg:text-xl text-base font-semibold text-gray-800'>{message}</h2>
        <p className='text-gray-500 text-xs'>{subMessage}</p>
      </div>
    </div>
  );
};

export default EmptyState;
