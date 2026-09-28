/**
 * @file src/pages/ContactPage.tsx
 * Contact details, business hours, interactive contact form with instant feedback,
 * and stylized location / directions guide.
 */

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending form message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-14">
      
      {/* 1. Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
          Get In Touch
        </span>
        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2C1810] tracking-tight">
          We&apos;d Love to Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-[#7C5A43] leading-relaxed">
          Have a question about our roasts, want to reserve a table for a book club, or inquire about party catering? Drop us a note!
        </p>
      </div>

      {/* 2. Contact Details & Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DECf] shadow-xs space-y-6">
            <h3 className="font-serif-display text-xl font-bold text-[#2C1810]">
              Café Information
            </h3>

            <div className="space-y-5 text-xs text-[#5C4033]">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0E6] text-[#8C5E38] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C1810]">Visit Us</h4>
                  <p className="mt-0.5 leading-relaxed">{CAFE_INFO.address}</p>
                  <p className="text-[11px] text-[#8C5E38] mt-0.5">({CAFE_INFO.landmark})</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0E6] text-[#8C5E38] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C1810]">Direct Call / WhatsApp</h4>
                  <p className="mt-0.5">{CAFE_INFO.phone}</p>
                  <p className="text-[11px] text-[#8C6D56]">Lines open during café operating hours</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0E6] text-[#8C5E38] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C1810]">Email Us</h4>
                  <p className="mt-0.5">{CAFE_INFO.email}</p>
                  <p className="text-[11px] text-[#8C6D56]">We usually respond within 4 business hours</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0E6] text-[#8C5E38] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C1810]">Operating Hours</h4>
                  <p className="mt-0.5">{CAFE_INFO.hours.weekdays}</p>
                  <p className="mt-0.5">{CAFE_INFO.hours.weekends}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-[#8C6D56]">
              <span>Follow our daily roast updates:</span>
              <span className="font-semibold text-[#3E2312] hover:underline cursor-pointer">
                {CAFE_INFO.socials.instagram}
              </span>
            </div>
          </div>

          {/* Quick FAQ / Note */}
          <div className="bg-[#FAF0E6] rounded-2xl p-5 border border-[#E8DECf] text-xs text-[#6B5A4E]">
            <p className="font-semibold text-[#2C1810] mb-1">Planning a large group or party?</p>
            <p>We accept private table reservations for groups of 6 or more. Please call us at least 24 hours in advance.</p>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DECf] shadow-xs">
            
            <div className="flex items-center gap-2 mb-6 text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
              <MessageSquare className="w-4 h-4" />
              <span>Send A Direct Message</span>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EBF3ED] text-[#3E6B48] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#2C1810]">
                  Message Received!
                </h3>
                <p className="text-xs text-[#6B5A4E] max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Our team will review your inquiry and get back to you shortly at your provided email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#3E2312] text-white text-xs font-semibold rounded-xl hover:bg-[#2C1810] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5C4033] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl text-xs text-[#2C1810] placeholder:text-[#A98E7B] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C4033] mb-1">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl text-xs text-[#2C1810] placeholder:text-[#A98E7B] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5C4033] mb-1">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl text-xs text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Table Reservation">Table Reservation (6+ guests)</option>
                    <option value="Event / Catering">Event / Workshop / Catering</option>
                    <option value="Coffee Beans Bulk Order">Specialty Coffee Beans Wholesale</option>
                    <option value="Feedback">Feedback & Suggestions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5C4033] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you have in mind..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl text-xs text-[#2C1810] placeholder:text-[#A98E7B] focus:outline-none focus:ring-1 focus:ring-[#8C5E38]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3 bg-[#3E2312] text-[#FFF8F0] font-semibold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:bg-[#2C1810] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 focus:outline-none"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5 text-[#E0A96D]" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* 3. Stylized Embedded Map Placeholder */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DECf] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif-display text-xl font-bold text-[#2C1810]">
              Find Bean & Brew on the Map
            </h3>
            <p className="text-xs text-[#7C5A43] mt-0.5">
              Conveniently located on 100 Feet Road, Indiranagar with dedicated two-wheeler and valet car parking.
            </p>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C5E38] hover:text-[#5C341D] self-start sm:self-auto"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Map visualization canvas / placeholder */}
        <div className="relative aspect-[21/9] min-h-[260px] rounded-2xl bg-[#EFE6DC] overflow-hidden border border-[#E2D6C5] flex items-center justify-center p-6 text-center">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(#3E2312 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className="relative z-10 max-w-sm bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-md border border-[#E8DECf] text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#3E2312] text-[#E0A96D] flex items-center justify-center mx-auto shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-serif-display text-base font-bold text-[#2C1810]">
              {CAFE_INFO.name}
            </h4>
            <p className="text-xs text-[#5C4033] leading-relaxed">
              {CAFE_INFO.address}
            </p>
            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#8C6D56]">
              <span>Metro: Indiranagar Station</span>
              <span>·</span>
              <span>Exit 2</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
