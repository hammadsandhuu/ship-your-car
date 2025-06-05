"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FormData {
  containerType: string;
  shippingType: string;
  // Add other form fields as needed
}

interface StepFiveProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepFive: React.FC<StepFiveProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  // For all flows, this is now the container selection step
  const containerOptions = [
    {
      id: "20ft-container",
      title: "20FT Full Container",
      description:
        "Standard 20-foot container for smaller shipments and general cargo",
      dimensions: "20' × 8' × 8.5'",
      capacity: "Up to 28,000 lbs",
      volume: "1,172 cubic feet",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "40ft-container",
      title: "40FT Full Container",
      description:
        "Standard 40-foot container for larger shipments and bulk cargo",
      dimensions: "40' × 8' × 8.5'",
      capacity: "Up to 58,000 lbs",
      volume: "2,385 cubic feet",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: "lcl-palletized",
      title: "LCL / Palletized Cargo",
      description:
        "Less than Container Load for smaller shipments that share container space",
      dimensions: "Variable sizing",
      capacity: "Flexible weight",
      volume: "Shared container",
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  const handleSelect = (optionId: string) => {
    updateFormData("containerType", optionId);
    // Add a small delay before navigating to the next step
    setTimeout(() => {
      onNext();
    }, 300);
  };

  const getNextButtonText = () => {
    if (formData.shippingType === "transport-only") {
      return "Continue to Timeline & Meeting";
    }
    return "Continue to Timeline";
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0">
      {/* Container Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {containerOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 ${
              formData.containerType === option.id
                ? "ring-2 sm:ring-4 ring-blue-500 ring-opacity-50 shadow-xl sm:shadow-2xl"
                : "hover:shadow-xl sm:hover:shadow-2xl shadow-md sm:shadow-lg"
            }`}
            onClick={() => handleSelect(option.id)}
          >
            <div className="relative bg-white p-4 sm:p-6 lg:p-8 h-full border border-gray-100">
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                      formData.containerType === option.id
                        ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg`
                        : "bg-gray-50 text-gray-600 group-hover:bg-gray-100"
                    }`}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg"></div>
                  </div>
                  {formData.containerType === option.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <svg
                        className="w-3 h-3 sm:w-5 sm:h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                    {option.title}
                  </h3>
                  {/* <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {option.description}
                  </p> */}

                  {/* Specifications */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        Dimensions:
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600">
                        {option.dimensions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        Capacity:
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600">
                        {option.capacity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        Volume:
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600">
                        {option.volume}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Selection Indicator */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4">
                  <div
                    className={`flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                      formData.containerType === option.id
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    <span>Select this option</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Previous button only */}
      <div className="flex justify-start pt-6 sm:pt-8 px-4 sm:px-0">
        <Button
          variant="outline"
          onClick={onPrev}
          className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base border-2 hover:bg-gray-50"
        >
          Previous
        </Button>
      </div>
    </div>
  );
};

export default StepFive;
