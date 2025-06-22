"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Package,
  Container,
  Ship,
  Box,
  ArrowRight,
  Weight,
  Ruler,
} from "lucide-react";

interface FormData {
  containerType: string;
  shippingType: string;
  freightType: string;
  shippingDescription?: string;
  coldStoragePreference?: string;
  cbm?: string;
  weight?: string;
  volume?: string;
  // New fields for dimensions and units
  dimensionLength?: string;
  dimensionWidth?: string;
  dimensionHeight?: string;
  dimensionUnit?: string; // 'cm' or 'inch'
  weightUnit?: string; // 'kg' or 'lb'
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const detailSectionRef = useRef<HTMLDivElement | null>(null);
  const isAirFreight = formData.freightType === "air-freight";
  const isContainerSelected =
    formData.containerType && formData.containerType !== "";

  // Initialize default units if not set
  useEffect(() => {
    if (isAirFreight && !formData.dimensionUnit) {
      updateFormData("dimensionUnit", "cm");
    }
    if (isAirFreight && !formData.weightUnit) {
      updateFormData("weightUnit", "kg");
    }
  }, [
    isAirFreight,
    formData.dimensionUnit,
    formData.weightUnit,
    updateFormData,
  ]);

  useEffect(() => {
    if (isContainerSelected && detailSectionRef.current) {
      detailSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isContainerSelected]);

  // Validation function for air freight
  const isAirFreightDataValid = () => {
    if (!isAirFreight) return true;

    const hasDimensions =
      formData.dimensionLength &&
      formData.dimensionWidth &&
      formData.dimensionHeight;
    const hasWeight = formData.weight;
    const hasVolume = formData.volume;

    // At least one of these should be filled
    return hasDimensions || hasWeight || hasVolume;
  };

  const getContainerOptions = () => {
    if (isAirFreight) {
      return [];
    } else {
      return [
        {
          id: "20ft-container",
          title: "20FT Container",
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
          title: "40FT/HC Container",
          description:
            "Standard or high-cube 40-foot container for larger shipments and bulk cargo",
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

  const handleSelect = (optionId: string) => {
    updateFormData("containerType", optionId);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData("shippingDescription", e.target.value);
  };

  const handleColdStorageChange = (value: string) => {
    updateFormData("coldStoragePreference", value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData("weight", e.target.value);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData("volume", e.target.value);
  };

  // New handlers for dimensions
  const handleDimensionChange = (
    dimension: "dimensionLength" | "dimensionWidth" | "dimensionHeight",
    value: string
  ) => {
    updateFormData(dimension, value);
  };

  const handleDimensionUnitChange = (unit: string) => {
    updateFormData("dimensionUnit", unit);
  };

  const handleWeightUnitChange = (unit: string) => {
    updateFormData("weightUnit", unit);
  };

  const handleNext = () => {
    onNext();
  };

  const getNextButtonText = () => {
    return formData.shippingType === "transport-only"
      ? "Continue to Timeline & Meeting"
      : "Continue to Timeline";
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Container/Cargo Options - Only shown for non-air freight */}
      {!isAirFreight && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {containerOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 border ${
                formData.containerType === option.id
                  ? "ring-2 sm:ring-4 ring-opacity-50 shadow-xl sm:shadow-2xl"
                  : "hover:shadow-xl sm:hover:shadow-2xl shadow-md sm:shadow-lg"
              } [--tw-ring-color:var(--primary)]`}
              style={{
                backgroundColor: "var(--black-5)",
                borderColor:
                  formData.containerType === option.id
                    ? "var(--primary)"
                    : "var(--black-6)",
              }}
              onClick={() => handleSelect(option.id)}
            >
              <div className="relative p-4 sm:p-6 h-full">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: "var(--primary)" }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <div
                      className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                        formData.containerType === option.id
                          ? "shadow-lg"
                          : "group-hover:opacity-80"
                      }`}
                      style={{
                        backgroundColor:
                          formData.containerType === option.id
                            ? "var(--primary)"
                            : "var(--black-6)",
                        color:
                          formData.containerType === option.id
                            ? "var(--black)"
                            : "var(--gray-2)",
                      }}
                    >
                      <option.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                    </div>
                    {formData.containerType === option.id && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: "var(--primary)" }}
                      >
                        <svg
                          className="w-3 h-3 sm:w-5 sm:h-5"
                          style={{ color: "var(--black)" }}
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
                  <div className="flex-grow">
                    <h3
                      className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 leading-tight"
                      style={{ color: "var(--white)" }}
                    >
                      {option.title}
                    </h3>
                    <p
                      className="text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed"
                      style={{ color: "var(--gray-2)" }}
                    >
                      {option.description}
                    </p>
                  </div>
                  <div
                    className="sm:mt-6 pt-3 sm:pt-4 border-t"
                    style={{ borderColor: "var(--black-6)" }}
                  >
                    <div
                      className={`flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                        formData.containerType === option.id
                          ? ""
                          : "group-hover:opacity-80"
                      }`}
                      style={{
                        color:
                          formData.containerType === option.id
                            ? "var(--primary)"
                            : "var(--gray-2)",
                      }}
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
      )}

      {/* CONDITIONAL SECTIONS WITH SCROLL */}
      <div ref={detailSectionRef}>
        {/* Air Freight Specific Fields - Always show for air freight */}
        {isAirFreight && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.1,
            }}
            className="rounded-2xl shadow-lg border p-4 sm:p-6 lg:p-8"
            style={{
              backgroundColor: "var(--black-5)",
              borderColor: "var(--black-6)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
            >
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h3
                  className="text-sm sm:text-base lg:text-lg font-semibold"
                  style={{ color: "var(--white)" }}
                >
                  Air Freight Details
                </h3>
              </div>
              {/* Responsive Grid Layout */}
              <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
                {/* Dimensions Combined */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Label
                      className="flex items-center text-sm font-medium"
                      style={{ color: "var(--white)" }}
                    >
                      <Ruler
                        className="w-4 h-4 mr-2"
                        style={{ color: "var(--primary)" }}
                      />
                      Dimensions
                    </Label>

                    {/* Unit Toggle for Dimensions */}
                    <div
                      className="flex rounded-lg p-1"
                      style={{ backgroundColor: "var(--black-6)" }}
                    >
                      <button
                        type="button"
                        onClick={() => handleDimensionUnitChange("cm")}
                        className={`px-2 py-1 text-xs rounded-md transition-all duration-200 ${
                          formData.dimensionUnit === "cm" ? "shadow-sm" : ""
                        }`}
                        style={{
                          backgroundColor:
                            formData.dimensionUnit === "cm"
                              ? "var(--primary)"
                              : "transparent",
                          color:
                            formData.dimensionUnit === "cm"
                              ? "var(--black)"
                              : "var(--gray-2)",
                        }}
                      >
                        CM
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDimensionUnitChange("inch")}
                        className={`px-2 py-1 text-xs rounded-md transition-all duration-200 ${
                          formData.dimensionUnit === "inch" ? "shadow-sm" : ""
                        }`}
                        style={{
                          backgroundColor:
                            formData.dimensionUnit === "inch"
                              ? "var(--primary)"
                              : "transparent",
                          color:
                            formData.dimensionUnit === "inch"
                              ? "var(--black)"
                              : "var(--gray-2)",
                        }}
                      >
                        IN
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      type="number"
                      placeholder="L"
                      value={formData.dimensionLength || ""}
                      onChange={(e) =>
                        handleDimensionChange("dimensionLength", e.target.value)
                      }
                      className="text-sm p-2 h-10 border-2 rounded-xl transition-all duration-300 focus:shadow-lg focus:border-opacity-50"
                      style={{
                        backgroundColor: "var(--black-6)",
                        borderColor: "var(--black-7)",
                        color: "var(--white-2)",
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="W"
                      value={formData.dimensionWidth || ""}
                      onChange={(e) =>
                        handleDimensionChange("dimensionWidth", e.target.value)
                      }
                      className="text-sm p-2 h-10 border-2 rounded-xl transition-all duration-300 focus:shadow-lg focus:border-opacity-50"
                      style={{
                        backgroundColor: "var(--black-6)",
                        borderColor: "var(--black-7)",
                        color: "var(--white-2)",
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="H"
                      value={formData.dimensionHeight || ""}
                      onChange={(e) =>
                        handleDimensionChange("dimensionHeight", e.target.value)
                      }
                      className="text-sm p-2 h-10 border-2 rounded-xl transition-all duration-300 focus:shadow-lg focus:border-opacity-50"
                      style={{
                        backgroundColor: "var(--black-6)",
                        borderColor: "var(--black-7)",
                        color: "var(--white-2)",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Weight Input */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="weight"
                      className="flex items-center text-sm font-medium"
                      style={{ color: "var(--white)" }}
                    >
                      <Weight
                        className="w-4 h-4 mr-2"
                        style={{ color: "var(--primary)" }}
                      />
                      Weight
                    </Label>

                    {/* Unit Toggle for Weight */}
                    <div
                      className="flex rounded-lg p-1"
                      style={{ backgroundColor: "var(--black-6)" }}
                    >
                      <button
                        type="button"
                        onClick={() => handleWeightUnitChange("kg")}
                        className={`px-2 py-1 text-xs rounded-md transition-all duration-200 ${
                          formData.weightUnit === "kg" ? "shadow-sm" : ""
                        }`}
                        style={{
                          backgroundColor:
                            formData.weightUnit === "kg"
                              ? "var(--primary)"
                              : "transparent",
                          color:
                            formData.weightUnit === "kg"
                              ? "var(--black)"
                              : "var(--gray-2)",
                        }}
                      >
                        KG
                      </button>
                      <button
                        type="button"
                        onClick={() => handleWeightUnitChange("lb")}
                        className={`px-2 py-1 text-xs rounded-md transition-all duration-200 ${
                          formData.weightUnit === "lb" ? "shadow-sm" : ""
                        }`}
                        style={{
                          backgroundColor:
                            formData.weightUnit === "lb"
                              ? "var(--primary)"
                              : "transparent",
                          color:
                            formData.weightUnit === "lb"
                              ? "var(--black)"
                              : "var(--gray-2)",
                        }}
                      >
                        LB
                      </button>
                    </div>
                  </div>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="500"
                    value={formData.weight || ""}
                    onChange={handleWeightChange}
                    className="text-sm p-2 h-10 border-2 rounded-xl transition-all duration-300 focus:shadow-lg focus:border-opacity-50 w-full"
                    style={{
                      backgroundColor: "var(--black-6)",
                      borderColor: "var(--black-7)",
                      color: "var(--white-2)",
                    }}
                  />
                </motion.div>

                {/* Volume Input */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6,
                  }}
                  className="space-y-3"
                >
                  <Label
                    htmlFor="volume"
                    className="flex items-center text-sm font-medium mt-2"
                    style={{ color: "var(--white)" }}
                  >
                    <Box
                      className="w-4 h-4 mr-2"
                      style={{ color: "var(--primary)" }}
                    />
                    Volume (m³)
                  </Label>
                  <Input
                    id="volume"
                    type="number"
                    placeholder="3.2"
                    value={formData.volume || ""}
                    onChange={handleVolumeChange}
                    className="text-sm p-2 h-10 border-2 rounded-xl transition-all duration-300 focus:shadow-lg focus:border-opacity-50 w-full"
                    style={{
                      backgroundColor: "var(--black-6)",
                      borderColor: "var(--black-7)",
                      color: "var(--white-2)",
                    }}
                  />
                </motion.div>
              </div>

              {/* Validation Message */}
              {!isAirFreightDataValid() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl border"
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    borderColor: "rgba(239, 68, 68, 0.3)",
                  }}
                >
                  <p className="text-sm" style={{ color: "#ef4444" }}>
                    Please fill at least one section above to continue.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Conditionally rendered sections - Only show when container is selected OR it's air freight */}
        <AnimatePresence mode="wait">
          {(isContainerSelected || isAirFreight) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Shipping Description Section */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: isAirFreight ? 0.2 : 0.2,
                }}
                className="rounded-2xl shadow-lg border p-4 sm:p-6 lg:p-8 mt-6"
                style={{
                  backgroundColor: "var(--black-5)",
                  borderColor: "var(--black-6)",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: isAirFreight ? 0.4 : 0.4,
                  }}
                >
                  <Label
                    htmlFor="shipping-description"
                    className="text-sm sm:text-base lg:text-lg font-semibold mb-3 block"
                    style={{ color: "var(--white)" }}
                  >
                    What are you shipping?
                    <span
                      className="text-sm font-normal ml-2"
                      style={{ color: "var(--gray-2)" }}
                    >
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id="shipping-description"
                    type="text"
                    placeholder="e.g., electronics, furniture, cars, textiles"
                    value={formData.shippingDescription || ""}
                    onChange={handleDescriptionChange}
                    className="text-sm sm:text-base lg:text-lg p-3 lg:p-4 h-12 sm:h-14 lg:h-16 border-2 rounded-xl transition-all duration-300 focus:shadow-lg focus:border-opacity-50"
                    style={{
                      backgroundColor: "var(--black-6)",
                      borderColor: "var(--black-7)",
                      color: "var(--white-2)",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Temperature Controlled Section */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: isAirFreight ? 0.4 : 0.4,
                }}
                className="rounded-2xl shadow-lg border p-4 sm:p-6 lg:p-8 mt-6"
                style={{
                  backgroundColor: "var(--black-5)",
                  borderColor: "var(--black-6)",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: isAirFreight ? 0.6 : 0.6,
                  }}
                >
                  <Label
                    className="text-sm sm:text-base lg:text-lg font-semibold block mb-4"
                    style={{ color: "var(--white)" }}
                  >
                    Temperature Controlled?
                    <span
                      className="text-sm font-normal ml-2"
                      style={{ color: "var(--gray-2)" }}
                    >
                      (Optional)
                    </span>
                  </Label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="temperature-controlled"
                      checked={formData.coldStoragePreference === "yes"}
                      onChange={(e) =>
                        handleColdStorageChange(e.target.checked ? "yes" : "")
                      }
                      className="h-5 w-5 rounded-md focus:ring-2 transition-all duration-200"
                      style={{
                        accentColor: "var(--primary)",
                        borderColor: "var(--black-7)",
                      }}
                    />
                    <label
                      htmlFor="temperature-controlled"
                      className="text-sm sm:text-base font-medium cursor-pointer transition-colors duration-200 hover:opacity-80"
                      style={{ color: "var(--white-2)" }}
                    >
                      Yes, my cargo requires temperature-controlled shipping
                    </label>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 px-4 sm:px-0">
        <Button
          variant="outline"
          onClick={onPrev}
          className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base border-2 hover:opacity-80 order-2 sm:order-1 rounded-xl"
          style={{
            backgroundColor: "var(--black-5)",
            borderColor: "var(--black-6)",
            color: "var(--white-2)",
          }}
        >
          Previous
        </Button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="order-1 sm:order-2"
        >
          <Button
            onClick={handleNext}
            disabled={isAirFreight && !isAirFreightDataValid()}
            className={`w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base shadow-lg rounded-xl transition-all duration-300 ${
              isAirFreight && !isAirFreightDataValid()
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
            style={{
              backgroundColor:
                isAirFreight && !isAirFreightDataValid()
                  ? "var(--black-6)"
                  : "var(--primary2)",
              color:
                isAirFreight && !isAirFreightDataValid()
                  ? "var(--gray-2)"
                  : "var(--black)",
            }}
          >
            {getNextButtonText()}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default StepFive;
