"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import type { FormData } from "../FreightForm";
import { format, addDays } from "date-fns";
import {
  CalendarDays,
  Clock,
  Video,
  CheckCircle,
  Users,
  MessageSquare,
} from "lucide-react";

interface StepSevenProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onPrev: () => void;
}

const StepSeven: React.FC<StepSevenProps> = ({
  formData,
  updateFormData,
  onPrev,
}) => {
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  const getDateRange = () => {
    const today = new Date();
    switch (formData.readyTime) {
      case "ready-now":
        return { from: today, to: addDays(today, 7) };
      case "1-2-weeks":
        return { from: addDays(today, 7), to: addDays(today, 14) };
      case "2-3-weeks":
        return { from: addDays(today, 14), to: addDays(today, 21) };
      case "1-month":
        return { from: addDays(today, 21), to: addDays(today, 30) };
      default:
        return { from: today, to: addDays(today, 30) };
    }
  };

  const timeSlots = [
    { time: "09:00 AM", label: "Morning", available: true },
    { time: "10:00 AM", label: "Morning", available: true },
    { time: "11:00 AM", label: "Late Morning", available: true },
    { time: "12:00 PM", label: "Noon", available: false },
    { time: "01:00 PM", label: "Afternoon", available: true },
    { time: "02:00 PM", label: "Afternoon", available: true },
    { time: "03:00 PM", label: "Late Afternoon", available: true },
    { time: "04:00 PM", label: "Late Afternoon", available: true },
    { time: "05:00 PM", label: "Evening", available: true },
  ];

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      updateFormData("selectedDate", date);
      setShowTimeSlots(true);
    }
  };

  const handleTimeSelect = (time: string) => {
    updateFormData("selectedTime", time);
  };

  const handleSubmit = () => {
    if (formData.selectedDate && formData.selectedTime) {
      const meetingDate = format(formData.selectedDate, "yyyy-MM-dd");
      const meetingTime = formData.selectedTime;
      const meetLink = `https://meet.google.com/new`;

      alert(
        `🎉 Consultation Meeting Scheduled Successfully!\n\n📅 Date: ${format(
          formData.selectedDate,
          "MMMM dd, yyyy"
        )}\n⏰ Time: ${meetingTime}\n💻 Platform: Google Meet\n🔗 Meeting Link: ${meetLink}\n\n✅ Confirmation email will be sent shortly.\n📋 Meeting agenda and preparation checklist will be provided.\n\nThank you for choosing our freight logistics services!`
      );
    }
  };

  const dateRange = getDateRange();

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex p-3 sm:p-4 rounded-2xl mb-3 sm:mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <Video className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Schedule Your Consultation Meeting
        </h3>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
          Meet with our freight logistics experts to finalize your shipping
          arrangements and answer any questions
        </p>
      </motion.div>

      {/* Meeting Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-purple-100"
      >
        <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-purple-600" />
          What to Expect in Your Consultation
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg p-3 sm:p-4">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mb-1 sm:mb-2" />
            <h5 className="font-medium text-gray-900 mb-1">
              Detailed Discussion
            </h5>
            <p className="text-xs sm:text-sm text-gray-600">
              Review your specific requirements and optimize shipping solutions
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mb-1 sm:mb-2" />
            <h5 className="font-medium text-gray-900 mb-1">Custom Quote</h5>
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
      </motion.div>

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
        <div className="flex justify-center overflow-x-auto">
          <div className="w-full max-w-sm mx-auto">
            <Calendar
              mode="single"
              selected={formData.selectedDate || undefined}
              onSelect={handleDateSelect}
              disabled={(date) =>
                date < dateRange.from ||
                date > dateRange.to ||
                date.getDay() === 0 ||
                date.getDay() === 6
              }
              className="rounded-md border-0 shadow-none w-full [&_.rdp]:w-full [&_.rdp-months]:justify-center [&_.rdp-month]:w-full [&_.rdp-table]:w-full [&_.rdp-cell]:p-1 [&_.rdp-cell]:sm:p-2 [&_.rdp-day]:h-8 [&_.rdp-day]:w-8 [&_.rdp-day]:sm:h-10 [&_.rdp-day]:sm:w-10 [&_.rdp-day]:text-sm [&_.rdp-day]:sm:text-base [&_.rdp-head_cell]:text-xs [&_.rdp-head_cell]:sm:text-sm [&_.rdp-head_cell]:p-1 [&_.rdp-head_cell]:sm:p-2"
            />
          </div>
        </div>
        <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-500">
          Available Monday - Friday • Business hours only
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
            {timeSlots.map((slot) => (
              <Button
                key={slot.time}
                variant={
                  formData.selectedTime === slot.time ? "default" : "outline"
                }
                disabled={!slot.available}
                className={`h-14 sm:h-16 flex flex-col items-center justify-center text-center min-w-0 ${
                  formData.selectedTime === slot.time
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                    : "hover:bg-blue-50 hover:border-blue-200"
                } ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => slot.available && handleTimeSelect(slot.time)}
              >
                <span className="text-sm sm:text-base font-medium leading-tight">
                  {slot.time}
                </span>
                <span className="text-xs opacity-80 leading-tight mt-0.5">
                  {slot.label}
                </span>
              </Button>
            ))}
          </div>
          <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-500">
            All times are in your local timezone • 30-minute meeting duration
          </div>
        </motion.div>
      )}

      {/* Meeting Summary */}
      {formData.selectedDate && formData.selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-4 sm:p-6 md:p-8"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:space-x-4">
            <div className="bg-green-500 rounded-full p-2 sm:p-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">
                Meeting Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-gray-900 mb-1 sm:mb-2">
                    Date & Time
                  </h4>
                  <p className="text-gray-700 font-medium text-sm sm:text-base">
                    {format(formData.selectedDate, "EEEE, MMMM dd, yyyy")}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {formData.selectedTime} (30 minutes)
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-gray-900 mb-1 sm:mb-2">
                    Meeting Details
                  </h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Google Meet Video Call
                  </p>
                  <p className="text-gray-600 text-sm">
                    Link will be provided via email
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-gray-900 mb-1 sm:mb-2">
                  Preparation Checklist
                </h4>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                  <li>
                    ✓ Have your cargo specifications and requirements ready
                  </li>
                  <li>
                    ✓ Prepare any specific questions about shipping routes or
                    timelines
                  </li>
                  <li>✓ Review your selected service options from this form</li>
                  <li>
                    ✓ Consider your budget range and any special requirements
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

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
          onClick={handleSubmit}
          disabled={!formData.selectedDate || !formData.selectedTime}
          className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg w-full sm:w-auto"
        >
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Confirm Meeting & Complete
        </Button>
      </div>
    </div>
  );
};

export default StepSeven;
