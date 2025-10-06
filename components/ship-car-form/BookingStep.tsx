// components/BookingStep.tsx
"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, getDay } from "date-fns";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  Users,
  MessageSquare,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import axios from "axios";
import type { CarFormData } from "@/types/car-shipping";

interface BookingStepProps {
  formData: CarFormData;
  updateFormData: (field: keyof CarFormData, value: any) => void;
  onBack: () => void;
  onSubmit?: (finalData: Partial<CarFormData>) => Promise<void> | void;
  isSubmitting?: boolean;
}

interface BookedSlot {
  selectedTime: string;
  userName?: string;
}

interface TimeSlot {
  time: string;
  ksaTime: string;
  available: boolean;
  isBooked: boolean;
  isMorning: boolean;
}

const baseKSASlots = [
  "10:30 AM",
  "11:30 AM",
  "1:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
];

const BookingStep: React.FC<BookingStepProps> = ({
  formData,
  updateFormData,
  onBack,
  onSubmit = () => {},
  isSubmitting = false,
}) => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTimeSection, setShowTimeSection] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const timeSectionRef = useRef<HTMLDivElement>(null);

  const userTimeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    []
  );

  const convertKSATimeToLocal = useCallback(
    (ksaTimeString: string, selectedDate: Date) => {
      const [time, modifier] = ksaTimeString.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const ksaDate = new Date(selectedDate);
      ksaDate.setHours(hours, minutes, 0, 0);

      const utcTime = ksaDate.getTime() - 3 * 60 * 60 * 1000;
      const localDate = new Date(utcTime);

      const localTime = localDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: userTimeZone,
      });

      return { localTime, isMorning: localDate.getHours() < 12 };
    },
    [userTimeZone]
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchBookedSlots = useCallback(async (date: Date) => {
    setIsLoadingSlots(true);
    setSlotsError(null);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/submissions/by-date?date=${formattedDate}`
      );
      const booked =
        res.data?.data?.map((b: any) => ({
          selectedTime: b.selectedTime,
          userName: b.userName,
        })) || [];
      setBookedSlots(booked);
    } catch (err) {
      setSlotsError("Failed to load available time slots");
      setBookedSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (formData.selectedDate) fetchBookedSlots(formData.selectedDate);
    else setBookedSlots([]);
  }, [formData.selectedDate, fetchBookedSlots]);

  const dateRange = useMemo(() => {
    const today = new Date();
    const maxDate = addDays(today, 30);
    return { from: today, to: maxDate };
  }, []);

  const isDateAvailable = useCallback((date: Date) => {
    const day = getDay(date);
    return day >= 0 && day <= 4; // Sunday–Thursday
  }, []);

  const isTimeSlotBooked = useCallback(
    (ksaTime: string) => bookedSlots.some((s) => s.selectedTime === ksaTime),
    [bookedSlots]
  );

  const timeSlots = useMemo((): TimeSlot[] => {
    if (!formData.selectedDate) return [];
    return baseKSASlots
      .map((ksaTime) => {
        const { localTime, isMorning } = convertKSATimeToLocal(
          ksaTime,
          formData.selectedDate!
        );
        const booked = isTimeSlotBooked(ksaTime);
        return {
          time: localTime,
          ksaTime,
          available: !booked,
          isBooked: booked,
          isMorning,
        };
      })
      .sort((a, b) => {
        const tA = new Date(`1970-01-01 ${a.time}`);
        const tB = new Date(`1970-01-01 ${b.time}`);
        return tA.getTime() - tB.getTime();
      });
  }, [formData.selectedDate, convertKSATimeToLocal, isTimeSlotBooked]);

  const morningSlots = timeSlots.filter((s) => s.isMorning);
  const eveningSlots = timeSlots.filter((s) => !s.isMorning);

  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      if (date && isDateAvailable(date)) {
        updateFormData("selectedDate", date);
        updateFormData("selectedTime", "");
        if (isMobile) {
          setShowTimeSection(true);
          setTimeout(
            () =>
              timeSectionRef.current?.scrollIntoView({ behavior: "smooth" }),
            100
          );
        }
      }
    },
    [isDateAvailable, updateFormData, isMobile]
  );

  const handleTimeSelect = useCallback(
    (localTime: string, ksaTime: string) => {
      if (!isTimeSlotBooked(ksaTime)) {
        updateFormData("selectedTime", ksaTime);
        updateFormData("selectedTimeLocal", localTime);
      }
    },
    [isTimeSlotBooked, updateFormData]
  );

  const handleFinalSubmit = useCallback(() => {
    if (!formData.selectedDate) return alert("Please select a meeting date");
    if (!formData.selectedTime) return alert("Please select a meeting time");

    if (isTimeSlotBooked(formData.selectedTime)) {
      alert(
        "Sorry, this time slot has just been booked. Please choose another slot."
      );
      return;
    }

    const finalPayload = {
      selectedDate: formData.selectedDate,
      selectedTime: formData.selectedTime,
      selectedTimeLocal: formData.selectedTimeLocal,
      userTimeZone,
    };

    onSubmit?.(finalPayload);
  }, [formData, isTimeSlotBooked, onSubmit, userTimeZone]);

  const renderSlots = useCallback(
    (slots: TimeSlot[], title: string) => {
      if (!slots.length) return null;
      return (
        <div>
          <h4
            className="text-sm font-medium mb-3"
            style={{ color: "var(--gray-2)" }}
          >
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
                  className={`h-12 flex items-center justify-center text-center rounded-xl transition-all ${
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
                  <div className="flex flex-col items-center justify-center w-full">
                    <span className="text-sm font-medium text-center w-full">
                      {slot.time}
                      <span className="hidden sm:inline">
                        {" "}
                        {" — "}{" "}
                        {formData.selectedDate
                          ? format(formData.selectedDate, "EEEE, MMMM dd, yyyy")
                          : ""}
                      </span>
                      <span className="inline sm:hidden text-xs opacity-70">
                        {" "}
                        {" — "}{" "}
                        {formData.selectedDate
                          ? format(formData.selectedDate, "MMM dd, yyyy")
                          : ""}
                      </span>
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
    [formData.selectedTime, handleTimeSelect, formData.selectedDate]
  );

  return (
    <div className="space-y-8 px-2 sm:px-0 h-full">
      {/* Collapsible */}
      <Collapsible
        open={isConsultationOpen}
        onOpenChange={setIsConsultationOpen}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border overflow-hidden"
          style={{
            backgroundColor: "var(--black-5)",
            borderColor: "var(--black-6)",
          }}
        >
          <CollapsibleTrigger className="w-full p-4 sm:p-6 flex justify-between">
            <h4
              className="font-semibold flex items-center"
              style={{ color: "var(--white)" }}
            >
              <Users
                className="w-5 h-5 mr-2"
                style={{ color: "var(--primary)" }}
              />{" "}
              What to Expect
            </h4>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isConsultationOpen ? "rotate-180" : ""
              }`}
              style={{ color: "var(--primary)" }}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 grid sm:grid-cols-3 gap-3">
              {[
                {
                  icon: MessageSquare,
                  title: "Detailed Discussion",
                  text: "Review your requirements and shipping options.",
                },
                {
                  icon: CheckCircle,
                  title: "Custom Quote",
                  text: "Receive personalized pricing recommendations.",
                },
                {
                  icon: CalendarDays,
                  title: "Timeline Planning",
                  text: "Set shipment dates and next steps clearly.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-xl p-3 sm:p-4"
                  style={{ backgroundColor: "var(--black-6)" }}
                >
                  <Icon
                    className="w-5 h-5 mb-2"
                    style={{ color: "var(--primary)" }}
                  />
                  <h5
                    className="font-medium mb-1"
                    style={{ color: "var(--white)" }}
                  >
                    {title}
                  </h5>
                  <p
                    className="text-xs sm:text-sm"
                    style={{ color: "var(--gray-2)" }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </motion.div>
      </Collapsible>

      {/* Calendar & Time Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
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
            />{" "}
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
                style={{ backgroundColor: "transparent" }}
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
                    {format(formData.selectedDate!, "EEEE, MMMM dd, yyyy")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {(!isMobile || showTimeSection) && (
          <motion.div
            ref={timeSectionRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
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
              />{" "}
              Select a Time{" "}
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

                {!isLoadingSlots && !slotsError && (
                  <>
                    <div
                      className="p-3 rounded-xl text-sm"
                      style={{
                        backgroundColor: "var(--primary2)",
                        color: "var(--black)",
                      }}
                    >
                      ⏰ All times are shown in your local timezone:{" "}
                      <strong>{userTimeZone}</strong>
                    </div>
                    {renderSlots(morningSlots, "Morning")}
                    {renderSlots(eveningSlots, "Evening")}

                    <div className="mt-4 text-center">
                      {bookedSlots.length > 0 && (
                        <div
                          className="text-xs p-2 rounded-xl"
                          style={{
                            color: "#ff4444",
                            backgroundColor: "rgba(255,68,68,0.1)",
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

      {/* Submit */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-0 pt-4 sm:pt-8">
        <Button
          onClick={handleFinalSubmit}
          disabled={
            !formData.selectedDate || !formData.selectedTime || isSubmitting
          }
          className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-lg w-full sm:w-auto rounded-xl"
          style={{ backgroundColor: "var(--primary2)", color: "var(--black)" }}
        >
          {isSubmitting ? (
            "Scheduling..."
          ) : (
            <>
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Confirm Meeting
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookingStep;
