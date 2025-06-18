"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Ship,
  Plane,
  Package,
  Shield,
  Thermometer,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormData {
  shippingType: string;
  freightType: string;
  handlingType: string;
  // Add other form fields as needed
}

interface StepTwoProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  // Different options based on shipping type
  const getOptions = () => {
    if (
      formData.shippingType === "customs-inland" ||
      formData.shippingType === "transport-only"
    ) {
      return [
        {
          id: "no-special",
          title: "No Special Handling",
          description:
            "Standard cargo handling procedures for regular shipments without special requirements",
          icon: <Package className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
          features: [
            "Standard procedures",
            "Regular handling",
            "Cost-effective",
            "Suitable for most cargo",
          ],
          gradient: "from-blue-500 to-cyan-500",
        },
        {
          id: "fragile",
          title: "Fragile/Sensitive Cargo",
          description:
            "Special care and handling for delicate items requiring extra protection during transport",
          icon: <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
          features: [
            "Extra protection",
            "Careful handling",
            "Specialized packaging",
            "Insurance coverage",
          ],
          gradient: "from-amber-500 to-orange-500",
        },
        {
          id: "temperature",
          title: "Temperature Controlled Cargo",
          description:
            "Climate-controlled transportation for temperature-sensitive goods and perishables",
          icon: (
            <Thermometer className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
          ),
          features: [
            "Temperature monitoring",
            "Climate control",
            "Cold chain management",
            "Real-time tracking",
          ],
          gradient: "from-emerald-500 to-teal-500",
        },
      ];
    } else {
      return [
        {
          id: "sea-freight",
          title: "Sea Freight",
          description:
            "Ideal for larger volumes with flexible timelines. Choose from direct or indirect vessels, depending on urgency and budget.",
          icon: <Ship className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
          features: [
            "Most economical",
            "High capacity",
            "Reliable global coverage",
            "Direct / indirect routing",
          ],
          gradient: "from-blue-500 to-cyan-500",
        },
        {
          id: "air-freight",
          title: "Air Freight",
          description:
            "Best for urgent or high-value shipments. Faster transit, tighter handling — ideal for palletized cargo.",
          icon: <Plane className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
          features: [
            "1–7 days transit",
            "Better suited for pallets",
            "Global network",
            "Urgent delivery options",
          ],
          gradient: "from-indigo-500 to-purple-500",
        },
      ];
    }
  };

  const options = getOptions();
  const fieldName =
    formData.shippingType === "customs-inland" ||
    formData.shippingType === "transport-only"
      ? "handlingType"
      : "freightType";
  const selectedValue =
    formData.shippingType === "customs-inland" ||
    formData.shippingType === "transport-only"
      ? formData.handlingType
      : formData.freightType;

  const handleSelect = (optionId: string) => {
    updateFormData(fieldName as keyof FormData, optionId);
    // Add a small delay before navigating to the next step
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0">
      <div
        className={`grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 ${
          options.length === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 ${
              selectedValue === option.id
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

              <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                      selectedValue === option.id
                        ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg`
                        : "bg-gray-50 text-gray-600 group-hover:bg-gray-100"
                    }`}
                  >
                    {option.icon}
                  </div>
                  {selectedValue === option.id && (
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
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                  {option.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {option.description}
                </p>

                {/* Features Grid - Responsive layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  {option.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 ${
                          selectedValue === option.id
                            ? "bg-blue-500"
                            : "bg-gray-400"
                        }`}
                      />
                      <span className="text-xs sm:text-sm text-gray-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Indicator */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                  <div
                    className={`flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                      selectedValue === option.id
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    <span>Select this option</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Previous button only - Next button removed since we auto-navigate */}
      <div className="flex justify-start pt-6 sm:pt-8 px-4 sm:px-0">
        <Button
          variant="outline"
          onClick={onPrev}
          className="px-6 sm:px-8 py-3 text-sm sm:text-base border-2 hover:bg-gray-50"
        >
          Previous
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
