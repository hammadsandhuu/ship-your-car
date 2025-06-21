"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import type { FormData } from "../freight-form";
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
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
  });
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTimeSection, setShowTimeSection] = useState(false);

  const timeSectionRef = useRef<HTMLDivElement>(null);
  const userDetailsRef = useRef<HTMLDivElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Get available dates (Sunday-Thursday, up to 30 days in advance)
  const getAvailableDates = () => {
    const today = new Date();
    const maxDate = addDays(today, 30);
    return { from: today, to: maxDate };
  };

  // Check if date is available (Sunday-Thursday only)
  const isDateAvailable = (date: Date) => {
    const day = getDay(date);
    return day >= 0 && day <= 4; // Sunday to Thursday
  };

  // Time slots for different regions
  const getTimeSlots = () => {
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

      // On mobile, show time section and scroll to it
      if (isMobile) {
        setShowTimeSection(true);
        setTimeout(() => {
          timeSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  const handleTimeSelect = (time: string) => {
    updateFormData("selectedTime", time);
    setShowUserDetails(true);

    // On mobile, scroll to user details after selection
    if (isMobile) {
      setTimeout(() => {
        userDetailsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleUserDetailsChange = (field: keyof UserDetails, value: string) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinalSubmit = () => {
    // Validation check - all required fields must be filled
    if (!formData.selectedDate) {
      alert("Please select a meeting date");
      return;
    }

    if (!formData.selectedTime) {
      alert("Please select a meeting time");
      return;
    }

    if (!userDetails.name.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (!userDetails.email.trim()) {
      alert("Please enter your email address");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Add user details to form data
    updateFormData("userName", userDetails.name);
    updateFormData("userEmail", userDetails.email);

    // Submit the form
    onSubmit();
  };

  // Update isFormComplete validation
  const isFormComplete =
    formData.selectedDate &&
    formData.selectedTime &&
    userDetails.name.trim() &&
    userDetails.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email);
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
          className="rounded-xl border overflow-hidden"
          style={{
            backgroundColor: "var(--black-5)",
            borderColor: "var(--black-6)",
          }}
        >
          <CollapsibleTrigger className="w-full p-4 sm:p-6 text-left hover:opacity-80 transition-colors">
            <h4
              className="font-semibold flex items-center justify-between"
              style={{ color: "var(--white)" }}
            >
              <span className="flex items-center">
                <Users
                  className="w-5 h-5 mr-2"
                  style={{ color: "var(--primary)" }}
                />
                What to Expect
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  isConsultationOpen ? "rotate-180" : ""
                }`}
                style={{ color: "var(--primary)" }}
              />
            </h4>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div
                  className="rounded-lg p-3 sm:p-4"
                  style={{
                    backgroundColor: "var(--black-6)",
                  }}
                >
                  <MessageSquare
                    className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2"
                    style={{ color: "var(--primary)" }}
                  />
                  <h5
                    className="font-medium mb-1"
                    style={{ color: "var(--white)" }}
                  >
                    Detailed Discussion
                  </h5>
                  <p
                    className="text-xs sm:text-sm"
                    style={{ color: "var(--gray-2)" }}
                  >
                    Review your specific requirements and optimize shipping
                    solutions
                  </p>
                </div>
                <div
                  className="rounded-lg p-3 sm:p-4"
                  style={{
                    backgroundColor: "var(--black-6)",
                  }}
                >
                  <CheckCircle
                    className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2"
                    style={{ color: "var(--primary)" }}
                  />
                  <h5
                    className="font-medium mb-1"
                    style={{ color: "var(--white)" }}
                  >
                    Custom Quote
                  </h5>
                  <p
                    className="text-xs sm:text-sm"
                    style={{ color: "var(--gray-2)" }}
                  >
                    Receive personalized pricing and service recommendations
                  </p>
                </div>
                <div
                  className="rounded-lg p-3 sm:p-4"
                  style={{
                    backgroundColor: "var(--black-6)",
                  }}
                >
                  <CalendarDays
                    className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2"
                    style={{ color: "var(--primary)" }}
                  />
                  <h5
                    className="font-medium mb-1"
                    style={{ color: "var(--white)" }}
                  >
                    Timeline Planning
                  </h5>
                  <p
                    className="text-xs sm:text-sm"
                    style={{ color: "var(--gray-2)" }}
                  >
                    Establish clear timelines and next steps for your shipment
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </motion.div>
      </Collapsible>

      {/* Calendar and Time Selection - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Calendar Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl shadow-lg border p-4 sm:p-6"
          style={{
            backgroundColor: "var(--black-5)",
            borderColor: "var(--black-6)",
          }}
        >
          <h3
            className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center"
            style={{ color: "var(--white)" }}
          >
            <CalendarDays
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              style={{ color: "var(--primary)" }}
            />
            Select a Meeting Date
          </h3>
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-center">
              <Calendar
                mode="single"
                selected={formData.selectedDate || undefined}
                onSelect={handleDateSelect}
                disabled={(date) =>
                  date < dateRange.from ||
                  date > dateRange.to ||
                  !isDateAvailable(date)
                }
                className="rounded-md border-0 shadow-none w-full calendar-custom"
                style={{
                  backgroundColor: "transparent",
                }}
              />
            </div>
            <div className="mt-3 sm:mt-4 text-center w-full">
              <div
                className="text-xs sm:text-sm mb-2"
                style={{ color: "var(--gray-2)" }}
              >
                <strong>Available Days:</strong> Sunday–Thursday
              </div>
              <div
                className="text-xs sm:text-sm"
                style={{ color: "var(--primary)" }}
              >
                <strong>Unavailable:</strong> Friday & Saturday
              </div>
              {formData.selectedDate && (
                <div
                  className="mt-3 p-2 rounded-lg border"
                  style={{
                    backgroundColor: "var(--black-6)",
                    borderColor: "var(--primary)",
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--primary)" }}
                  >
                    Selected:{" "}
                    {format(formData.selectedDate, "EEEE, MMMM dd, yyyy")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Time Selection */}
        {(!isMobile || showTimeSection) && (
          <motion.div
            ref={timeSectionRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-2xl shadow-lg border p-4 sm:p-6 ${
              !formData.selectedDate ? "opacity-50 pointer-events-none" : ""
            }`}
            style={{
              backgroundColor: "var(--black-5)",
              borderColor: "var(--black-6)",
            }}
          >
            <h3
              className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center"
              style={{ color: "var(--white)" }}
            >
              <Clock
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                style={{ color: "var(--primary)" }}
              />
              Select a Time
              {formData.selectedDate && (
                <span
                  className="ml-2 text-sm font-normal"
                  style={{ color: "var(--primary)" }}
                >
                  for {format(formData.selectedDate, "MMM dd")}
                </span>
              )}
            </h3>

            {!formData.selectedDate ? (
              <div className="text-center py-8">
                <CalendarDays
                  className="w-12 h-12 mx-auto mb-4 opacity-50"
                  style={{ color: "var(--gray-2)" }}
                />
                <p className="text-sm" style={{ color: "var(--gray-2)" }}>
                  Please select a date first to choose a time slot
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* GCC/Europe Slots */}
                <div>
                  <h4
                    className="text-sm font-medium mb-3 flex items-center"
                    style={{ color: "var(--white-2)" }}
                  >
                    <Globe
                      className="w-4 h-4 mr-2"
                      style={{ color: "var(--primary)" }}
                    />
                    GCC/Europe Region
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
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
                          className={`h-10 flex items-center justify-center text-center ${
                            formData.selectedTime === slot.time
                              ? "shadow-lg"
                              : "hover:opacity-80"
                          } ${
                            !slot.available
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          style={{
                            backgroundColor:
                              formData.selectedTime === slot.time
                                ? "var(--primary)"
                                : "var(--black-6)",
                            borderColor:
                              formData.selectedTime === slot.time
                                ? "var(--primary)"
                                : "var(--black-7)",
                            color:
                              formData.selectedTime === slot.time
                                ? "var(--black)"
                                : "var(--white-2)",
                          }}
                          onClick={() =>
                            slot.available && handleTimeSelect(slot.time)
                          }
                        >
                          <span className="text-sm font-medium">
                            {slot.time}
                          </span>
                        </Button>
                      ))}
                  </div>
                </div>

                {/* USA/Canada Slots */}
                <div>
                  <h4
                    className="text-sm font-medium mb-3 flex items-center"
                    style={{ color: "var(--white-2)" }}
                  >
                    <Globe
                      className="w-4 h-4 mr-2"
                      style={{ color: "var(--primary)" }}
                    />
                    USA/Canada Region
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
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
                          className={`h-10 flex items-center justify-center text-center ${
                            formData.selectedTime === slot.time
                              ? "shadow-lg"
                              : "hover:opacity-80"
                          } ${
                            !slot.available
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          style={{
                            backgroundColor:
                              formData.selectedTime === slot.time
                                ? "var(--primary)"
                                : "var(--black-6)",
                            borderColor:
                              formData.selectedTime === slot.time
                                ? "var(--primary)"
                                : "var(--black-7)",
                            color:
                              formData.selectedTime === slot.time
                                ? "var(--black)"
                                : "var(--white-2)",
                          }}
                          onClick={() =>
                            slot.available && handleTimeSelect(slot.time)
                          }
                        >
                          <span className="text-sm font-medium">
                            {slot.time}
                          </span>
                        </Button>
                      ))}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div
                    className="text-xs sm:text-sm"
                    style={{ color: "var(--gray-2)" }}
                  >
                    All times shown in your local timezone · 15-minute call
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* User Details Form */}
      {showUserDetails && formData.selectedTime && (
        <motion.div
          ref={userDetailsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl shadow-lg border p-4 sm:p-6 md:p-8"
          style={{
            backgroundColor: "var(--black-5)",
            borderColor: "var(--black-6)",
          }}
        >
          <h3
            className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center"
            style={{ color: "var(--white)" }}
          >
            <User
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              style={{ color: "var(--primary)" }}
            />
            Your Contact Information
          </h3>

          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium"
                style={{ color: "var(--white-2)" }}
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
                className="h-12 text-base rounded-xl"
                style={{
                  backgroundColor: "var(--black-6)",
                  borderColor: "var(--black-7)",
                  color: "var(--white-2)",
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium"
                style={{ color: "var(--white-2)" }}
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
                className="h-12 text-base rounded-xl"
                style={{
                  backgroundColor: "var(--black-6)",
                  borderColor: "var(--black-7)",
                  color: "var(--white-2)",
                }}
                required
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-8">
        <Button
          variant="outline"
          onClick={onPrev}
          className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base border-2 hover:opacity-80 w-full sm:w-auto rounded-xl"
          style={{
            backgroundColor: "var(--black-5)",
            borderColor: "var(--black-6)",
            color: "var(--white-2)",
          }}
        >
          Previous
        </Button>
        <Button
          onClick={handleFinalSubmit}
          disabled={!isFormComplete || isSubmitting || false}
          className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-lg w-full sm:w-auto rounded-xl"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--black)",
          }}
        >
          {isSubmitting ? (
            <>
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin rounded-full border-2 border-t-transparent"
                style={{
                  borderColor: "var(--black)",
                  borderTopColor: "transparent",
                }}
              />
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
