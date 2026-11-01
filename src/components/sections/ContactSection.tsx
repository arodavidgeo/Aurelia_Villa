import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, Clock, Send, Loader2, AlertCircle } from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { useBooking } from '../../context/BookingContext';
import { submitEnquiry, validateEnquiry, ValidationErrors } from '../../services/enquiryService';

export const ContactSection: React.FC = () => {
  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    guests,
    setGuests,
    preferredRoom,
    setPreferredRoom,
    setConfirmationModalData,
  } = useBooking();

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const currentData = {
      fullName,
      email,
      phone,
      checkInDate,
      checkOutDate,
      guests,
      preferredRoom,
      message,
    };

    const clientErrors = validateEnquiry(currentData);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await submitEnquiry(currentData, honeypot);
      if (res.success) {
        setConfirmationModalData({
          referenceId: res.referenceId,
          enquiry: currentData,
        });

        // Reset inputs
        setFullName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('Something went wrong submitting your enquiry. Please retry or contact us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = import.meta.env.VITE_PROPERTY_WHATSAPP || '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Villa Aurelia, I would like to enquire about a stay.'
  )}`;

  return (
    <section id="contact" className="relative py-16 sm:py-20 border-t border-theme-border/40 overflow-hidden">
      {/* Botanical detail in top right whitespace */}
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Eyebrow */}
        <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
          CONTACT & ENQUIRIES
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Information (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] text-theme-text-primary font-normal leading-tight mb-3">
                We’d love to hear from you
              </h2>
              <p className="text-xs sm:text-sm text-theme-text-secondary font-sans leading-relaxed mb-8 max-w-md">
                Have a question or a special request? Get in touch and we’ll be happy to assist you.
              </p>

              {/* 4 Contact Rows with Gold Line Icons */}
              <div className="space-y-5 mb-8">
                {/* Call Us */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-theme-surface border border-theme-border text-theme-accent shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-wider text-theme-text-primary font-medium">
                      Call Us
                    </h3>
                    <a
                      href="tel:+919876543210"
                      className="text-xs text-theme-text-secondary hover:text-theme-accent transition-colors font-sans"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-theme-surface border border-theme-border text-theme-accent shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-wider text-theme-text-primary font-medium">
                      WhatsApp
                    </h3>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-theme-text-secondary hover:text-theme-accent transition-colors font-sans underline underline-offset-2"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-theme-surface border border-theme-border text-theme-accent shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-wider text-theme-text-primary font-medium">
                      Email
                    </h3>
                    <a
                      href="mailto:info@villaaurelia.com"
                      className="text-xs text-theme-text-secondary hover:text-theme-accent transition-colors font-sans"
                    >
                      info@villaaurelia.com
                    </a>
                  </div>
                </div>

                {/* Our Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-theme-surface border border-theme-border text-theme-accent shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-wider text-theme-text-primary font-medium">
                      Our Hours
                    </h3>
                    <p className="text-xs text-theme-text-secondary font-sans">
                      Mon - Sun, 8:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note on Real-time Booking vs Availability Enquiry */}
            <div className="p-3.5 bg-theme-surface border border-theme-border/60 text-[11px] text-theme-text-secondary leading-relaxed font-sans">
              <span className="text-theme-accent font-medium uppercase tracking-wider block mb-0.5">
                Note on Reservations
              </span>
              All submissions are processed directly as personal availability enquiries. Our dedicated villa concierge confirms custom rates and guest arrangements prior to final confirmation.
            </div>
          </div>

          {/* Right Column: Send an Enquiry Form + Decorative Vase (7 cols) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-6 items-stretch">
            {/* Form Container */}
            <div className="flex-1 bg-theme-surface border border-theme-border p-6 sm:p-7 shadow-sm">
              <h3 className="font-serif text-2xl text-theme-text-primary font-medium mb-5">
                Send an Enquiry
              </h3>

              {serverError && (
                <div className="p-3 mb-4 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4 font-sans text-xs">
                {/* Honeypot field for anti-spam */}
                <input
                  type="text"
                  name="villa_honeypot_field"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                    >
                      Name *
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      placeholder="Your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-theme-border'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[10px] text-red-500 mt-0.5 block">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-email"
                      className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                    >
                      Email *
                    </label>
                    <input
                      id="enquiry-email"
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-theme-border'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-500 mt-0.5 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone & Check-in Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-theme-border'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-red-500 mt-0.5 block">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-checkin"
                      className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                    >
                      Check-in Date *
                    </label>
                    <input
                      id="enquiry-checkin"
                      type="date"
                      min={todayStr}
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors ${
                        errors.checkInDate ? 'border-red-500' : 'border-theme-border'
                      }`}
                    />
                    {errors.checkInDate && (
                      <span className="text-[10px] text-red-500 mt-0.5 block">
                        {errors.checkInDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Check-out Date & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="enquiry-checkout"
                      className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                    >
                      Check-out Date *
                    </label>
                    <input
                      id="enquiry-checkout"
                      type="date"
                      min={checkInDate || todayStr}
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors ${
                        errors.checkOutDate ? 'border-red-500' : 'border-theme-border'
                      }`}
                    />
                    {errors.checkOutDate && (
                      <span className="text-[10px] text-red-500 mt-0.5 block">
                        {errors.checkOutDate}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-guests"
                      className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                    >
                      Guests *
                    </label>
                    <select
                      id="enquiry-guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-theme-bg dark:bg-theme-surface-raised border border-theme-border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5 Guests</option>
                      <option value={6}>6 Guests</option>
                      <option value={8}>8+ Guests (Full Villa Enquiry)</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Room */}
                <div>
                  <label
                    htmlFor="enquiry-room"
                    className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                  >
                    Preferred Room *
                  </label>
                  <select
                    id="enquiry-room"
                    value={preferredRoom}
                    onChange={(e) => setPreferredRoom(e.target.value)}
                    className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors ${
                      errors.preferredRoom ? 'border-red-500' : 'border-theme-border'
                    }`}
                  >
                    <option value="">Select room category</option>
                    <option value="Deluxe Room">Deluxe Room (₹4,500 / night)</option>
                    <option value="Premium Room">Premium Room (₹5,500 / night)</option>
                    <option value="Family Suite">Family Suite (₹8,500 / night)</option>
                    <option value="Entire Villa Booking">Entire Private Villa (Exclusive)</option>
                  </select>
                  {errors.preferredRoom && (
                    <span className="text-[10px] text-red-500 mt-0.5 block">
                      {errors.preferredRoom}
                    </span>
                  )}
                </div>

                {/* Message (Optional) */}
                <div>
                  <label
                    htmlFor="enquiry-message"
                    className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={3}
                    placeholder="Tell us about your stay or any special requests..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-theme-bg dark:bg-theme-surface-raised border border-theme-border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors resize-none"
                  />
                </div>

                {/* Primary Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-theme-accent hover:bg-theme-accent-strong disabled:opacity-60 text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-[0.18em] uppercase flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>TRANSMITTING ENQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND ENQUIRY</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Decorative Plant/Vase Image at far right (Visible on md+ screens) */}
            <div className="hidden sm:flex flex-col items-center justify-end w-20 shrink-0">
              <img
                src="/images/contact-vase.png"
                alt="Decorative terracotta vase and greenery"
                className="w-auto h-52 object-contain opacity-90 select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

