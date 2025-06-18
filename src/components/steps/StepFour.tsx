"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Ship,
  Truck,
  Search,
  MapPin,
  Plane,
  Building,
  Home,
} from "lucide-react";

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
  // Add other form fields as needed
}

interface StepFourProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepFourEnhanced: React.FC<StepFourProps> = ({
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
      <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex p-4 rounded-2xl mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xl">
            <Truck className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Transport Locations
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Provide both pickup and delivery locations for your transportation
            service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-blue-600 mr-3" />
              <Label className="text-lg font-semibold text-gray-900">
                Pickup Location *
              </Label>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter complete pickup address"
                value={formData.locationInput}
                onChange={handlePickupChange}
                className="pl-12 h-14 text-base border-2 border-blue-200 focus:border-blue-500 rounded-xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <Home className="w-6 h-6 text-green-600 mr-3" />
              <Label className="text-lg font-semibold text-gray-900">
                Delivery Address *
              </Label>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter complete delivery address"
                value={formData.deliveryAddress}
                onChange={handleDeliveryChange}
                className="pl-12 h-14 text-base border-2 border-green-200 focus:border-green-500 rounded-xl"
              />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <Button
            variant="outline"
            onClick={onPrev}
            className="px-8 py-3 text-base border-2 hover:bg-gray-50 rounded-xl"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              !formData.locationInput.trim() || !formData.deliveryAddress.trim()
            }
            className="px-8 py-3 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 shadow-lg rounded-xl"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex p-4 rounded-2xl mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl">
            <Truck className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Customs & Transport Locations
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Provide pickup and delivery locations for customs clearance and
            inland transportation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-blue-600 mr-3" />
              <Label className="text-lg font-semibold text-gray-900">
                Pickup Location *
              </Label>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter complete pickup address"
                value={formData.locationInput}
                onChange={handlePickupChange}
                className="pl-12 h-14 text-base border-2 border-blue-200 focus:border-blue-500 rounded-xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <Home className="w-6 h-6 text-green-600 mr-3" />
              <Label className="text-lg font-semibold text-gray-900">
                Delivery Address *
              </Label>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter complete delivery address"
                value={formData.deliveryAddress}
                onChange={handleDeliveryChange}
                className="pl-12 h-14 text-base border-2 border-green-200 focus:border-green-500 rounded-xl"
              />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <Button
            variant="outline"
            onClick={onPrev}
            className="px-8 py-3 text-base border-2 hover:bg-gray-50 rounded-xl"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              !formData.locationInput.trim() || !formData.deliveryAddress.trim()
            }
            className="px-8 py-3 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 shadow-lg rounded-xl"
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
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex p-4 rounded-2xl mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xl">
              <Plane className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Door-to-Door Air Freight
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete air freight service from pickup to final delivery
              including airport handling and customs clearance.
            </p>
          </motion.div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Building className="w-6 h-6 text-blue-600 mr-3" />
                <Label className="text-lg font-semibold text-gray-900">
                  Air Freight Pickup Address *
                </Label>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Factory, warehouse, or supplier address for air freight pickup"
                  value={formData.supplierAddress || ""}
                  onChange={(e) =>
                    updateFormData("supplierAddress", e.target.value)
                  }
                  className="pl-12 h-14 text-base border-2 border-blue-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Where we'll collect your goods for air freight
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Home className="w-6 h-6 text-green-600 mr-3" />
                <Label className="text-lg font-semibold text-gray-900">
                  Final Air Delivery Address *
                </Label>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Complete address for final air freight delivery"
                  value={formData.finalDeliveryAddress || ""}
                  onChange={(e) =>
                    updateFormData("finalDeliveryAddress", e.target.value)
                  }
                  className="pl-12 h-14 text-base border-2 border-green-200 focus:border-green-500 rounded-xl"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
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
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex p-4 rounded-2xl mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl">
              <Plane className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ex-Works Air Freight
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We handle pickup and air freight to destination airport. You
              arrange collection from the airport.
            </p>
          </motion.div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Building className="w-6 h-6 text-blue-600 mr-3" />
                <Label className="text-lg font-semibold text-gray-900">
                  Air Freight Origin Address *
                </Label>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Factory or supplier address for air freight collection"
                  value={formData.factoryAddress || ""}
                  onChange={(e) =>
                    updateFormData("factoryAddress", e.target.value)
                  }
                  className="pl-12 h-14 text-base border-2 border-blue-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Where we'll collect your goods for air freight
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Plane className="w-6 h-6 text-purple-600 mr-3" />
                <Label className="text-lg font-semibold text-gray-900">
                  Destination Airport *
                </Label>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Airport code or name (e.g., JFK New York, LHR London)"
                  value={formData.portOfDischarge || ""}
                  onChange={(e) =>
                    updateFormData("portOfDischarge", e.target.value)
                  }
                  className="pl-12 h-14 text-base border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
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
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex p-4 rounded-2xl mb-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-xl">
              <Ship className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              FOB Sea Freight
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Port-to-port shipping - specify loading and discharge ports.
            </p>
          </motion.div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Ship className="w-6 h-6 text-blue-600 mr-3" />
                <Label className="text-lg font-semibold text-gray-900">
                  Port of Loading *
                </Label>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Origin port (e.g., Port of Shanghai)"
                  value={formData.portOfLoading || ""}
                  onChange={(e) =>
                    updateFormData("portOfLoading", e.target.value)
                  }
                  className="pl-12 h-14 text-base border-2 border-blue-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Ship className="w-6 h-6 text-green-600 mr-3" />
                <Label className="text-lg font-semibold text-gray-900">
                  Port of Discharge *
                </Label>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Destination port (e.g., Port of Los Angeles)"
                  value={formData.portOfDischarge || ""}
                  onChange={(e) =>
                    updateFormData("portOfDischarge", e.target.value)
                  }
                  className="pl-12 h-14 text-base border-2 border-green-200 focus:border-green-500 rounded-xl"
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
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex p-4 rounded-2xl mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xl">
              <Ship className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Door-to-Door Sea Freight
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete pickup and delivery addresses for full-service sea
              freight logistics.
            </p>
          </motion.div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Building className="w-6 h-6 text-blue-600 mr-3" />
                <Label className="text-lg font-semibold text-gray-900">
                  Pickup Address *
                </Label>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Complete pickup address"
                  value={formData.supplierAddress || ""}
                  onChange={(e) =>
                    updateFormData("supplierAddress", e.target.value)
                  }
                  className="pl-12 h-14 text-base border-2 border-blue-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Home className="w-6 h-6 text-green-600 mr-3" />
                <Label className="text-lg font-semibold text-gray-900">
                  Final Delivery Address *
                </Label>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Complete delivery address"
                  value={formData.finalDeliveryAddress || ""}
                  onChange={(e) =>
                    updateFormData("finalDeliveryAddress", e.target.value)
                  }
                  className="pl-12 h-14 text-base border-2 border-green-200 focus:border-green-500 rounded-xl"
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
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex p-4 rounded-2xl mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl">
              <Ship className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ex-Works Sea Freight
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Factory pickup to destination port - we handle everything from
              origin to sea terminal.
            </p>
          </motion.div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Building className="w-6 h-6 text-blue-600 mr-3" />
                <Label className="text-lg font-semibold text-gray-900">
                  Factory/Supplier Address *
                </Label>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Complete factory or supplier address"
                  value={formData.factoryAddress || ""}
                  onChange={(e) =>
                    updateFormData("factoryAddress", e.target.value)
                  }
                  className="pl-12 h-14 text-base border-2 border-blue-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Ship className="w-6 h-6 text-purple-600 mr-3" />
                <Label className="text-lg font-semibold text-gray-900">
                  Destination Port *
                </Label>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Destination port (e.g., Port of Hamburg)"
                  value={formData.portOfDischarge || ""}
                  onChange={(e) =>
                    updateFormData("portOfDischarge", e.target.value)
                  }
                  className="pl-12 h-14 text-base border-2 border-purple-200 focus:border-purple-500 rounded-xl"
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

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8">
        <Button
          variant="outline"
          onClick={onPrev}
          className="px-8 py-3 text-base border-2 hover:bg-gray-50 rounded-xl"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isFormValid()}
          className="px-8 py-3 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 shadow-lg rounded-xl"
        >
          Continue to Container Details
        </Button>
      </div>
    </div>
  );
};

export default StepFourEnhanced;
