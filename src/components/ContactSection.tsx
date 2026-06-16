"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

interface FloatingFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
}

function FloatingField({
  label,
  type = "text",
  value,
  onChange,
  required,
  as = "input",
  rows = 4,
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || value.length > 0;

  return (
    <div className="relative pb-px group">
      {/* Floating Label */}
      <motion.label
        animate={{
          y: isFloated ? -20 : 0,
          scale: isFloated ? 0.75 : 1,
          color: focused ? "#B8975A" : "#6B6B6B",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-3 text-sm font-sans font-light origin-left pointer-events-none"
        style={{ transformOrigin: "left center" }}
      >
        {label}
      </motion.label>

      {/* Input / Textarea */}
      {as === "textarea" ? (
        <textarea
          required={required}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="block w-full bg-transparent border-none outline-none resize-none text-sm font-sans font-light text-[#111111] pt-6 pb-2 focus:ring-0"
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="block w-full bg-transparent border-none outline-none text-sm font-sans font-light text-[#111111] pt-6 pb-2 focus:ring-0"
        />
      )}

      {/* Baseline border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E8E8E8]" />

      {/* Active gold sweep underline — expands from centre */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-[#B8975A] origin-center"
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  );
}

const contactPoints = [
  {
    Icon: Phone,
    label: "General Inquiries",
    value: "+91 22 4972 3890",
  },
  {
    Icon: Mail,
    label: "Corporate Office",
    value: "consult@arsv.com",
  },
];

const locations = [
  {
    city: "Mumbai Studio",
    address: "402, Signature Towers, G-Block, Bandra Kurla Complex, Mumbai — 400051",
  },
  {
    city: "New Delhi Studio",
    address: "18, Amrita Shergil Marg, New Delhi — 110003",
  },
];

const projectTypes = [
  "Bespoke Residential Villa",
  "Commercial & Headquarters",
  "Hospitality & Luxury Resorts",
  "Cultural & Public Landmarks",
  "Ultra-Modern Interior Design",
  "Directional Vastu Consultation",
  "Bespoke Space Planning",
  "Landscaping",
  "Town Planning",
  "Building Liaisoning",
  "Turnkey Solutions",
  "Furniture & Art Curation",
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: projectTypes[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", projectType: projectTypes[0], message: "" });
    }, 5000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-[#FFFFFF] py-28 md:py-40 px-6 md:px-16 border-t border-[#E8E8E8] overflow-hidden"
    >
      {/* Faint ambient grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 border-r border-[#E8E8E8]/40"
            style={{ left: `${(i + 1) * 20}%` }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-28 items-start relative z-10">

        {/* Left — Contact intelligence */}
        <div className="lg:col-span-5 space-y-14">
          <div className="space-y-5">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#B8975A] font-semibold">
              Begin Your Journey
            </span>
            <h2 className="font-serif text-5xl md:text-7xl font-light text-[#111111] leading-[1.05]">
              Let&apos;s Build Your Vision
            </h2>
            <p className="text-[15px] text-[#6B6B6B] leading-relaxed font-sans font-light max-w-md">
              Whether you are looking to design a legacy villa, a commercial headquarters, a luxury resort, or align spaces with directional energy grids, our senior architectural consultants are ready to outline your vision.
            </p>
          </div>

          {/* Contact Points */}
          <div className="space-y-8 pt-6 border-t border-[#E8E8E8]">
            {contactPoints.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start space-x-5">
                <div className="mt-0.5 p-2.5 border border-[#E8E8E8] shrink-0 bg-[#FFFFFF]">
                  <Icon className="w-3.5 h-3.5 stroke-[1.25px] text-[#B8975A]" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8975A] font-semibold block mb-1">
                    {label}
                  </span>
                  <span className="text-[15px] text-[#111111] font-sans font-light hover:text-[#B8975A] cursor-pointer transition-colors duration-300 block">
                    {value}
                  </span>
                </div>
              </div>
            ))}

            {/* Locations */}
            <div className="flex items-start space-x-5">
              <div className="mt-0.5 p-2.5 border border-[#E8E8E8] shrink-0 bg-[#FFFFFF]">
                <MapPin className="w-3.5 h-3.5 stroke-[1.25px] text-[#B8975A]" />
              </div>
              <div className="space-y-5">
                {locations.map(({ city, address }) => (
                  <div key={city}>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8975A] font-semibold block mb-1">
                      {city}
                    </span>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed max-w-xs font-sans font-light">
                      {address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Luxury Booking Form */}
        <div className="lg:col-span-7 relative">

          {/* Success State */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center space-y-6 py-24"
              >
                {/* Animated checkmark frame */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-20 h-20 border border-[#E8E8E8] flex items-center justify-center bg-[#FFFFFF]"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-serif text-3xl text-[#B8975A]"
                  >
                    &#10003;
                  </motion.span>
                </motion.div>
                <h3 className="font-serif text-3xl text-[#111111] font-light">
                  Submission Received
                </h3>
                <p className="text-xs text-[#6B6B6B] max-w-sm leading-relaxed font-sans font-light">
                  Thank you for reaching out to ARSV. A senior architectural consultant will contact you within 24 hours to schedule a private consultation.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-10"
              >
                {/* Form Header */}
                <div className="border-b border-[#E8E8E8] pb-6">
                  <h3 className="font-serif text-3xl text-[#111111] font-light">
                    Reservation Detail
                  </h3>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8975A] block mt-2">
                    Bespoke architecture and Vastu spatial alignment
                  </span>
                </div>

                {/* Two column name + email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <FloatingField
                    label="Full Name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    required
                  />
                  <FloatingField
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    required
                  />
                </div>

                {/* Project type custom select */}
                <div className="relative pb-px group">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8975A] font-semibold block mb-3">
                    Interest Area
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({ ...form, projectType: type })}
                        className={`text-left text-[11px] font-sans font-light px-4 py-3 border transition-all duration-400 ${
                          form.projectType === type
                            ? "border-[#B8975A] text-[#B8975A] bg-[#B8975A]/5"
                            : "border-[#E8E8E8] text-[#6B6B6B] hover:border-[#B8975A]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <FloatingField
                  label="Brief Overview of Vision"
                  as="textarea"
                  rows={5}
                  value={form.message}
                  onChange={(v) => setForm({ ...form, message: v })}
                  required
                />

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ gap: "1.25rem" }}
                  className="group flex items-center gap-4 pt-4"
                >
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#111111] transition-colors duration-300 group-hover:text-[#B8975A]">
                    Send Consultation Request
                  </span>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-10 h-10 border border-[#E8E8E8] flex items-center justify-center group-hover:border-[#111111] group-hover:bg-[#111111] transition-colors duration-500 bg-[#FFFFFF]"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[1.25px] text-[#B8975A] group-hover:text-[#FFFFFF] transition-colors duration-300" />
                  </motion.div>
                </motion.button>

              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
