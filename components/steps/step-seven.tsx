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
  Globe,
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

interface TimeSlot {
  time: string;
  ksaTime: string; // Original KSA time for backend
  available: boolean;
  isBooked: boolean;
  isMorning: boolean;
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

  // ✅ Detect user timezone and get timezone info
  const userTimeZone = useMemo(() => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  }, []);

  const timezoneInfo = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("en", {
      timeZoneName: "short",
      timeZone: userTimeZone,
    });
    const parts = formatter.formatToParts(new Date());
    const timeZoneName =
      parts.find((part) => part.type === "timeZoneName")?.value || userTimeZone;

    return {
      name: timeZoneName,
      fullName: userTimeZone,
    };
  }, [userTimeZone]);

  // ✅ Convert KSA time to user's local time
  const convertKSATimeToLocal = useCallback(
    (ksaTimeString: string, selectedDate: Date) => {
      const [time, modifier] = ksaTimeString.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      // Convert to 24-hour format
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      // Create date in KSA timezone
      const ksaDate = new Date(selectedDate);
      ksaDate.setHours(hours, minutes, 0, 0);

      // Convert from KSA (UTC+3) to user's timezone
      const utcTime = ksaDate.getTime() - 3 * 60 * 60 * 1000; // KSA is UTC+3
      const localDate = new Date(utcTime);

      // Format to user's local time
      const localTimeString = localDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: userTimeZone,
      });

      // Determine if it's morning (before 12 PM local time)
      const localHour = localDate.getHours();
      const isMorning = localHour < 12;

      return {
        localTime: localTimeString,
        isMorning,
        localHour,
      };
    },
    [userTimeZone]
  );

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
    (ksaTime: string) => {
      const isBooked = bookedSlots.some(
        (slot) => slot.selectedTime === ksaTime
      );
      return isBooked;
    },
    [bookedSlots]
  );

  // ✅ Memoize time slots with timezone conversion
  const timeSlots = useMemo((): TimeSlot[] => {
    if (!formData.selectedDate) return [];

    // Base KSA time slots
    const baseKSASlots = [
      "09:00 AM", // Morning KSA
      "10:30 AM", // Morning KSA
      "12:00 PM", // Afternoon KSA
      "02:00 PM", // Afternoon KSA
      "03:30 PM", // Afternoon KSA
      "05:00 PM", // Evening KSA
      "10:00 PM", // Night KSA
    ];

    return baseKSASlots
      .map((ksaTime) => {
        const conversion = convertKSATimeToLocal(
          ksaTime,
          formData.selectedDate!
        );
        const isBooked = isTimeSlotBooked(ksaTime);

        return {
          time: conversion.localTime,
          ksaTime: ksaTime, // Keep original KSA time for backend
          available: !isBooked,
          isBooked: isBooked,
          isMorning: conversion.isMorning,
        };
      })
      .sort((a, b) => {
        // Sort by actual time order
        const timeA = new Date(`1970-01-01 ${a.time}`);
        const timeB = new Date(`1970-01-01 ${b.time}`);
        return timeA.getTime() - timeB.getTime();
      });
  }, [formData.selectedDate, convertKSATimeToLocal, isTimeSlotBooked]);

  // ✅ Separate morning and evening slots
  const morningSlots = useMemo(
    () => timeSlots.filter((slot) => slot.isMorning),
    [timeSlots]
  );

  const eveningSlots = useMemo(
    () => timeSlots.filter((slot) => !slot.isMorning),
    [timeSlots]
  );

  // Date selection
  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      if (date && isDateAvailable(date)) {
        updateFormData("selectedDate", date);
        updateFormData("selectedTime", "");
        setShowUserDetails(false);

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

  // ✅ Time selection - store KSA time for backend compatibility
  const handleTimeSelect = useCallback(
    (localTime: string, ksaTime: string) => {
      if (!isTimeSlotBooked(ksaTime)) {
        updateFormData("selectedTime", ksaTime); // Store KSA time for backend
        updateFormData("selectedTimeLocal", localTime); // Store local time for display
        setShowUserDetails(true);
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

  // User details
  const handleUserDetailsChange = useCallback(
    (field: keyof UserDetails, value: string) => {
      setUserDetails((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // Final submit
  const handleFinalSubmit = useCallback(() => {
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

    if (isTimeSlotBooked(formData.selectedTime)) {
      alert(
        "Sorry, this time slot has been booked by someone else. Please select another time."
      );
      return;
    }

    const selectedDate = formData.selectedDate;
    const selectedTime = formData.selectedTime;

    const [time, modifier] = selectedTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const combinedDate = new Date(selectedDate);
    combinedDate.setHours(hours, minutes, 0, 0);

    const finalData = {
      selectedDate: combinedDate,
      selectedTime: selectedTime, // KSA time for backend
      selectedTimeLocal: formData.selectedTimeLocal, // Local time for reference
      userName: userDetails.name,
      userEmail: userDetails.email,
      userTimeZone: userTimeZone,
    };

    updateFormData("selectedDate", combinedDate);
    updateFormData("selectedTime", selectedTime);
    updateFormData("userName", userDetails.name);
    updateFormData("userEmail", userDetails.email);
    updateFormData("userTimeZone", userTimeZone);

    onSubmit(finalData);
  }, [
    formData.selectedDate,
    formData.selectedTime,
    formData.selectedTimeLocal,
    userDetails,
    isTimeSlotBooked,
    updateFormData,
    onSubmit,
    userTimeZone,
  ]);

  // Form complete check
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

  // ✅ Render time slots function
  const renderTimeSlots = useCallback(
    (slots: TimeSlot[], title: string) => {
      if (slots.length === 0) return null;

      return (
        <div>
          <h4
            className="text-sm font-medium mb-3 flex items-center"
            style={{ color: "var(--gray-2)" }}
          >
            {title === "Morning" ? (
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            )}
            {title} ({slots.length} slots)
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {slots.map((slot) => {
              const isSelected = formData.selectedTime === slot.ksaTime;
              return (
                <Button
                  key={slot.ksaTime}
                  variant={isSelected ? "default" : "outline"}
                  disabled={!slot.available}
                  className={`h-12 flex items-center justify-between text-left rounded-xl transition-all ${
                    isSelected ? "shadow-lg" : "hover:opacity-80"
                  } ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                  style={{
                    backgroundColor: isSelected
                      ? "var(--primary2)"
                      : slot.isBooked
                      ? "rgba(var(--primary2-rgb), 0.3)"
                      : "transparent",
                    borderColor: isSelected
                      ? "var(--primary)"
                      : slot.isBooked
                      ? "#ff4444"
                      : "var(--black-7)",
                    color: isSelected
                      ? "var(--black)"
                      : slot.isBooked
                      ? "#ff4444"
                      : "var(--white-2)",
                  }}
                  onClick={() =>
                    slot.available && handleTimeSelect(slot.time, slot.ksaTime)
                  }
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {slot.time} — ({slot.ksaTime} KSA on{" "}
                      {formData.selectedDate
                        ? format(formData.selectedDate, "EEEE, MMMM dd, yyyy")
                        : ""}
                      )
                    </span>
                  </div>
                  {slot.isBooked && (
                    <span className="text-xs text-red-600 py-1 rounded-xl">
                      Booked
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      );
    },
    [formData.selectedTime, handleTimeSelect]
  );

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
              className="text-base sm:text-lg font-semibold mb-2 flex items-center"
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
              <div className="space-y-6">
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

                {/* ✅ Time Slots with proper morning/evening separation */}
                {!isLoadingSlots && !slotsError && (
                  <>
                    {/* Morning Slots */}
                    {renderTimeSlots(morningSlots, "Morning")}

                    {/* Evening Slots */}
                    {renderTimeSlots(eveningSlots, "Evening")}

                    <div className="mt-4 text-center">
                      {bookedSlots.length > 0 && (
                        <div
                          className="text-xs mt-2 p-2 rounded-lg"
                          style={{
                            color: "#ff4444",
                            backgroundColor: "rgba(255, 68, 68, 0.1)",
                          }}
                        >
                          ⚠️ {bookedSlots.length} slot(s) already booked for
                          this date
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

          {/* ✅ Selected time confirmation with morning/evening indicator */}
          {formData.selectedTimeLocal && (
            <div
              className="mb-6 p-4 rounded-xl border"
              style={{
                backgroundColor: "var(--primary2)",
                borderColor: "var(--primary)",
              }}
            >
              <div className="flex items-center">
                <CheckCircle
                  className="w-5 h-5 mr-2"
                  style={{ color: "var(--black)" }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p
                      className="font-medium text-sm"
                      style={{ color: "var(--black)" }}
                    >
                      Meeting scheduled for: {formData.selectedTimeLocal}
                    </p>
                    {/* Morning/Evening Badge */}
                    {(() => {
                      const selectedSlot = timeSlots.find(
                        (slot) => slot.ksaTime === formData.selectedTime
                      );
                      return selectedSlot ? (
                        <span
                          className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: selectedSlot.isMorning
                              ? "#22c55e"
                              : "#f59e0b",
                            color: "white",
                          }}
                        >
                          {selectedSlot.isMorning
                            ? "Morning Slot"
                            : "Evening Slot"}
                        </span>
                      ) : null;
                    })()}
                  </div>
                  <p
                    className="text-xs opacity-70 mt-1"
                    style={{ color: "var(--black)" }}
                  >
                    ({formData.selectedTime} KSA time) on{" "}
                    {format(formData.selectedDate!, "EEEE, MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          )}

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
