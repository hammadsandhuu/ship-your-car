"use client";
import type React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import axios from "axios";

interface StepSevenProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onPrev: () => void;
  onSubmit?: (finalData?: Partial<FormData>) => void;
  isSubmitting?: boolean;
}

interface UserDetails {
  name: string;
  email: string;
}

interface BookedSlot {
  selectedTime: string;
  userName: string;
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
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

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

  // Memoize function to fetch booked slots for a specific date
  const fetchBookedSlots = useCallback(async (date: Date) => {
    setIsLoadingSlots(true);
    setSlotsError(null);

    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/submissions/by-date?date=${formattedDate}`
      );

      if (response.data.success && response.data.data) {
        const booked = response.data.data.map((booking: any) => ({
          selectedTime: booking.selectedTime,
          userName: booking.userName,
        }));
        setBookedSlots(booked);
      } else {
        setBookedSlots([]);
      }
    } catch (error) {
      setSlotsError("Failed to load available time slots");
      setBookedSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  }, []);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (formData.selectedDate) {
      fetchBookedSlots(formData.selectedDate);
    } else {
      setBookedSlots([]);
    }
  }, [formData.selectedDate, fetchBookedSlots]);

  // Memoize available dates calculation
  const dateRange = useMemo(() => {
    const today = new Date();
    const maxDate = addDays(today, 30);
    return { from: today, to: maxDate };
  }, []);

  // Memoize date availability check
  const isDateAvailable = useCallback((date: Date) => {
    const day = getDay(date);
    return day >= 0 && day <= 4; // Sunday to Thursday
  }, []);

  // Memoize time slot booking check
  const isTimeSlotBooked = useCallback(
    (time: string) => {
      const isBooked = bookedSlots.some((slot) => slot.selectedTime === time);
      // Debug: Log the check
      console.log(
        `Checking if ${time} is booked:`,
        isBooked,
        "Booked slots:",
        bookedSlots
      );
      return isBooked;
    },
    [bookedSlots]
  );

  // Memoize time slots calculation
  const timeSlots = useMemo(() => {
    const baseSlots = [
      {
        time: "09:00 AM",
        label: "GCC/Europe",
        region: "GCC/Europe",
        description: "Morning slot for Middle East & Europe",
      },
      {
        time: "10:30 AM",
        label: "GCC/Europe",
        region: "GCC/Europe",
        description: "Late morning slot for Middle East & Europe",
      },
      {
        time: "12:00 PM",
        label: "GCC/Europe",
        region: "GCC/Europe",
        description: "Noon slot for Middle East & Europe",
      },
      {
        time: "02:00 PM",
        label: "USA/Canada",
        region: "USA/Canada",
        description: "Afternoon slot for Americas",
      },
      {
        time: "03:30 PM",
        label: "USA/Canada",
        region: "USA/Canada",
        description: "Late afternoon slot for Americas",
      },
      {
        time: "05:00 PM",
        label: "USA/Canada",
        region: "USA/Canada",
        description: "Evening slot for Americas",
      },
      {
        time: "10:00 PM",
        label: "USA/Canada",
        region: "USA/Canada",
        description: "Evening slot for Americas",
      },
    ];

    // Add availability status to each slot
    return baseSlots.map((slot) => ({
      ...slot,
      available: !isTimeSlotBooked(slot.time),
      isBooked: isTimeSlotBooked(slot.time),
    }));
  }, [isTimeSlotBooked]);

  // Memoize date selection handler
  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      if (date && isDateAvailable(date)) {
        updateFormData("selectedDate", date);
        // Reset selected time when date changes
        updateFormData("selectedTime", "");
        setShowUserDetails(false);

        // On mobile, show time section and scroll to it
        if (isMobile) {
          setShowTimeSection(true);
          setTimeout(() => {
            timeSectionRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    },
    [isDateAvailable, updateFormData, isMobile]
  );

  // Memoize time selection handler
  const handleTimeSelect = useCallback(
    (time: string) => {
      if (!isTimeSlotBooked(time)) {
        updateFormData("selectedTime", time);
        setShowUserDetails(true);
        // Scroll to user details for both mobile and desktop
        setTimeout(() => {
          userDetailsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    },
    [isTimeSlotBooked, updateFormData]
  );

  // Memoize user details change handler
  const handleUserDetailsChange = useCallback(
    (field: keyof UserDetails, value: string) => {
      setUserDetails((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // Memoize final submit handler
  const handleFinalSubmit = useCallback(() => {
    // Validation check
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Check if selected time is still available (double-check)
    if (isTimeSlotBooked(formData.selectedTime)) {
      alert(
        "Sorry, this time slot has been booked by someone else. Please select another time."
      );
      return;
    }

    // Combine date and time into full datetime
    const selectedDate = formData.selectedDate;
    const selectedTime = formData.selectedTime;

    // Parse time string (e.g., "02:00 PM") to 24-hour format
    const [time, modifier] = selectedTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    // Create new Date with combined time
    const combinedDate = new Date(selectedDate);
    combinedDate.setHours(hours, minutes, 0, 0);

    // Prepare final data object
    const finalData = {
      selectedDate: combinedDate,
      selectedTime: selectedTime,
      userName: userDetails.name,
      userEmail: userDetails.email,
    };

    // Update form data first, then submit with final data
    updateFormData("selectedDate", combinedDate);
    updateFormData("selectedTime", selectedTime);
    updateFormData("userName", userDetails.name);
    updateFormData("userEmail", userDetails.email);

    // Pass the final data directly to onSubmit
    onSubmit(finalData);
  }, [
    formData.selectedDate,
    formData.selectedTime,
    userDetails,
    isTimeSlotBooked,
    updateFormData,
    onSubmit,
  ]);

  // Memoize form completion check
  const isFormComplete = useMemo(() => {
    return (
      formData.selectedDate &&
      formData.selectedTime &&
      userDetails.name.trim() &&
      userDetails.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)
    );
  }, [
    formData.selectedDate,
    formData.selectedTime,
    userDetails.name,
    userDetails.email,
  ]);

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-0 h-full">
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
                  className="rounded-xl p-3 sm:p-4"
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
                  className="rounded-xl p-3 sm:p-4"
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
                  className="rounded-xl p-3 sm:p-4"
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
          <div className="flex flex-col items-center justify-center">
            <div className="w-fit flex justify-center">
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
                style={{ color: "var(--primary)" }}
              >
                <strong>Available Days:</strong> Sunday–Thursday
              </div>
              <div
                className="text-xs sm:text-sm"
                style={{ color: "var(--gray-2)" }}
              >
                <strong>Unavailable:</strong> Friday & Saturday
              </div>
              {formData.selectedDate && (
                <div
                  className="mt-3 p-2 border rounded-xl"
                  style={{
                    backgroundColor: "var(--primary2)",
                    borderColor: "var(--primary2)",
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--black-6)" }}
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
                {/* Loading State */}
                {isLoadingSlots && (
                  <div className="text-center py-4">
                    <div
                      className="w-6 h-6 mx-auto mb-2 animate-spin rounded-full border-2 border-t-transparent"
                      style={{
                        borderColor: "var(--primary)",
                        borderTopColor: "transparent",
                      }}
                    />
                    <p className="text-sm" style={{ color: "var(--gray-2)" }}>
                      Loading available time slots...
                    </p>
                  </div>
                )}

                {/* Error State */}
                {slotsError && (
                  <div className="text-center py-4">
                    <AlertCircle
                      className="w-8 h-8 mx-auto mb-2"
                      style={{ color: "#ff4444" }}
                    />
                    <p className="text-sm" style={{ color: "#ff4444" }}>
                      {slotsError}
                    </p>
                    <Button
                      onClick={() => fetchBookedSlots(formData.selectedDate!)}
                      variant="outline"
                      className="mt-2 text-xs"
                    >
                      Retry
                    </Button>
                  </div>
                )}

                {/* Time Slots */}
                {!isLoadingSlots && !slotsError && (
                  <>
                    {/* GCC/Europe Slots */}
                    <div>
                      <h4
                        className="text-sm font-medium mb-2"
                        style={{ color: "var(--gray-2)" }}
                      >
                        Morning Slots
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
                              className={`h-10 flex items-center justify-between text-left rounded-xl ${
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
                                    ? "var(--primary2)"
                                    : slot.isBooked
                                    ? "rgba(var(--primary2-rgb), 0.3)" // Light primary2 background
                                    : "transparent",
                                borderColor:
                                  formData.selectedTime === slot.time
                                    ? "var(--primary)"
                                    : slot.isBooked
                                    ? "#ff4444"
                                    : "var(--black-7)",
                                color:
                                  formData.selectedTime === slot.time
                                    ? "var(--black)"
                                    : slot.isBooked
                                    ? "#ff4444"
                                    : "var(--white-2)",
                              }}
                              onClick={() =>
                                slot.available && handleTimeSelect(slot.time)
                              }
                            >
                              <span className="text-sm font-medium">
                                {slot.time}
                              </span>
                              {slot.isBooked && (
                                <span className="text-xs">Booked</span>
                              )}
                            </Button>
                          ))}
                      </div>
                    </div>

                    {/* USA/Canada Slots */}
                    <div>
                      <h4
                        className="text-sm font-medium mb-2"
                        style={{ color: "var(--gray-2)" }}
                      >
                        Evening Slots
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
                              className={`h-10 flex items-center justify-between text-left rounded-xl ${
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
                                    ? "var(--primary2)"
                                    : slot.isBooked
                                    ? "rgba(var(--primary2-rgb), 0.3)" // Light primary2 background
                                    : "transparent",
                                borderColor:
                                  formData.selectedTime === slot.time
                                    ? "var(--primary)"
                                    : slot.isBooked
                                    ? "#ff4444"
                                    : "var(--black-7)",
                                color:
                                  formData.selectedTime === slot.time
                                    ? "var(--black)"
                                    : slot.isBooked
                                    ? "#ff4444"
                                    : "var(--white-2)",
                              }}
                              onClick={() =>
                                slot.available && handleTimeSelect(slot.time)
                              }
                            >
                              <span className="text-sm font-medium">
                                {slot.time}
                              </span>
                              {slot.isBooked && (
                                <span className="text-xs">Booked</span>
                              )}
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
                      {bookedSlots.length > 0 && (
                        <div
                          className="text-xs mt-2"
                          style={{ color: "#ff4444" }}
                        >
                          {bookedSlots.length} slot(s) already booked for this
                          date
                        </div>
                      )}
                    </div>
                  </>
                )}
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
      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-0 pt-4 sm:pt-8">
        <Button
          onClick={handleFinalSubmit}
          disabled={!isFormComplete || isSubmitting || false}
          className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-lg w-full sm:w-auto rounded-xl"
          style={{
            backgroundColor: "var(--primary2)",
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
