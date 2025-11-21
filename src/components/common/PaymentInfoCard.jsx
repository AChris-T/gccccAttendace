import React from 'react';

export default function PaymentInfoCard() {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-2">
            <div className="max-w-md w-full">
                {/* Compact Card */}
                <div className="bg-white rounded-xl shadow-lg p-5">
                    {/* Header */}
                    <div className="text-center mb-4">
                        <h1 className="text-lg font-bold text-gray-800">
                            Glory Realms Community Ministry
                        </h1>
                        <p className="text-sm text-gray-600">Ibadan Branch</p>
                    </div>

                    {/* Project Badge */}
                    <div className="flex justify-center mb-4">
                        <div className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-bold">
                            PROJECT ACCOUNT
                        </div>
                    </div>

                    {/* Bank Name */}
                    <div className="text-center mb-3">
                        <p className="text-xl font-bold text-blue-900">Access Bank</p>
                    </div>

                    {/* Account Number */}
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-3">
                        <p className="text-red-700 text-xs font-medium mb-1 text-center">Account Number</p>
                        <p className="text-red-700 text-2xl font-bold text-center tracking-wider">1845902081</p>
                    </div>

                    {/* Payment Description */}
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded">
                        <p className="text-gray-700 text-sm text-center">
                            <span className="font-semibold">Payment Description:</span>{' '}
                            <span className="font-bold text-blue-700">SOD 25</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}