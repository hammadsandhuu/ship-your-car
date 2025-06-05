"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Package, Globe, Shield } from "lucide-react";
import { submitFreightForm } from "@/services/freightService";
import { useToast } from "@/hooks/use-toast";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";
import StepSix from "./steps/StepSix";
import StepSeven from "./steps/StepSeven";

export interface FormData {
  shippingType: string;
  freightType: string;
  serviceType: string;
  handlingType: string;
  packagingHelp: string;
  locationInput: string;
  deliveryAddress: string;
  containerType: string;
  readyTime: string;
  selectedDate: Date | null;
  selectedTime: string;
  userName: string;
  userEmail:string
}

const FreightForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    shippingType: "",
    freightType: "",
    serviceType: "",
    handlingType: "",
    packagingHelp: "",
    locationInput: "",
    deliveryAddress: "",
    containerType: "",
    readyTime: "",
    selectedDate: null,
    selectedTime: "",
    userName: "",
    userEmail:""
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitFreightForm(formData);
      toast({
        title: "Form Submitted Successfully!",
        description:
          "We'll contact you within 24 hours to discuss your freight requirements.",
      });
      // Optionally redirect or reset form
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact our support team.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTotalSteps = () => {
    if (formData.shippingType === "transport-only") {
      return 7; // Transport-only flow now has 7 steps
    }
    if (formData.shippingType === "customs-inland") {
      return 7; // Customs-inland flow has 7 steps
    }
    return 7; // air-sea flow also has 7 steps
  };

  const getStepTitle = () => {
    if (formData.shippingType === "transport-only") {
      switch (currentStep) {
        case 1:
          return "Choose Your Shipping Solution";
        case 2:
          return "Cargo Handling Requirements";
        case 3:
          return "Packaging Assistance";
        case 4:
          return "Pickup & Delivery Details";
        case 5:
          return "Container & Cargo Type";
        case 6:
          return "Shipment Timeline";
        case 7:
          return "Book Your Free Freight Call — 15 Minute";
        default:
          return "Freight Logistics Form";
      }
    } else if (formData.shippingType === "customs-inland") {
      switch (currentStep) {
        case 1:
          return "Choose Your Shipping Solution";
        case 2:
          return "Cargo Handling Requirements";
        case 3:
          return "Packaging Assistance";
        case 4:
          return "Pickup Location Details";
        case 5:
          return "Container & Cargo Type";
        case 6:
          return "Shipment Timeline";
        case 7:
          return "Book Your Free Freight Call — 15 Minute";
        default:
          return "Freight Logistics Form";
      }
    } else {
      switch (currentStep) {
        case 1:
          return "Choose Your Shipping Solution";
        case 2:
          return "Choose Your Shipping Method";
        case 3:
          return "Choose Your Service Type";
        case 4:
          return getStep4Title();
        case 5:
          return "Container & Cargo Type";
        case 6:
          return "Shipment Timeline";
        case 7:
          return "Book Your Free Freight Call — 15 Minute";
        default:
          return "Freight Logistics Form";
      }
    }
  };

  const getStepDescription = () => {
    if (formData.shippingType === "transport-only") {
      switch (currentStep) {
        case 1:
          return "Select the shipping solution that best fits your logistics needs";
        case 2:
          return "Specify any special handling requirements for your cargo";
        case 3:
          return "Let us know if you need assistance with packaging";
        case 4:
          return "Provide pickup and delivery address details";
        case 5:
          return "Pick what you believe fits best — your supplier or shipper usually decides the container size. We’ll confirm it for you.";
        case 6:
          return "When will your shipment be ready?";
        case 7:
          return "Schedule a consultation to finalize your transportation arrangements";
        default:
          return "Complete your freight logistics requirements";
      }
    } else if (formData.shippingType === "customs-inland") {
      switch (currentStep) {
        case 1:
          return "Select the shipping solution that best fits your logistics needs";
        case 2:
          return "Specify any special handling requirements for your cargo";
        case 3:
          return "Let us know if you need assistance with packaging";
        case 4:
          return "Provide pickup location and delivery address details";
        case 5:
          return "Pick what you believe fits best — your supplier or shipper usually decides the container size. We’ll confirm it for you.";
        case 6:
          return "When will your shipment be ready?";
        case 7:
          return "One-on-one. Expert advice. Fast.";
        default:
          return "Complete your freight logistics requirements";
      }
    } else {
      switch (currentStep) {
        case 1:
          return "Select the shipping solution that best fits your logistics needs";
        case 2:
          return "Choose between Air or Sea Freight. Not sure? Your assigned advisor will help you decide.";
        case 3:
          return "FOB, ExWorks, or Door-to-Door — we’ll explain each and help you pick what fits your shipment.";
        case 4:
          return formData.serviceType === "FOB (Freight on Board)"
            ? "Enter the port where your goods will be loaded onto the vessel."
            : "Provide the location for shipment pickup";
        case 5:
          return "Pick what you believe fits best — your supplier or shipper usually decides the container size. We’ll confirm it for you.";
        case 6:
          return "When will your shipment be ready?";
        case 7:
          return "One-on-one. Expert advice. Fast.";
        default:
          return "Complete your freight logistics requirements";
      }
    }
  };

  const getStep4Title = () => {
    if (formData.serviceType === "FOB (Freight on Board)")
      return "Port of Loading";
    return "Pickup Location Details";
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      onNext: nextStep,
      onPrev: prevStep,
      onSubmit: handleFormSubmit,
      isSubmitting,
    };

    switch (currentStep) {
      case 1:
        return (
          <StepOne
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return <StepTwo {...stepProps} />;
      case 3:
        return <StepThree {...stepProps} />;
      case 4:
        return <StepFour {...stepProps} />;
      case 5:
        return <StepFive {...stepProps} />;
      case 6:
        return <StepSix {...stepProps} />;
      case 7:
        return <StepSeven {...stepProps} />;
      default:
        return null;
    }
  };

  const totalSteps = getTotalSteps();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorative Elements - Responsive positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-24 h-24 sm:w-32 sm:h-32 bg-blue-200 rounded-full opacity-20 blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-[20%] right-[10%] w-32 h-32 sm:w-48 sm:h-48 bg-purple-200 rounded-full opacity-20 blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[10%] w-28 h-28 sm:w-40 sm:h-40 bg-indigo-200 rounded-full opacity-20 blur-2xl sm:blur-3xl"></div>
      </div>

      <div className="relative z-10 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section - Only show on step 1 */}
          {currentStep === 1 && (
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 sm:mb-6 md:mb-8"
              >
                <div className="flex justify-center items-center space-x-2 sm:space-x-3 mb-3 sm:mb-6">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg">
                    <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    FreightForward
                  </h1>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light px-4">
                  Your trusted partner for global logistics solutions.
                  Streamline your shipping operations with our comprehensive
                  freight management platform.
                </p>
              </motion.div>

              {/* Feature Icons - Responsive layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 md:space-x-8 space-y-3 sm:space-y-0 mb-6 sm:mb-8"
              >
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-xs sm:text-sm font-medium">
                    Secure & Reliable
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <span className="text-xs sm:text-sm font-medium">
                    Global Network
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  <span className="text-xs sm:text-sm font-medium">
                    End-to-End Service
                  </span>
                </div>
              </motion.div>
            </div>
          )}
          {/* Step Title and Description - Responsive typography */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {getStepTitle()}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              {getStepDescription()}
            </p>
          </div>

          {/* Form Content - Responsive padding and border radius */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-white/50 p-4 sm:p-6 md:p-8 lg:p-12 mx-2 sm:mx-4 md:mx-auto"
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FreightForm;