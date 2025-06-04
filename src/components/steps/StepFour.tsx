"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Ship, Truck, Info, Search } from "lucide-react";

interface FormData {
  shippingType: string;
  serviceType: string;
  locationInput: string;
  deliveryAddress: string;
  // Add other form fields as needed
}

interface StepFourProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepFour: React.FC<StepFourProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  // Handle transport-only flow (pickup + delivery on same step)
  if (formData.shippingType === "transport-only") {
    const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateFormData("locationInput", e.target.value);
    };

    const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateFormData("deliveryAddress", e.target.value);
    };

    const handleNext = () => {
      if (formData.locationInput.trim() && formData.deliveryAddress.trim()) {
        onNext();
      }
    };

    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-4 lg:px-0">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
            Pickup & Delivery Details
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-4">
            Please provide both pickup and delivery locations for your
            transportation service.
          </p>
        </motion.div>

        {/* Pickup Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4 lg:p-6 xl:p-8"
        >
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <div>
              <Label
                htmlFor="pickup"
                className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 lg:mb-3 block"
              >
                Where should we arrange pickup for your shipment? *
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 lg:pl-5 xl:pl-6 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-400" />
                </div>
                <Input
                  id="pickup"
                  type="text"
                  placeholder="Enter complete pickup address or location details"
                  value={formData.locationInput}
                  onChange={handlePickupChange}
                  className="text-sm sm:text-base lg:text-lg p-3 lg:p-4 xl:p-6 pl-10 sm:pl-12 lg:pl-14 xl:pl-16 h-10 sm:h-12 lg:h-14 xl:h-16 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg lg:rounded-xl"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delivery Address Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4 lg:p-6 xl:p-8"
        >
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <div>
              <Label
                htmlFor="delivery"
                className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 lg:mb-3 block"
              >
                Final Delivery Address: *
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 lg:pl-5 xl:pl-6 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-400" />
                </div>
                <Input
                  id="delivery"
                  type="text"
                  placeholder="Enter complete delivery address"
                  value={formData.deliveryAddress}
                  onChange={handleDeliveryChange}
                  className="text-sm sm:text-base lg:text-lg p-3 lg:p-4 xl:p-6 pl-10 sm:pl-12 lg:pl-14 xl:pl-16 h-10 sm:h-12 lg:h-14 xl:h-16 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg lg:rounded-xl"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-4 lg:pt-6">
          <Button
            variant="outline"
            onClick={onPrev}
            className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-sm lg:text-base border-2 hover:bg-gray-50 order-2 sm:order-1"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              !formData.locationInput.trim() || !formData.deliveryAddress.trim()
            }
            className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-sm lg:text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg order-1 sm:order-2"
          >
            Continue to Container Details
          </Button>
        </div>
      </div>
    );
  }

  // Handle customs-inland flow (pickup + delivery on same step)
  if (formData.shippingType === "customs-inland") {
    const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateFormData("locationInput", e.target.value);
    };

    const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateFormData("deliveryAddress", e.target.value);
    };

    const handleNext = () => {
      if (formData.locationInput.trim() && formData.deliveryAddress.trim()) {
        onNext();
      }
    };

    const examplePickups = [
      "123 Industrial Avenue, Los Angeles, CA 90028",
      "Warehouse District, Building 5, Miami, FL 33101",
      "456 Export Street, Houston, TX 77002",
      "Manufacturing Complex, Seattle, WA 98101",
    ];

    const exampleDeliveries = [
      "789 Commerce Blvd, Chicago, IL 60601",
      "Distribution Center, Dallas, TX 75201",
      "321 Business Park Dr, Atlanta, GA 30301",
      "Retail Location, Phoenix, AZ 85001",
    ];

    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-4 lg:px-0">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
            Pickup & Delivery Details
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-4">
            Please provide both pickup and delivery locations for your customs
            clearance and inland transportation service.
          </p>
        </motion.div>

        {/* Pickup Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4 lg:p-6 xl:p-8"
        >
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <div>
              <Label
                htmlFor="pickup"
                className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 lg:mb-3 block"
              >
                Where should we arrange pickup for your shipment? *
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 lg:pl-5 xl:pl-6 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-400" />
                </div>
                <Input
                  id="pickup"
                  type="text"
                  placeholder="Enter complete pickup address or location details"
                  value={formData.locationInput}
                  onChange={handlePickupChange}
                  className="text-sm sm:text-base lg:text-lg p-3 lg:p-4 xl:p-6 pl-10 sm:pl-12 lg:pl-14 xl:pl-16 h-10 sm:h-12 lg:h-14 xl:h-16 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg lg:rounded-xl"
                />
              </div>
            </div>

            {/* Pickup Examples */}
            <div className="bg-gray-50 rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6">
              <div className="flex items-start space-x-2 lg:space-x-3">
                <Info className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2 lg:mb-3 text-xs sm:text-sm lg:text-base">
                    Example Pickup Addresses:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {examplePickups.map((example, idx) => (
                      <div
                        key={idx}
                        className="text-xs sm:text-sm text-gray-600 bg-white rounded-lg p-2 lg:p-3 border border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors"
                        onClick={() => updateFormData("locationInput", example)}
                      >
                        <MapPin className="w-3 h-3 lg:w-4 lg:h-4 inline mr-1 lg:mr-2 text-gray-400" />
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delivery Address Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4 lg:p-6 xl:p-8"
        >
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <div>
              <Label
                htmlFor="delivery"
                className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 lg:mb-3 block"
              >
                Final Delivery Address: *
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 lg:pl-5 xl:pl-6 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-400" />
                </div>
                <Input
                  id="delivery"
                  type="text"
                  placeholder="Enter complete delivery address"
                  value={formData.deliveryAddress}
                  onChange={handleDeliveryChange}
                  className="text-sm sm:text-base lg:text-lg p-3 lg:p-4 xl:p-6 pl-10 sm:pl-12 lg:pl-14 xl:pl-16 h-10 sm:h-12 lg:h-14 xl:h-16 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg lg:rounded-xl"
                />
              </div>
            </div>

            {/* Delivery Examples */}
            <div className="bg-gray-50 rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6">
              <div className="flex items-start space-x-2 lg:space-x-3">
                <Info className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2 lg:mb-3 text-xs sm:text-sm lg:text-base">
                    Example Delivery Addresses:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {exampleDeliveries.map((example, idx) => (
                      <div
                        key={idx}
                        className="text-xs sm:text-sm text-gray-600 bg-white rounded-lg p-2 lg:p-3 border border-gray-200 cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
                        onClick={() =>
                          updateFormData("deliveryAddress", example)
                        }
                      >
                        <MapPin className="w-3 h-3 lg:w-4 lg:h-4 inline mr-1 lg:mr-2 text-gray-400" />
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-4 lg:pt-6">
          <Button
            variant="outline"
            onClick={onPrev}
            className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-sm lg:text-base border-2 hover:bg-gray-50 order-2 sm:order-1"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              !formData.locationInput.trim() || !formData.deliveryAddress.trim()
            }
            className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-sm lg:text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg order-1 sm:order-2"
          >
            Continue to Container Details
          </Button>
        </div>
      </div>
    );
  }

  // Original air-sea flow logic
  const isFOB = formData.serviceType === "FOB (Freight on Board)";

  const getIcon = () => {
    if (isFOB) return <Ship className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />;
    return <Truck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />;
  };

  const getInputLabel = () => {
    if (isFOB) return "Port of Loading";
    return "Pickup Location";
  };

  const getInputPlaceholder = () => {
    if (isFOB)
      return "Enter port name (e.g., Port of Shanghai, Port of Rotterdam)";
    return "Enter complete pickup address or location details";
  };

  const getDescription = () => {
    if (isFOB) {
      return "Please specify the exact port where your goods will be loaded onto the vessel. Include the port name and country for accurate processing.";
    }
    return "Please provide the complete address where we should arrange pickup for your shipment. Include street address, city, state/province, and postal code.";
  };

  const getExamples = () => {
    if (isFOB) {
      return [
        "Port of Shanghai, China",
        "Port of Rotterdam, Netherlands",
        "Port of Los Angeles, USA",
        "Port of Hamburg, Germany",
      ];
    }
    return [
      "123 Industrial Avenue, Los Angeles, CA 90028",
      "Warehouse District, Building 5, Miami, FL 33101",
      "456 Export Street, Houston, TX 77002",
      "Manufacturing Complex, Seattle, WA 98101",
    ];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData("locationInput", e.target.value);
  };

  const handleNext = () => {
    if (formData.locationInput.trim()) {
      onNext();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-4 lg:px-0">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div
          className={`inline-flex p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl mb-2 sm:mb-3 lg:mb-4 ${
            isFOB
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
              : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
          }`}
        >
          {getIcon()}
        </div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
          {getInputLabel()} Details
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-4">
          {getDescription()}
        </p>
      </motion.div>

      {/* Main Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4 lg:p-6 xl:p-8"
      >
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          <div>
            <Label
              htmlFor="location"
              className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 lg:mb-3 block"
            >
              {getInputLabel()} *
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 lg:pl-5 xl:pl-6 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-400" />
              </div>
              <Input
                id="location"
                type="text"
                placeholder={getInputPlaceholder()}
                value={formData.locationInput}
                onChange={handleInputChange}
                className="text-sm sm:text-base lg:text-lg p-3 lg:p-4 xl:p-6 pl-10 sm:pl-12 lg:pl-14 xl:pl-16 h-10 sm:h-12 lg:h-14 xl:h-16 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg lg:rounded-xl"
              />
            </div>
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 border-2 ${
              isFOB
                ? "bg-blue-50 border-blue-200"
                : "bg-green-50 border-green-200"
            }`}
          >
            <h4
              className={`font-semibold mb-2 text-xs sm:text-sm lg:text-base ${
                isFOB ? "text-blue-900" : "text-green-900"
              }`}
            >
              {isFOB ? "Port Requirements:" : "Pickup Requirements:"}
            </h4>
            <ul
              className={`text-xs sm:text-sm space-y-1 ${
                isFOB ? "text-blue-800" : "text-green-800"
              }`}
            >
              {isFOB ? (
                <>
                  <li>• Include official port name and country</li>
                  <li>• Verify port has facilities for your cargo type</li>
                  <li>• Consider port congestion and schedule</li>
                  <li>• Check port security and customs procedures</li>
                </>
              ) : (
                <>
                  <li>• Provide complete street address with postal code</li>
                  <li>• Ensure location is accessible for freight vehicles</li>
                  <li>
                    • Include contact person and phone number if available
                  </li>
                  <li>
                    • Note any special access requirements or restrictions
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-4 lg:pt-6">
        <Button
          variant="outline"
          onClick={onPrev}
          className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-sm lg:text-base border-2 hover:bg-gray-50 order-2 sm:order-1"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!formData.locationInput.trim()}
          className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-sm lg:text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg order-1 sm:order-2"
        >
          Continue to Container Details
        </Button>
      </div>
    </div>
  );
};

export default StepFour;
