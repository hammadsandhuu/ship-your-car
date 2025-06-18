"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import type { FormData } from "../FreightForm";
import { format, addDays, getDay } from "date-fns";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  Users,
  MessageSquare,
  User,
  Globe,
  ChevronDown,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface StepSevenProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onPrev: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

interface UserDetails {
  name: string;
  email: string;
}

const StepSeven: React.FC<StepSevenProps> = ({
  formData,
  updateFormData,
  onPrev,
  onSubmit = () => {},
  isSubmitting = false,
}) => {
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(true);

  // Get available dates (Sunday-Thursday, up to 30 days in advance)
  const getAvailableDates = () => {
    const today = new Date();
    const maxDate = addDays(today, 30);
    return { from: today, to: maxDate };
  };

  // Check if date is available (Sunday-Thursday only)
  const isDateAvailable = (date: Date) => {
    const day = getDay(date);
    // Sunday = 0, Monday = 1, ..., Thursday = 4, Friday = 5, Saturday = 6
    return day >= 0 && day <= 4; // Sunday to Thursday
  };

  // Time slots for different regions
  const getTimeSlots = () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return [
      // GCC/Europe slots (AM - early PM)
      {
        time: "09:00 AM",
        label: "GCC/Europe",
        available: true,
        region: "GCC/Europe",
        description: "Morning slot for Middle East & Europe",
      },
      {
        time: "10:30 AM",
        label: "GCC/Europe",
        available: true,
        region: "GCC/Europe",
        description: "Late morning slot for Middle East & Europe",
      },
      {
        time: "12:00 PM",
        label: "GCC/Europe",
        available: true,
        region: "GCC/Europe",
        description: "Noon slot for Middle East & Europe",
      },
      // USA/Canada slots (PM - early evening)
      {
        time: "02:00 PM",
        label: "USA/Canada",
        available: true,
        region: "USA/Canada",
        description: "Afternoon slot for Americas",
      },
      {
        time: "03:30 PM",
        label: "USA/Canada",
        available: true,
        region: "USA/Canada",
        description: "Late afternoon slot for Americas",
      },
      {
        time: "05:00 PM",
        label: "USA/Canada",
        available: true,
        region: "USA/Canada",
        description: "Evening slot for Americas",
      },
    ];
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      updateFormData("selectedDate", date);
      setShowTimeSlots(true);
      setShowUserDetails(false);
    }
  };

  const handleTimeSelect = (time: string) => {
    updateFormData("selectedTime", time);
    setShowUserDetails(true);
  };

  const handleUserDetailsChange = (field: keyof UserDetails, value: string) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinalSubmit = () => {
    if (
      formData.selectedDate &&
      formData.selectedTime &&
      userDetails.name &&
      userDetails.email
    ) {
      // Add user details to form data
      updateFormData("userName", userDetails.name);
      updateFormData("userEmail", userDetails.email);

      // Show confirmation dialog instead of direct submission
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmSubmission = () => {
    setShowConfirmDialog(false);
    if (onSubmit) {
      onSubmit();
    }
  };

  const isFormComplete =
    formData.selectedDate &&
    formData.selectedTime &&
    userDetails.name &&
    userDetails.email;
  const dateRange = getAvailableDates();
  const timeSlots = getTimeSlots();

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">
      {/* Meeting Benefits */}
      <Collapsible
        open={isConsultationOpen}
        onOpenChange={setIsConsultationOpen}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100 overflow-hidden"
        >
          <CollapsibleTrigger className="w-full p-4 sm:p-6 text-left hover:bg-purple-50/50 transition-colors">
            <h4 className="font-semibold text-gray-900 flex items-center justify-between">
              <span className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                What to Expect
              </span>
              <ChevronDown
                className={`w-5 h-5 text-purple-600 transition-transform duration-200 ${
                  isConsultationOpen ? "rotate-180" : ""
                }`}
              />
            </h4>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mb-1 sm:mb-2" />
                  <h5 className="font-medium text-gray-900 mb-1">
                    Detailed Discussion
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Review your specific requirements and optimize shipping
                    solutions
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mb-1 sm:mb-2" />
                  <h5 className="font-medium text-gray-900 mb-1">
                    Custom Quote
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Receive personalized pricing and service recommendations
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mb-1 sm:mb-2" />
                  <h5 className="font-medium text-gray-900 mb-1">
                    Timeline Planning
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Establish clear timelines and next steps for your shipment
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </motion.div>
      </Collapsible>

      {/* Calendar Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8"
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
          Select a Meeting Date
        </h3>
        <div className="flex justify-center overflow-x-auto flex-col items-center">
          <div className="w-full max-w-md mx-auto">
            <Calendar
              mode="single"
              selected={formData.selectedDate || undefined}
              onSelect={handleDateSelect}
              disabled={(date) =>
                date < dateRange.from ||
                date > dateRange.to ||
                !isDateAvailable(date)
              }
              className="rounded-md border-0 shadow-none w-full [&_.rdp]:w-full [&_.rdp-months]:justify-center [&_.rdp-month]:w-full [&_.rdp-table]:w-full [&_.rdp-cell]:p-1 [&_.rdp-cell]:sm:p-2 [&_.rdp-day]:h-8 [&_.rdp-day]:w-8 [&_.rdp-day]:sm:h-10 [&_.rdp-day]:sm:w-10 [&_.rdp-day]:text-xs [&_.rdp-day]:sm:text-base [&_.rdp-head_cell]:text-xs [&_.rdp-head_cell]:sm:text-sm [&_.rdp-head_cell]:p-1 [&_.rdp-head_cell]:sm:p-2"
            />
          </div>
          <div className="mt-3 sm:mt-4 text-center">
            <div className="text-xs sm:text-sm text-gray-500 mb-2">
              <strong>Available Days:</strong> Sunday–Thursday
            </div>
            <div className="text-xs sm:text-sm text-red-500">
              <strong>Unavailable:</strong> Friday & Saturday
            </div>
          </div>
        </div>
      </motion.div>

      {/* Time Selection */}
      {showTimeSlots && formData.selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8"
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="flex items-center">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
              Select a Time for
            </span>
            <span className="text-blue-600 font-bold">
              {format(formData.selectedDate, "MMMM dd, yyyy")}
            </span>
          </h3>

          {/* Regional Time Slots */}
          <div className="space-y-6">
            {/* GCC/Europe Slots */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Globe className="w-4 h-4 mr-2 text-green-600" />
                GCC/Europe Region (3 slots available)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {timeSlots
                  .filter((slot) => slot.region === "GCC/Europe")
                  .map((slot) => (
                    <Button
                      key={slot.time}
                      variant={
                        formData.selectedTime === slot.time
                          ? "default"
                          : "outline"
                      }
                      disabled={!slot.available}
                      className={`h-12 sm:h-14 md:h-16 flex flex-col items-center justify-center text-center min-w-0 px-1 sm:px-2 ${
                        formData.selectedTime === slot.time
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                          : "hover:bg-green-50 hover:border-green-200"
                      } ${
                        !slot.available ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() =>
                        slot.available && handleTimeSelect(slot.time)
                      }
                    >
                      <span className="text-sm sm:text-base font-medium leading-tight">
                        {slot.time}
                      </span>
                    </Button>
                  ))}
              </div>
            </div>

            {/* USA/Canada Slots */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Globe className="w-4 h-4 mr-2 text-blue-600" />
                USA/Canada Region (3 slots available)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {timeSlots
                  .filter((slot) => slot.region === "USA/Canada")
                  .map((slot) => (
                    <Button
                      key={slot.time}
                      variant={
                        formData.selectedTime === slot.time
                          ? "default"
                          : "outline"
                      }
                      disabled={!slot.available}
                      className={`h-12 sm:h-14 md:h-16 flex flex-col items-center justify-center text-center min-w-0 px-1 sm:px-2 ${
                        formData.selectedTime === slot.time
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                          : "hover:bg-blue-50 hover:border-blue-200"
                      } ${
                        !slot.available ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() =>
                        slot.available && handleTimeSelect(slot.time)
                      }
                    >
                      <span className="text-sm sm:text-base font-medium leading-tight">
                        {slot.time}
                      </span>
                    </Button>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 text-center">
            <div className="text-xs sm:text-sm text-gray-500 mb-1">
              All times shown in your local timezone · 15-minute call
            </div>
          </div>
        </motion.div>
      )}

      {/* User Details Form */}
      {showUserDetails && formData.selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8"
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
            Your Contact Information
          </h3>

          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={userDetails.name}
                onChange={(e) =>
                  handleUserDetailsChange("name", e.target.value)
                }
                className="h-12 text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={userDetails.email}
                onChange={(e) =>
                  handleUserDetailsChange("email", e.target.value)
                }
                className="h-12 text-base"
                required
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[95vh] overflow-y-auto mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Confirm Your Freight Request & Meeting
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Please review all details before confirming your consultation
              meeting.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Meeting Details */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <CalendarDays className="w-5 h-5 mr-2 text-green-600" />
                Scheduled Meeting
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white rounded-lg p-3">
                  <span className="font-medium text-gray-700">Date:</span>
                  <div className="text-gray-900 font-medium">
                    {formData.selectedDate &&
                      format(formData.selectedDate, "EEEE, MMMM dd, yyyy")}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <span className="font-medium text-gray-700">Time:</span>
                  <div className="text-gray-900 font-medium">
                    {formData.selectedTime} (30 minutes)
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <span className="font-medium text-gray-700">Platform:</span>
                  <div className="text-gray-900">Google Meet Video Call</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <span className="font-medium text-gray-700">
                    Meeting Link:
                  </span>
                  <div className="text-gray-900 text-sm">
                    Will be sent via email
                  </div>
                </div>
              </div>
            </div>

            {/* Freight Request Summary */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Freight Request Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                {formData.shippingType && (
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-gray-700">
                      Shipping Type:
                    </span>
                    <div className="text-gray-900">{formData.shippingType}</div>
                  </div>
                )}
                {formData.freightType && (
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-gray-700">
                      Freight Type:
                    </span>
                    <div className="text-gray-900">{formData.freightType}</div>
                  </div>
                )}
                {formData.serviceType && (
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-gray-700">
                      Service Type:
                    </span>
                    <div className="text-gray-900">{formData.serviceType}</div>
                  </div>
                )}
                {formData.handlingType && (
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-gray-700">
                      Handling Type:
                    </span>
                    <div className="text-gray-900">{formData.handlingType}</div>
                  </div>
                )}
                {formData.packagingHelp && (
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-gray-700">
                      Packaging Help:
                    </span>
                    <div className="text-gray-900">
                      {formData.packagingHelp}
                    </div>
                  </div>
                )}
                {formData.locationInput && (
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-gray-700">
                      Pickup Location:
                    </span>
                    <div className="text-gray-900">
                      {formData.locationInput}
                    </div>
                  </div>
                )}
                {formData.deliveryAddress && (
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-gray-700">
                      Delivery Address:
                    </span>
                    <div className="text-gray-900">
                      {formData.deliveryAddress}
                    </div>
                  </div>
                )}
                {formData.containerType && (
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-gray-700">
                      Container Type:
                    </span>
                    <div className="text-gray-900">
                      {formData.containerType}
                    </div>
                  </div>
                )}
                {formData.readyTime && (
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-gray-700">
                      Ready Time:
                    </span>
                    <div className="text-gray-900">{formData.readyTime}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="w-full sm:w-auto"
            >
              Review & Edit
            </Button>
            <Button
              onClick={handleConfirmSubmission}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm & Schedule Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-8">
        <Button
          variant="outline"
          onClick={onPrev}
          className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base border-2 hover:bg-gray-50 w-full sm:w-auto"
        >
          Previous
        </Button>
        <Button
          onClick={handleFinalSubmit}
          disabled={!isFormComplete || isSubmitting || false}
          className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Scheduling...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Schedule Meeting & Complete
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepSeven;



// "use client";

// import type React from "react";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
// import { format, addDays, getDay } from "date-fns";
// import {
//   Calendar as CalendarIcon,
//   Clock,
//   User,
//   Mail,
//   Phone,
//   Video,
//   MessageSquare,
//   CheckCircle,
//   Ship,
//   Plane,
//   Truck,
//   Package,
//   CalendarDays,
//   Users,
//   Globe,
//   ChevronDown,
// } from "lucide-react";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";

// interface FormData {
//   shippingType: string;
//   freightType: string;
//   serviceType: string;
//   selectedDate: Date | null;
//   selectedTime: string;
//   userName: string;
//   userEmail: string;
//   // Add other form fields as needed
// }

// interface StepSevenProps {
//   formData: FormData;
//   updateFormData: (field: keyof FormData, value: any) => void;
//   onPrev: () => void;
//   onSubmit: () => void;
//   isSubmitting: boolean;
// }

// const StepSevenEnhanced: React.FC<StepSevenProps> = ({
//   formData,
//   updateFormData,
//   onPrev,
//   onSubmit,
//   isSubmitting,
// }) => {
//   const [showTimeSlots, setShowTimeSlots] = useState(false);
//   const [showUserDetails, setShowUserDetails] = useState(false);
//   const [isConsultationOpen, setIsConsultationOpen] = useState(true);

//   // Get contextual content based on shipping type and freight type
//   const getContextualContent = () => {
//     const isAirFreight = formData.freightType === "air-freight";
//     const isSeaFreight = formData.freightType === "sea-freight";
//     const isTransportOnly = formData.shippingType === "transport-only";
//     const isCustomsInland = formData.shippingType === "customs-inland";

//     if (isTransportOnly) {
//       return {
//         icon: <Truck className="w-6 h-6 sm:w-8 sm:h-8" />,
//         title: "Schedule Your Transport Consultation",
//         subtitle: "Let's discuss your transportation requirements",
//         description:
//           "Our transport specialists will review your pickup and delivery requirements, discuss vehicle options, and provide you with a detailed quote for your transportation needs.",
//         benefits: [
//           "Review your transport route and requirements",
//           "Discuss vehicle types and capacity options",
//           "Get transparent pricing with no hidden fees",
//           "Plan optimal pickup and delivery schedules",
//         ],
//         gradient: "from-purple-500 to-indigo-600",
//       };
//     }

//     if (isCustomsInland) {
//       return {
//         icon: <Package className="w-6 h-6 sm:w-8 sm:h-8" />,
//         title: "Schedule Your Customs & Inland Consultation",
//         subtitle: "Expert guidance for customs clearance and inland transport",
//         description:
//           "Our customs and inland transport experts will walk you through the clearance process, discuss documentation requirements, and coordinate your inland transportation.",
//         benefits: [
//           "Customs clearance process walkthrough",
//           "Documentation and compliance guidance",
//           "Inland transport coordination and planning",
//           "End-to-end timeline and cost breakdown",
//         ],
//         gradient: "from-emerald-500 to-teal-600",
//       };
//     }

//     if (isAirFreight) {
//       return {
//         icon: <Plane className="w-6 h-6 sm:w-8 sm:h-8" />,
//         title: "Schedule Your Air Freight Consultation",
//         subtitle: "Fast, reliable air freight solutions",
//         description:
//           "Our air freight specialists will discuss your urgent shipping needs, review airline options, and provide you with competitive rates for fast, secure air transport.",
//         benefits: [
//           "Air freight routing and airline selection",
//           "Express and standard air freight options",
//           "Airport handling and customs coordination",
//           "Real-time tracking and delivery updates",
//         ],
//         gradient: "from-indigo-500 to-purple-600",
//       };
//     }

//     if (isSeaFreight) {
//       return {
//         icon: <Ship className="w-6 h-6 sm:w-8 sm:h-8" />,
//         title: "Schedule Your Sea Freight Consultation",
//         subtitle: "Cost-effective ocean shipping solutions",
//         description:
//           "Our sea freight experts will review your shipping requirements, discuss container options, and provide you with the most economical routes for your ocean freight.",
//         benefits: [
//           "Container selection and optimization",
//           "Ocean routing and carrier selection",
//           "Port operations and documentation",
//           "Cost-effective shipping solutions",
//         ],
//         gradient: "from-blue-500 to-cyan-600",
//       };
//     }

//     // Default fallback
//     return {
//       icon: <Ship className="w-6 h-6 sm:w-8 sm:h-8" />,
//       title: "Schedule Your Freight Consultation",
//       subtitle: "Expert freight solutions tailored for you",
//       description:
//         "Our freight specialists will review your requirements and provide you with the best shipping solutions.",
//       benefits: [
//         "Personalized freight solutions",
//         "Competitive pricing and routes",
//         "Expert guidance and support",
//         "End-to-end logistics coordination",
//       ],
//       gradient: "from-blue-500 to-indigo-600",
//     };
//   };

//   const contextContent = getContextualContent();

//   // Get available dates (Sunday-Thursday, up to 30 days in advance)
//   const getAvailableDates = () => {
//     const today = new Date();
//     const maxDate = addDays(today, 30);
//     return { from: today, to: maxDate };
//   };

//   // Check if date is available (Sunday-Thursday only)
//   const isDateAvailable = (date: Date) => {
//     const day = getDay(date);
//     return day >= 0 && day <= 4; // Sunday to Thursday
//   };

//   // Regional time slots
//   const getTimeSlots = () => {
//     return [
//       // GCC/Europe slots (AM - early PM)
//       {
//         time: "09:00 AM",
//         label: "GCC/Europe",
//         available: true,
//         region: "GCC/Europe",
//         description: "Morning slot for Middle East & Europe",
//       },
//       {
//         time: "10:30 AM",
//         label: "GCC/Europe",
//         available: true,
//         region: "GCC/Europe",
//         description: "Late morning slot for Middle East & Europe",
//       },
//       {
//         time: "12:00 PM",
//         label: "GCC/Europe",
//         available: true,
//         region: "GCC/Europe",
//         description: "Noon slot for Middle East & Europe",
//       },
//       // USA/Canada slots (PM - early evening)
//       {
//         time: "02:00 PM",
//         label: "USA/Canada",
//         available: true,
//         region: "USA/Canada",
//         description: "Afternoon slot for Americas",
//       },
//       {
//         time: "03:30 PM",
//         label: "USA/Canada",
//         available: true,
//         region: "USA/Canada",
//         description: "Late afternoon slot for Americas",
//       },
//       {
//         time: "05:00 PM",
//         label: "USA/Canada",
//         available: true,
//         region: "USA/Canada",
//         description: "Evening slot for Americas",
//       },
//     ];
//   };

//   const handleDateSelect = (date: Date | undefined) => {
//     if (date && isDateAvailable(date)) {
//       updateFormData("selectedDate", date);
//       setShowTimeSlots(true);
//       // Don't show user details yet, wait for time selection
//       setShowUserDetails(false);
//     }
//   };

//   const handleTimeSelect = (time: string) => {
//     updateFormData("selectedTime", time);
//     setShowUserDetails(true);
//   };

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     updateFormData("userName", e.target.value);
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     updateFormData("userEmail", e.target.value);
//   };

//   const handleSubmit = () => {
//     if (
//       formData.userName.trim() &&
//       formData.userEmail.trim() &&
//       formData.selectedDate &&
//       formData.selectedTime
//     ) {
//       onSubmit();
//     }
//   };

//   const isFormValid = () => {
//     return (
//       formData.userName.trim() &&
//       formData.userEmail.trim() &&
//       formData.selectedDate &&
//       formData.selectedTime
//     );
//   };

//   const dateRange = getAvailableDates();
//   const timeSlots = getTimeSlots();

//   return (
//     <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 lg:px-0">
//       {/* Header Section with Context */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className={`bg-gradient-to-br ${contextContent.gradient} rounded-2xl p-6 sm:p-8 text-white`}
//       >
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//           <div className="flex-shrink-0">{contextContent.icon}</div>
//           <div className="flex-1">
//             <h2 className="text-xl sm:text-2xl font-bold mb-2">
//               {contextContent.title}
//             </h2>
//             <p className="text-sm sm:text-base opacity-90 mb-4">
//               {contextContent.subtitle}
//             </p>
//             <p className="text-sm opacity-80 leading-relaxed">
//               {contextContent.description}
//             </p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Meeting Benefits */}
//       <Collapsible
//         open={isConsultationOpen}
//         onOpenChange={setIsConsultationOpen}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100 overflow-hidden"
//         >
//           <CollapsibleTrigger className="w-full p-4 sm:p-6 text-left hover:bg-purple-50/50 transition-colors">
//             <h4 className="font-semibold text-gray-900 flex items-center justify-between">
//               <span className="flex items-center">
//                 <Users className="w-5 h-5 mr-2 text-purple-600" />
//                 What to Expect in Your Consultation
//               </span>
//               <ChevronDown
//                 className={`w-5 h-5 text-purple-600 transition-transform duration-200 ${
//                   isConsultationOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </h4>
//           </CollapsibleTrigger>
//           <CollapsibleContent>
//             <div className="px-4 sm:px-6 pb-4 sm:pb-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//                 {contextContent.benefits.map((benefit, index) => (
//                   <div key={index} className="bg-white rounded-lg p-3 sm:p-4">
//                     <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
//                     <p className="text-xs sm:text-sm text-gray-700 font-medium">
//                       {benefit}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Meeting Format Options */}
//               <div className="mt-6 pt-4 border-t border-purple-200">
//                 <h5 className="font-medium text-gray-900 mb-3 flex items-center">
//                   <Video className="w-4 h-4 mr-2 text-purple-600" />
//                   Available Meeting Formats
//                 </h5>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   <div className="flex items-center space-x-3 bg-white/80 rounded-lg p-3">
//                     <Video className="w-5 h-5 text-blue-500 flex-shrink-0" />
//                     <div className="min-w-0">
//                       <p className="font-medium text-gray-900 text-sm">
//                         Video Call
//                       </p>
//                       <p className="text-xs text-gray-600">
//                         Zoom/Teams meeting
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3 bg-white/80 rounded-lg p-3">
//                     <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
//                     <div className="min-w-0">
//                       <p className="font-medium text-gray-900 text-sm">
//                         Phone Call
//                       </p>
//                       <p className="text-xs text-gray-600">
//                         Traditional phone call
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3 bg-white/80 rounded-lg p-3">
//                     <MessageSquare className="w-5 h-5 text-purple-500 flex-shrink-0" />
//                     <div className="min-w-0">
//                       <p className="font-medium text-gray-900 text-sm">
//                         Chat Support
//                       </p>
//                       <p className="text-xs text-gray-600">
//                         Live chat assistance
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CollapsibleContent>
//         </motion.div>
//       </Collapsible>

//       {/* Calendar Selection */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//         className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8"
//       >
//         <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
//           <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-600" />
//           Select a Meeting Date
//         </h3>
//         <div className="flex justify-center">
//           <div className="w-full max-w-md">
//             <Calendar
//               mode="single"
//               selected={formData.selectedDate || undefined}
//               onSelect={handleDateSelect}
//               disabled={(date) =>
//                 date < dateRange.from ||
//                 date > dateRange.to ||
//                 !isDateAvailable(date)
//               }
//               className="rounded-md border-0 shadow-none w-full [&_.rdp]:w-full [&_.rdp-months]:justify-center [&_.rdp-month]:w-full [&_.rdp-table]:w-full [&_.rdp-cell]:p-1 [&_.rdp-cell]:sm:p-2 [&_.rdp-day]:h-8 [&_.rdp-day]:w-8 [&_.rdp-day]:sm:h-10 [&_.rdp-day]:sm:w-10 [&_.rdp-day]:text-xs [&_.rdp-day]:sm:text-base [&_.rdp-head_cell]:text-xs [&_.rdp-head_cell]:sm:text-sm [&_.rdp-head_cell]:p-1 [&_.rdp-head_cell]:sm:p-2"
//             />
//           </div>
//         </div>
//         <div className="mt-4 text-center">
//           <div className="inline-flex items-center gap-4 text-sm">
//             <span className="text-gray-600">
//               <strong className="text-green-600">Available:</strong>{" "}
//               Sunday–Thursday
//             </span>
//             <span className="text-gray-600">
//               <strong className="text-red-500">Unavailable:</strong> Friday &
//               Saturday
//             </span>
//           </div>
//         </div>
//       </motion.div>

//       {/* Time Selection */}
//       {showTimeSlots && formData.selectedDate && (
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8"
//         >
//           <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
//             <span className="flex items-center">
//               <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-600" />
//               Select Time for
//             </span>
//             <span className="text-blue-600 font-bold">
//               {format(formData.selectedDate, "MMMM dd, yyyy")}
//             </span>
//           </h3>

//           {/* Regional Time Slots */}
//           <div className="space-y-6">
//             {/* GCC/Europe Slots */}
//             <div>
//               <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
//                 <Globe className="w-4 h-4 mr-2 text-green-600" />
//                 GCC/Europe Region
//               </h4>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 {timeSlots
//                   .filter((slot) => slot.region === "GCC/Europe")
//                   .map((slot) => (
//                     <motion.button
//                       key={slot.time}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => handleTimeSelect(slot.time)}
//                       className={`h-14 sm:h-16 flex flex-col items-center justify-center text-center min-w-0 px-2 rounded-xl border-2 transition-all duration-200 ${
//                         formData.selectedTime === slot.time
//                           ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-500 shadow-lg"
//                           : "bg-gray-50 text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50"
//                       }`}
//                     >
//                       <span className="text-sm sm:text-base font-semibold">
//                         {slot.time}
//                       </span>
//                       <span className="text-xs opacity-80">30 min</span>
//                     </motion.button>
//                   ))}
//               </div>
//             </div>

//             {/* USA/Canada Slots */}
//             <div>
//               <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
//                 <Globe className="w-4 h-4 mr-2 text-blue-600" />
//                 USA/Canada Region
//               </h4>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 {timeSlots
//                   .filter((slot) => slot.region === "USA/Canada")
//                   .map((slot) => (
//                     <motion.button
//                       key={slot.time}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => handleTimeSelect(slot.time)}
//                       className={`h-14 sm:h-16 flex flex-col items-center justify-center text-center min-w-0 px-2 rounded-xl border-2 transition-all duration-200 ${
//                         formData.selectedTime === slot.time
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-lg"
//                           : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
//                       }`}
//                     >
//                       <span className="text-sm sm:text-base font-semibold">
//                         {slot.time}
//                       </span>
//                       <span className="text-xs opacity-80">30 min</span>
//                     </motion.button>
//                   ))}
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-500">
//               All times shown in your local timezone • 30-minute consultation
//             </p>
//           </div>
//         </motion.div>
//       )}

//       {/* User Details Form */}
//       {showUserDetails && formData.selectedTime && (
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8"
//         >
//           <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
//             <User className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-600" />
//             Your Contact Information
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <Label
//                 htmlFor="userName"
//                 className="text-base font-semibold text-gray-900 mb-2 block"
//               >
//                 Full Name *
//               </Label>
//               <div className="relative">
//                 <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <Input
//                   id="userName"
//                   type="text"
//                   placeholder="Enter your full name"
//                   value={formData.userName}
//                   onChange={handleNameChange}
//                   className="pl-12 h-14 text-base border-2 border-gray-200 focus:border-purple-500 rounded-xl"
//                 />
//               </div>
//             </div>

//             <div>
//               <Label
//                 htmlFor="userEmail"
//                 className="text-base font-semibold text-gray-900 mb-2 block"
//               >
//                 Email Address *
//               </Label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <Input
//                   id="userEmail"
//                   type="email"
//                   placeholder="Enter your email address"
//                   value={formData.userEmail}
//                   onChange={handleEmailChange}
//                   className="pl-12 h-14 text-base border-2 border-gray-200 focus:border-purple-500 rounded-xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Action Buttons */}
//       <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8">
//         <Button
//           variant="outline"
//           onClick={onPrev}
//           className="px-8 py-3 text-base border-2 hover:bg-gray-50 rounded-xl"
//         >
//           Previous
//         </Button>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.5 }}
//         >
//           <Button
//             onClick={handleSubmit}
//             disabled={!isFormValid() || isSubmitting}
//             className="px-8 py-3 text-base bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 shadow-lg rounded-xl min-w-64"
//           >
//             {isSubmitting ? (
//               <div className="flex items-center space-x-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 <span>Scheduling...</span>
//               </div>
//             ) : (
//               <>
//                 <CheckCircle className="w-5 h-5 mr-2" />
//                 Schedule My Consultation
//               </>
//             )}
//           </Button>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default StepSevenEnhanced;