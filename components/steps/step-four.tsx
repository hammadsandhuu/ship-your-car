"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ship, Search, MapPin, Plane, Building, Home } from "lucide-react";

interface FormData {
  shippingType: string;
  freightType: string;
  serviceType: string;
  locationInput: string;
  deliveryAddress: string;
  portOfLoading?: string;
  portOfDischarge?: string;
  supplierAddress?: string;
  factoryAddress?: string;
  warehouseAddress?: string;
  finalDeliveryAddress?: string;
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
  const isAirFreight = formData.freightType === "air-freight";
  const isFOB = formData.serviceType === "FOB (Freight on Board)";
  const isExWorks = formData.serviceType === "Ex-Works";
  const isDoorToDoor = formData.serviceType === "Door-to-Door";

  // Handle transport-only flow
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
      <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 lg:px-0 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-6 border shadow-lg"
            style={{
              backgroundColor: "var(--black-5)",
              borderColor: "var(--primary)",
            }}
          >
            <div className="flex items-center mb-4">
              <MapPin
                className="w-6 h-6 mr-3"
                style={{ color: "var(--primary)" }}
              />
              <Label
                className="text-lg font-semibold"
                style={{ color: "var(--white)" }}
              >
                Pickup Location *
              </Label>
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter complete pickup address"
                value={formData.locationInput}
                onChange={handlePickupChange}
                className="h-14 text-sm border-2 rounded-xl"
                style={{
                  backgroundColor: "var(--black-6)",
                  borderColor: "var(--black-7)",
                  color: "var(--white-2)",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl p-6 border shadow-lg"
            style={{
              backgroundColor: "var(--black-5)",
              borderColor: "var(--primary)",
            }}
          >
            <div className="flex items-center mb-4">
              <Home
                className="w-6 h-6 mr-3"
                style={{ color: "var(--primary)" }}
              />
              <Label
                className="text-lg font-semibold"
                style={{ color: "var(--white)" }}
              >
                Delivery Address *
              </Label>
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter complete delivery address"
                value={formData.deliveryAddress}
                onChange={handleDeliveryChange}
                className="h-14 text-sm border-2 rounded-xl"
                style={{
                  backgroundColor: "var(--black-6)",
                  borderColor: "var(--black-7)",
                  color: "var(--white-2)",
                }}
              />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Button
            variant="outline"
            onClick={onPrev}
            className="px-8 py-3 text-base border-2 rounded-xl hover:opacity-80"
            style={{
              backgroundColor: "var(--black-5)",
              borderColor: "var(--black-6)",
              color: "var(--white-2)",
            }}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              !formData.locationInput.trim() || !formData.deliveryAddress.trim()
            }
            className="px-8 py-3 text-base disabled:opacity-50 shadow-lg rounded-xl"
            style={{
              backgroundColor: "var(--primary2)",
              color: "var(--black)",
            }}
          >
            Continue to Container Details
          </Button>
        </div>
      </div>
    );
  }

  // Handle customs-inland flow
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

    return (
      <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-6 border shadow-lg"
            style={{
              backgroundColor: "var(--black-5)",
              borderColor: "var(--primary)",
            }}
          >
            <div className="flex items-center mb-4">
              <MapPin
                className="w-6 h-6 mr-3"
                style={{ color: "var(--primary)" }}
              />
              <Label
                className="text-lg font-semibold"
                style={{ color: "var(--white)" }}
              >
                Pickup Location *
              </Label>
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter complete pickup address"
                value={formData.locationInput}
                onChange={handlePickupChange}
                className="h-14 text-sm border-2 rounded-xl"
                style={{
                  backgroundColor: "var(--black-6)",
                  borderColor: "var(--black-7)",
                  color: "var(--white-2)",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl p-6 border shadow-lg"
            style={{
              backgroundColor: "var(--black-5)",
              borderColor: "var(--primary)",
            }}
          >
            <div className="flex items-center mb-4">
              <Home
                className="w-6 h-6 mr-3"
                style={{ color: "var(--primary)" }}
              />
              <Label
                className="text-lg font-semibold"
                style={{ color: "var(--white)" }}
              >
                Delivery Address *
              </Label>
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter complete delivery address"
                value={formData.deliveryAddress}
                onChange={handleDeliveryChange}
                className="h-14 text-sm border-2 rounded-xl"
                style={{
                  backgroundColor: "var(--black-6)",
                  borderColor: "var(--black-7)",
                  color: "var(--white-2)",
                }}
              />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <Button
            variant="outline"
            onClick={onPrev}
            className="px-8 py-3 text-base border-2 rounded-xl hover:opacity-80"
            style={{
              backgroundColor: "var(--black-5)",
              borderColor: "var(--black-6)",
              color: "var(--white-2)",
            }}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              !formData.locationInput.trim() || !formData.deliveryAddress.trim()
            }
            className="px-8 py-3 text-base disabled:opacity-50 shadow-lg rounded-xl"
            style={{
              backgroundColor: "var(--primary2)",
              color: "var(--black)",
            }}
          >
            Continue to Container Details
          </Button>
        </div>
      </div>
    );
  }

  // Air-Sea flow with different fields for different service types
  const renderAirFreightFields = () => {
    if (isDoorToDoor) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 border shadow-lg"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: "var(--primary)",
              }}
            >
              <div className="flex items-center mb-4">
                <Building
                  className="w-6 h-6 mr-3"
                  style={{ color: "var(--primary)" }}
                />
                <Label
                  className="text-lg font-semibold"
                  style={{ color: "var(--white)" }}
                >
                  Pickup Address *
                </Label>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Factory, warehouse, or supplier address for air freight pickup"
                  value={formData.supplierAddress || ""}
                  onChange={(e) =>
                    updateFormData("supplierAddress", e.target.value)
                  }
                  className="h-14 text-sm border-2 rounded-xl"
                  style={{
                    backgroundColor: "var(--black-6)",
                    borderColor: "var(--black-7)",
                    color: "var(--white-2)",
                  }}
                />
              </div>
              <p className="text-sm mt-2" style={{ color: "var(--gray-2)" }}>
                Where we'll collect your goods for air freight
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl p-6 border shadow-lg"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: "var(--primary)",
              }}
            >
              <div className="flex items-center mb-4">
                <Home
                  className="w-6 h-6 mr-3"
                  style={{ color: "var(--primary)" }}
                />
                <Label
                  className="text-lg font-semibold"
                  style={{ color: "var(--white)" }}
                >
                  Delivery Address *
                </Label>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Complete delivery address for final air freight delivery"
                  value={formData.finalDeliveryAddress || ""}
                  onChange={(e) =>
                    updateFormData("finalDeliveryAddress", e.target.value)
                  }
                  className="h-14 text-sm border-2 rounded-xl"
                  style={{
                    backgroundColor: "var(--black-6)",
                    borderColor: "var(--black-7)",
                    color: "var(--white-2)",
                  }}
                />
              </div>
              <p className="text-sm mt-2" style={{ color: "var(--gray-2)" }}>
                Final destination for your air freight shipment
              </p>
            </motion.div>
          </div>
        </div>
      );
    }

    if (isExWorks) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 border shadow-lg"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: "var(--primary)",
              }}
            >
              <div className="flex items-center mb-4">
                <Building
                  className="w-6 h-6 mr-3"
                  style={{ color: "var(--primary)" }}
                />
                <Label
                  className="text-lg font-semibold"
                  style={{ color: "var(--white)" }}
                >
                  Pickup Address *
                </Label>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Complete factory or supplier address for pickup"
                  value={formData.factoryAddress || ""}
                  onChange={(e) =>
                    updateFormData("factoryAddress", e.target.value)
                  }
                  className="h-14 text-sm border-2 rounded-xl"
                  style={{
                    backgroundColor: "var(--black-6)",
                    borderColor: "var(--black-7)",
                    color: "var(--white-2)",
                  }}
                />
              </div>
              <p className="text-sm mt-2" style={{ color: "var(--gray-2)" }}>
                Where we'll collect your goods for air freight
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl p-6 border shadow-lg"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: "var(--primary)",
              }}
            >
              <div className="flex items-center mb-4">
                <Plane
                  className="w-6 h-6 mr-3"
                  style={{ color: "var(--primary)" }}
                />
                <Label
                  className="text-lg font-semibold"
                  style={{ color: "var(--white)" }}
                >
                  Destination Airport *
                </Label>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Airport code or name (e.g., JFK New York, LHR London)"
                  value={formData.portOfDischarge || ""}
                  onChange={(e) =>
                    updateFormData("portOfDischarge", e.target.value)
                  }
                  className="h-14 text-sm border-2 rounded-xl"
                  style={{
                    backgroundColor: "var(--black-6)",
                    borderColor: "var(--black-7)",
                    color: "var(--white-2)",
                  }}
                />
              </div>
              <p className="text-sm mt-2" style={{ color: "var(--gray-2)" }}>
                Airport where you'll collect your air freight
              </p>
            </motion.div>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderSeaFreightFields = () => {
    if (isFOB) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pt-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 border shadow-lg"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: "var(--primary)",
              }}
            >
              <div className="flex items-center mb-4">
                <Ship
                  className="w-6 h-6 mr-3"
                  style={{ color: "var(--primary)" }}
                />
                <Label
                  className="text-lg font-semibold"
                  style={{ color: "var(--white)" }}
                >
                  Port of Loading *
                </Label>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Origin port (e.g., Port of Shanghai)"
                  value={formData.portOfLoading || ""}
                  onChange={(e) =>
                    updateFormData("portOfLoading", e.target.value)
                  }
                  className="h-14 text-sm border-2 rounded-xl"
                  style={{
                    backgroundColor: "var(--black-6)",
                    borderColor: "var(--black-7)",
                    color: "var(--white-2)",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl p-6 border shadow-lg"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: "var(--primary)",
              }}
            >
              <div className="flex items-center mb-4">
                <Ship
                  className="w-6 h-6 mr-3"
                  style={{ color: "var(--primary)" }}
                />
                <Label
                  className="text-lg font-semibold"
                  style={{ color: "var(--white)" }}
                >
                  Port of Discharge *
                </Label>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Destination port (e.g., Port of Los Angeles)"
                  value={formData.portOfDischarge || ""}
                  onChange={(e) =>
                    updateFormData("portOfDischarge", e.target.value)
                  }
                  className="h-14 text-sm border-2 rounded-xl"
                  style={{
                    backgroundColor: "var(--black-6)",
                    borderColor: "var(--black-7)",
                    color: "var(--white-2)",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    if (isDoorToDoor) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 border shadow-lg"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: "var(--primary)",
              }}
            >
              <div className="flex items-center mb-4">
                <Building
                  className="w-6 h-6 mr-3"
                  style={{ color: "var(--primary)" }}
                />
                <Label
                  className="text-lg font-semibold"
                  style={{ color: "var(--white)" }}
                >
                  Pickup Address *
                </Label>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Complete pickup address"
                  value={formData.supplierAddress || ""}
                  onChange={(e) =>
                    updateFormData("supplierAddress", e.target.value)
                  }
                  className="h-14 text-sm border-2 rounded-xl"
                  style={{
                    backgroundColor: "var(--black-6)",
                    borderColor: "var(--black-7)",
                    color: "var(--white-2)",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl p-6 border shadow-lg"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: "var(--primary)",
              }}
            >
              <div className="flex items-center mb-4">
                <Home
                  className="w-6 h-6 mr-3"
                  style={{ color: "var(--primary)" }}
                />
                <Label
                  className="text-lg font-semibold"
                  style={{ color: "var(--white)" }}
                >
                  Final Delivery Address *
                </Label>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Complete delivery address"
                  value={formData.finalDeliveryAddress || ""}
                  onChange={(e) =>
                    updateFormData("finalDeliveryAddress", e.target.value)
                  }
                  className="h-14 text-sm border-2 rounded-xl"
                  style={{
                    backgroundColor: "var(--black-6)",
                    borderColor: "var(--black-7)",
                    color: "var(--white-2)",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    if (isExWorks) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 border shadow-lg"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: "var(--primary)",
              }}
            >
              <div className="flex items-center mb-4">
                <Building
                  className="w-6 h-6 mr-3"
                  style={{ color: "var(--primary)" }}
                />
                <Label
                  className="text-lg font-semibold"
                  style={{ color: "var(--white)" }}
                >
                  Pickup Address *
                </Label>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Complete factory or supplier address"
                  value={formData.factoryAddress || ""}
                  onChange={(e) =>
                    updateFormData("factoryAddress", e.target.value)
                  }
                  className="h-14 text-sm border-2 rounded-xl"
                  style={{
                    backgroundColor: "var(--black-6)",
                    borderColor: "var(--black-7)",
                    color: "var(--white-2)",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl p-6 border shadow-lg"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: "var(--primary)",
              }}
            >
              <div className="flex items-center mb-4">
                <Ship
                  className="w-6 h-6 mr-3"
                  style={{ color: "var(--primary)" }}
                />
                <Label
                  className="text-lg font-semibold"
                  style={{ color: "var(--white)" }}
                >
                  Destination Port (POD) *
                </Label>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Destination port (e.g., Port of Hamburg)"
                  value={formData.portOfDischarge || ""}
                  onChange={(e) =>
                    updateFormData("portOfDischarge", e.target.value)
                  }
                  className="h-14 text-sm border-2 rounded-xl"
                  style={{
                    backgroundColor: "var(--black-6)",
                    borderColor: "var(--black-7)",
                    color: "var(--white-2)",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    return null;
  };

  const handleNext = () => {
    const requiredFields = getRequiredFields();
    const isValid = requiredFields.every((field) =>
      (formData[field as keyof FormData] as string)?.trim()
    );

    if (isValid) {
      onNext();
    }
  };

  const getRequiredFields = () => {
    if (isAirFreight) {
      if (isDoorToDoor) return ["supplierAddress", "finalDeliveryAddress"];
      if (isExWorks) return ["factoryAddress", "portOfDischarge"];
    } else {
      if (isFOB) return ["portOfLoading", "portOfDischarge"];
      if (isDoorToDoor) return ["supplierAddress", "finalDeliveryAddress"];
      if (isExWorks) return ["factoryAddress", "portOfDischarge"];
    }
    return [];
  };

  const isFormValid = () => {
    const requiredFields = getRequiredFields();
    return requiredFields.every((field) =>
      (formData[field as keyof FormData] as string)?.trim()
    );
  };

  return (
    <div className="space-y-8 px-2 sm:px-4 lg:px-0">
      {isAirFreight ? renderAirFreightFields() : renderSeaFreightFields()}

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button
          variant="outline"
          onClick={onPrev}
          className="px-8 py-3 text-base border-2 rounded-xl hover:opacity-80"
          style={{
            backgroundColor: "var(--black-5)",
            borderColor: "var(--black-6)",
            color: "var(--white-2)",
          }}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isFormValid()}
          className="px-8 py-3 text-base disabled:opacity-50 shadow-lg rounded-xl"
          style={{
            backgroundColor: "var(--primary2)",
            color: "var(--black)",
          }}
        >
          Continue to Container Details
        </Button>
      </div>
    </div>
  );
};

export default StepFour;
