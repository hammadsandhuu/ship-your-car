"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Globe, HeartHandshake, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFourEnhanced from "./steps/StepFour";
import StepFive from "./steps/StepFive";
import StepSix from "./steps/StepSix";
import StepSevenEnhanced from "./steps/StepSeven";
import ProgressBarModern from "./progress-bar";

export interface FormData {
  shippingType: string;
  freightType: string;
  serviceType: string;
  handlingType: string;
  packagingHelp: string;
  locationInput: string;
  deliveryAddress: string;
  portOfLoading?: string;
  portOfDischarge?: string;
  supplierAddress?: string;
  factoryAddress?: string;
  warehouseAddress?: string;
  finalDeliveryAddress?: string;
  containerType: string;
  shippingDescription?: string;
  coldStoragePreference?: string;
  readyTime: string;
  selectedDate: Date | null;
  selectedTime: string;
  userName: string;
  userEmail: string;
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
    userEmail: "",
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "🎉 Consultation Scheduled Successfully!",
        description:
          "We'll send you a calendar invite and call you at the scheduled time.",
      });
      // Optionally redirect or reset form
    } catch (error) {
      toast({
        title: "❌ Scheduling Failed",
        description: "Please try again or contact our support team.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  // Add this new helper function to generate the appropriate step 4 title
  const getStepFourTitle = () => {
    if (
      formData.shippingType === "transport-only" ||
      formData.shippingType === "customs-inland"
    ) {
      return "Pickup & Delivery Details";
    }

    const isAirFreight = formData.freightType === "air-freight";
    const isFOB = formData.serviceType === "FOB (Freight on Board)";
    const isExWorks = formData.serviceType === "Ex-Works";
    const isDoorToDoor = formData.serviceType === "Door-to-Door";

    if (isAirFreight) {
      if (isDoorToDoor) return "Door-to-Door Air Freight Addresses";
      if (isExWorks) return "Air Freight Origin & Destination";
    } else {
      if (isFOB) return "Port of Loading & Discharge";
      if (isDoorToDoor) return "Door-to-Door Sea Freight Addresses";
      if (isExWorks) return "Sea Freight Origin & Destination";
    }

    return "Shipping Locations";
  };

  // Add this new helper function to generate the appropriate step 4 description
  const getStepFourDescription = () => {
    if (
      formData.shippingType === "transport-only" ||
      formData.shippingType === "customs-inland"
    ) {
      return "Provide pickup and delivery address details";
    }

    const isAirFreight = formData.freightType === "air-freight";
    const isFOB = formData.serviceType === "FOB (Freight on Board)";
    const isExWorks = formData.serviceType === "Ex-Works";
    const isDoorToDoor = formData.serviceType === "Door-to-Door";

    if (isAirFreight) {
      if (isDoorToDoor)
        return "Complete pickup and delivery addresses for full-service air freight logistics";
      if (isExWorks)
        return "Factory pickup to destination airport - we handle everything from origin to air terminal";
    } else {
      if (isFOB)
        return "Port-to-port shipping - specify loading and discharge ports";
      if (isDoorToDoor)
        return "Complete pickup and delivery addresses for full-service sea freight logistics";
      if (isExWorks)
        return "Factory pickup to destination port - we handle everything from origin to sea terminal";
    }

    return "Enter your shipping location details";
  };
  const getTotalSteps = () => 7;

  const getStepTitles = () => [
    "Service Type",
    "Freight/Handling",
    "Service Options",
    "Locations",
    "Container Details",
    "Timeline",
    "Schedule Meeting",
  ];

  // const getStepTitle = () => {
  //   const titles = {
  //     "transport-only": [
  //       "What Do You Need Help With Today?",
  //       "Cargo Handling Requirements",
  //       "Packaging Assistance",
  //       "Pickup & Delivery Details",
  //       "Container & Cargo Type",
  //       "Shipment Timeline",
  //       "Book Your Free Transport Call — 15 Minutes",
  //     ],
  //     "customs-inland": [
  //       "What Do You Need Help With Today?",
  //       "Cargo Handling Requirements",
  //       "Packaging Assistance",
  //       "Pickup Location Details",
  //       "Container & Cargo Type",
  //       "Shipment Timeline",
  //       "Book Your Free Customs Call — 15 Minutes",
  //     ],
  //     default: [
  //       "What Do You Need Help With Today?",
  //       "Choose Your Shipping Method",
  //       "Choose Your Service Type",
  //       formData.serviceType === "FOB (Freight on Board)"
  //         ? "Port of Loading & Discharge"
  //         : "Pickup & Delivery Address",
  //       "Container & Cargo Type",
  //       "Shipment Timeline",
  //       "Book Your Free Freight Call — 15 Minutes",
  //     ],
  //   };

  //   const titleArray =
  //     titles[formData.shippingType as keyof typeof titles] || titles.default;
  //   return titleArray[currentStep - 1] || "Freight Logistics Form";
  // };

  // const getStepDescription = () => {
  //   const descriptions = {
  //     "transport-only": [
  //       "Shipping via Sea, Air, or Land. Real Freight Advisors. No Bots. No Call Centers. 40+ Years of Experience.",
  //       "Specify any special handling requirements for your cargo",
  //       "Let us know if you need assistance with packaging",
  //       "Provide pickup and delivery address details",
  //       "Pick what you believe fits best — your supplier or shipper usually decides the container size. We'll confirm it for you.",
  //       "When will your shipment be ready?",
  //       "Schedule a consultation to finalize your transportation arrangements",
  //     ],
  //     "customs-inland": [
  //       "Shipping via Sea, Air, or Land. Real Freight Advisors. No Bots. No Call Centers. 40+ Years of Experience.",
  //       "Specify any special handling requirements for your cargo",
  //       "Let us know if you need assistance with packaging",
  //       "Provide pickup location and delivery address details",
  //       "Pick what you believe fits best — your supplier or shipper usually decides the container size. We'll confirm it for you.",
  //       "When will your shipment be ready?",
  //       "One-on-one customs and inland transport expertise. Fast.",
  //     ],
  //     default: [
  //       "Shipping via Sea, Air, or Land. Real Freight Advisors. No Bots. No Call Centers. 40+ Years of Experience.",
  //       "Choose between Air or Sea Freight. Not sure? Your assigned advisor will help you decide.",
  //       "FOB, ExWorks, or Door-to-Door — we'll explain each and help you pick what fits your shipment.",
  //       formData.serviceType === "FOB (Freight on Board)"
  //         ? "Where it loads. Where it offloads. No friction, just flow."
  //         : "Enter where the goods will be picked up—and the exact address they should be delivered to.",
  //       "Pick what you believe fits best — your supplier or shipper usually decides the container size. We'll confirm it for you.",
  //       "When will your shipment be ready?",
  //       "One-on-one freight expertise. Fast.",
  //     ],
  //   };

  //   const descArray =
  //     descriptions[formData.shippingType as keyof typeof descriptions] ||
  //     descriptions.default;
  //   return (
  //     descArray[currentStep - 1] ||
  //     "Complete your freight logistics requirements"
  //   );
  // };
  // In your FreightForm component, update the getStepTitle and getStepDescription functions:

  const getStepTitle = () => {
    const titles = {
      "transport-only": [
        "What Do You Need Help With Today?",
        "Cargo Handling Requirements",
        "Packaging Assistance",
        "Pickup & Delivery Details",
        "Container & Cargo Type",
        "Shipment Timeline",
        getStepSevenTitle(), // Use the new function for step 7
      ],
      "customs-inland": [
        "What Do You Need Help With Today?",
        "Cargo Handling Requirements",
        "Packaging Assistance",
        "Pickup Location Details",
        "Container & Cargo Type",
        "Shipment Timeline",
        getStepSevenTitle(), // Use the new function for step 7
      ],
      default: [
        "What Do You Need Help With Today?",
        "Choose Your Shipping Method",
        "Choose Your Service Type",
        formData.serviceType === "FOB (Freight on Board)"
          ? "Port of Loading & Discharge"
          : "Pickup & Delivery Address",
        "Container & Cargo Type",
        "Shipment Timeline",
        getStepSevenTitle(), // Use the new function for step 7
      ],
    };

    const titleArray =
      titles[formData.shippingType as keyof typeof titles] || titles.default;
    return titleArray[currentStep - 1] || "Freight Logistics Form";
  };

  // Add this new helper function to generate the appropriate step 7 title
  const getStepSevenTitle = () => {
    const isAirFreight = formData.freightType === "air-freight";
    const isSeaFreight = formData.freightType === "sea-freight";
    const isTransportOnly = formData.shippingType === "transport-only";
    const isCustomsInland = formData.shippingType === "customs-inland";

    if (isTransportOnly) {
      return "Schedule Your Transport Consultation";
    }
    if (isCustomsInland) {
      return "Schedule Your Customs & Inland Consultation";
    }
    if (isAirFreight) {
      return "Schedule Your Air Freight Consultation";
    }
    if (isSeaFreight) {
      return "Schedule Your Sea Freight Consultation";
    }
    return "Schedule Your Freight Consultation";
  };

  const getStepDescription = () => {
    const descriptions = {
      "transport-only": [
        "Shipping via Sea, Air, or Land. Real Freight Advisors. No Bots. No Call Centers. 40+ Years of Experience.",
        "Specify any special handling requirements for your cargo",
        "Let us know if you need assistance with packaging",
        "Provide pickup and delivery address details",
        "Pick what you believe fits best — your supplier or shipper usually decides the container size. We'll confirm it for you.",
        "When will your shipment be ready?",
        getStepSevenDescription(), // Use the new function for step 7
      ],
      "customs-inland": [
        "Shipping via Sea, Air, or Land. Real Freight Advisors. No Bots. No Call Centers. 40+ Years of Experience.",
        "Specify any special handling requirements for your cargo",
        "Let us know if you need assistance with packaging",
        "Provide pickup location and delivery address details",
        "Pick what you believe fits best — your supplier or shipper usually decides the container size. We'll confirm it for you.",
        "When will your shipment be ready?",
        getStepSevenDescription(), // Use the new function for step 7
      ],
      default: [
        "Shipping via Sea, Air, or Land. Real Freight Advisors. No Bots. No Call Centers. 40+ Years of Experience.",
        "Choose between Air or Sea Freight. Not sure? Your assigned advisor will help you decide.",
        "FOB, ExWorks, or Door-to-Door — we'll explain each and help you pick what fits your shipment.",
        formData.serviceType === "FOB (Freight on Board)"
          ? "Where it loads. Where it offloads. No friction, just flow."
          : "Enter where the goods will be picked up—and the exact address they should be delivered to.",
        "Pick what you believe fits best — your supplier or shipper usually decides the container size. We'll confirm it for you.",
        "When will your shipment be ready?",
        getStepSevenDescription(), // Use the new function for step 7
      ],
    };

    const descArray =
      descriptions[formData.shippingType as keyof typeof descriptions] ||
      descriptions.default;
    return (
      descArray[currentStep - 1] ||
      "Complete your freight logistics requirements"
    );
  };

  // Add this new helper function to generate the appropriate step 7 description
  const getStepSevenDescription = () => {
    const isAirFreight = formData.freightType === "air-freight";
    const isSeaFreight = formData.freightType === "sea-freight";
    const isTransportOnly = formData.shippingType === "transport-only";
    const isCustomsInland = formData.shippingType === "customs-inland";

    if (isTransportOnly) {
      return "Let's discuss your transportation requirements";
    }
    if (isCustomsInland) {
      return "Expert guidance for customs clearance and inland transport";
    }
    if (isAirFreight) {
      return "Fast, reliable air freight solutions";
    }
    if (isSeaFreight) {
      return "Cost-effective ocean shipping solutions";
    }
    return "Expert freight solutions tailored for you";
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
        return <StepFourEnhanced {...stepProps} />;
      case 5:
        return <StepFive {...stepProps} />;
      case 6:
        return <StepSix {...stepProps} />;
      case 7:
        return <StepSevenEnhanced {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-[30%] right-[10%] w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-[20%] left-[15%] w-36 h-36 sm:w-56 sm:h-56 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-[60%] right-[20%] w-28 h-28 sm:w-40 sm:h-40 bg-gradient-to-r from-cyan-300 to-teal-300 rounded-full opacity-20 blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10">
        {/* Modern Progress Bar */}
        {currentStep > 1 && (
          <ProgressBarModern
            currentStep={currentStep}
            totalSteps={getTotalSteps()}
            stepTitles={getStepTitles()}
          />
        )}

        <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Header Section */}
            {currentStep === 1 && (
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                <motion.div
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mb-8 sm:mb-12"
                >
                  <div className="flex justify-center items-center space-x-4 mb-6 sm:mb-8">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className="relative p-4 sm:p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl sm:rounded-3xl shadow-2xl"
                    >
                      <Truck className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl sm:rounded-3xl opacity-50 animate-pulse"></div>
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                    >
                      FreightForward
                    </motion.h1>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="relative"
                  >
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-700 max-w-5xl mx-auto leading-relaxed font-light px-4">
                      Global Freight. Personal Support. No Guesswork.
                    </p>
                  </motion.div>
                </motion.div>

                {/* Enhanced Feature Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 md:space-x-12 space-y-4 sm:space-y-0 mb-8 sm:mb-12"
                >
                  {[
                    {
                      icon: ShieldCheck,
                      text: "Secure & Reliable",
                      color: "text-green-500",
                    },
                    {
                      icon: Globe,
                      text: "Global Coverage",
                      color: "text-blue-500",
                    },
                    {
                      icon: HeartHandshake,
                      text: "Human Support",
                      color: "text-purple-500",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + index * 0.2, duration: 0.6 }}
                      className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
                    >
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      <span className="text-sm sm:text-base font-medium text-gray-700">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Enhanced Step Title and Description */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {getStepTitle()}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                {getStepDescription()}
              </p>
            </motion.div>

            {/* Enhanced Form Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="bg-white/95 backdrop-blur-lg rounded-3xl sm:rounded-4xl shadow-2xl border border-white/60 p-6 sm:p-8 md:p-12 lg:p-16 mx-2 sm:mx-4 md:mx-auto relative overflow-hidden"
              >
                {/* Form Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl"></div>
                </div>

                <div className="relative z-10">{renderCurrentStep()}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreightForm;
