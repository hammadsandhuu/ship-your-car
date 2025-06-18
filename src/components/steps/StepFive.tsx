"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Container, Ship, Snowflake, Plane, Box } from "lucide-react";

interface FormData {
  containerType: string;
  shippingType: string;
  freightType: string;
  shippingDescription?: string;
  coldStoragePreference?: string;
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
  // Get container options based on freight type
  const getContainerOptions = () => {
    const isAirFreight = formData.freightType === "air-freight";

    if (isAirFreight) {
      // Air freight specific options
      return [
        {
          id: "air-pallet-standard",
          title: "Standard Air Pallet",
          description:
            "Standard air freight pallet for general cargo shipments",
          dimensions: '96" × 125" × 96"',
          capacity: "Up to 11,000 lbs",
          volume: "1,000 cubic feet",
          gradient: "from-indigo-500 to-purple-500",
          icon: Plane,
        },
        {
          id: "air-pallet-large",
          title: "Large Air Pallet",
          description:
            "Large air freight pallet for bigger shipments and bulk cargo",
          dimensions: '125" × 96" × 118"',
          capacity: "Up to 15,000 lbs",
          volume: "1,400 cubic feet",
          gradient: "from-purple-500 to-indigo-600",
          icon: Box,
        },
        {
          id: "air-loose-cargo",
          title: "Loose Air Cargo",
          description:
            "Individual pieces or smaller shipments that don't require full pallet",
          dimensions: "Variable sizing",
          capacity: "Up to 150 lbs per piece",
          volume: "Flexible dimensions",
          gradient: "from-blue-500 to-indigo-500",
          icon: Package,
        },
      ];
    } else {
      // Sea freight options (original)
      return [
        {
          id: "20ft-container",
          title: "20FT Full Container",
          description:
            "Standard 20-foot container for smaller shipments and general cargo",
          dimensions: "20' × 8' × 8.5'",
          capacity: "Up to 28,000 lbs",
          volume: "1,172 cubic feet",
          gradient: "from-blue-500 to-cyan-500",
          icon: Container,
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
          icon: Ship,
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
          icon: Package,
        },
      ];
    }
  };

  const containerOptions = getContainerOptions();
  const isAirFreight = formData.freightType === "air-freight";

  const handleSelect = (optionId: string) => {
    updateFormData("containerType", optionId);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData("shippingDescription", e.target.value);
  };

  const handleColdStorageChange = (value: string) => {
    updateFormData("coldStoragePreference", value);
  };

  const handleNext = () => {
    onNext();
  };

  const getNextButtonText = () => {
    if (formData.shippingType === "transport-only") {
      return "Continue to Timeline & Meeting";
    }
    return "Continue to Timeline";
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0">
      {/* Air Freight Notice */}
      {/* {isAirFreight && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-indigo-200"
        >
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <Plane className="w-5 h-5 mr-2 text-indigo-600" />
            Air Freight Cargo Options
          </h4>
          <p className="text-gray-600 text-sm">
            Air freight uses pallets and loose cargo instead of containers.
            Choose the option that best fits your shipment size and
            requirements.
          </p>
        </motion.div>
      )} */}

      {/* Container/Cargo Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {containerOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
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
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                      formData.containerType === option.id
                        ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg`
                        : "bg-gray-50 text-gray-600 group-hover:bg-gray-100"
                    }`}
                  >
                    <option.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
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
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Specifications */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions:</span>
                      <span className="font-medium text-gray-900">
                        {option.dimensions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium text-gray-900">
                        {option.capacity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volume:</span>
                      <span className="font-medium text-gray-900">
                        {option.volume}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Selection Indicator */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                  <div
                    className={`flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                      formData.containerType === option.id
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    <span>
                      {formData.containerType === option.id
                        ? "Selected"
                        : "Select this option"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Shipping Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <div className="space-y-3 sm:space-y-4">
          <div>
            <Label
              htmlFor="shipping-description"
              className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 lg:mb-3 block"
            >
              What are you shipping?
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Optional)
              </span>
            </Label>
            <Input
              id="shipping-description"
              type="text"
              placeholder="e.g., electronics, furniture, cars, textiles"
              value={formData.shippingDescription || ""}
              onChange={handleDescriptionChange}
              className="text-sm sm:text-base lg:text-lg p-3 lg:p-4 h-10 sm:h-12 lg:h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg lg:rounded-xl"
            />
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              This helps us provide more accurate shipping recommendations and
              handling instructions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Temperature Controlled Checkbox Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <Snowflake className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <Label className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 block">
                Temperature Controlled?
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (Optional)
                </span>
              </Label>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Check if your cargo requires temperature-controlled shipping
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="temperature-controlled"
              checked={formData.coldStoragePreference === "yes"}
              onChange={(e) =>
                handleColdStorageChange(e.target.checked ? "yes" : "")
              }
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="temperature-controlled"
              className="text-sm sm:text-base font-medium text-gray-900 cursor-pointer"
            >
              Yes, my cargo requires temperature-controlled shipping
            </label>
          </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 px-4 sm:px-0">
        <Button
          variant="outline"
          onClick={onPrev}
          className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base border-2 hover:bg-gray-50 order-2 sm:order-1"
        >
          Previous
        </Button>

        {/* Next button - only shows when container is selected */}
        {formData.containerType && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="order-1 sm:order-2"
          >
            <Button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            >
              {getNextButtonText()}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StepFive;
