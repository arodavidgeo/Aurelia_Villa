import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { useBooking } from '../../context/BookingContext';
import { PROPERTY } from '../../content/property';
import {
  submitEnquiry,
  validateEnquiryForm,
  ValidationErrors,
} from '../../services/enquiryService';

export const ContactSection: React.FC = () => {
  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    guests,
    setGuests,
    purposeOfVisit,
    setPurposeOfVisit,
    setConfirmationModalData,
  } = useBooking();

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setSubmittedSuccess(false);

    const currentData = {
      fullName,
      phone,
      email,
      checkInDate,
      checkOutDate,
      guests,
      purposeOfVisit,
      message,
    };

    const clientErrors = validateEnquiryForm(currentData);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await submitEnquiry(currentData, honeypot);
      if (res.success) {
        setSubmittedSuccess(true);
        setConfirmationModalData({
          referenceId: res.referenceId,
          enquiry: currentData,
        });

        // Reset inputs
        setFullName('');
        setPhone('');
        setEmail('');
        setMessage('');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError(
          'An issue occurred while sending your enquiry. Please retry or contact us directly via Phone or WhatsApp.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build prefilled WhatsApp message from current form inputs
  const buildWhatsAppFromForm = () => {
    const text = `Hello Villa Aurelia, I would like to enquire about staying at the villa in Tirunelveli (₹7,500 / 24 Hours).
Name: ${fullName || 'Guest'}
Dates: ${checkInDate || 'To be decided'} to ${checkOutDate || 'To be decided'}
Guests: ${guests}
Purpose: ${purposeOfVisit}
Message: ${message || 'Please let me know availability.'}`;

    return `https://wa.me/${PROPERTY.phoneRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 border-t border-theme-border/40 overflow-hidden font-sans">
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
          CONTACT & BOOKING ENQUIRY
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] text-theme-text-primary font-normal leading-tight mb-3">
                Send an Availability Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed mb-6 max-w-md">
                Reach out to reserve the entire private villa. Our reservations manager directly verifies room availability and assists with your visit.
              </p>

              {/* Package Banner */}
              <div className="mb-8 p-4 bg-theme-surface border border-theme-border">
                <span className="text-[10px] uppercase tracking-widest text-theme-accent font-medium block">
                  Exclusive Stay Rate
                </span>
                <span className="font-serif text-2xl sm:text-3xl text-theme-text-primary font-normal block mt-1">
                  {PROPERTY.priceDisplay} / 24 Hours
                </span>
                <p className="text-xs text-theme-text-secondary mt-1">
                  Villa Aurelia is offered as an entire private house. Booking enquiries are subject to availability and confirmation by the property.
                </p>
              </div>

              {/* Contact Rows */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-theme-surface border border-theme-border text-theme-accent shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-theme-text-primary font-medium">
                      Direct Phone
                    </h3>
                    <a
                      href={PROPERTY.phoneTel}
                      className="text-xs text-theme-text-secondary hover:text-theme-accent transition-colors block"
                    >
                      {PROPERTY.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-theme-surface border border-theme-border text-theme-accent shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-theme-text-primary font-medium">
                      WhatsApp Chat
                    </h3>
                    <a
                      href={PROPERTY.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-theme-text-secondary hover:text-theme-accent transition-colors block underline underline-offset-2"
                    >
                      Chat with reservations concierge
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-theme-surface border border-theme-border text-theme-accent shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-theme-text-primary font-medium">
                      Email
                    </h3>
                    <a
                      href="mailto:info@villaaurelia.com"
                      className="text-xs text-theme-text-secondary hover:text-theme-accent transition-colors block"
                    >
                      info@villaaurelia.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-theme-surface border border-theme-border text-theme-accent shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-theme-text-primary font-medium">
                      Villa Address
                    </h3>
                    <p className="text-xs text-theme-text-secondary leading-relaxed">
                      {PROPERTY.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7 bg-theme-surface border border-theme-border p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-theme-text-primary font-medium mb-1">
              Villa Reservation Enquiry
            </h3>
            <p className="text-xs text-theme-text-secondary mb-5">
              Complete the details below to check availability for your preferred stay dates.
            </p>

            {submittedSuccess && (
              <div className="p-4 mb-5 bg-[#FAF5EE] dark:bg-theme-surface border border-theme-accent/60 text-xs text-theme-text-primary flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-theme-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-theme-text-primary">
                    Thank you. Your enquiry has been received. The property will contact you to confirm availability.
                  </p>
                  <p className="text-theme-text-secondary mt-1">
                    You may also message us immediately on WhatsApp for instant coordination.
                  </p>
                </div>
              </div>
            )}

            {serverError && (
              <div className="p-4 mb-5 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href={PROPERTY.phoneTel}
                    className="underline text-theme-text-primary font-medium"
                  >
                    Call: {PROPERTY.phoneDisplay}
                  </a>
                  <span>•</span>
                  <a
                    href={PROPERTY.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-theme-text-primary font-medium"
                  >
                    Send via WhatsApp
                  </a>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs font-sans">
              {/* Honeypot field for bot protection */}
              <input
                type="text"
                name="villa_security_trap"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="sr-only"
                aria-hidden="true"
              />

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                  >
                    Guest Name *
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    aria-describedby={errors.fullName ? 'name-error' : undefined}
                    className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-theme-border'
                    }`}
                  />
                  {errors.fullName && (
                    <span id="name-error" className="text-[10px] text-red-500 mt-0.5 block">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                  >
                    Phone Number (10 Digits) *
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-theme-border'
                    }`}
                  />
                  {errors.phone && (
                    <span id="phone-error" className="text-[10px] text-red-500 mt-0.5 block">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Email & Purpose */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="enquiry-email"
                    className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-theme-border'
                    }`}
                  />
                  {errors.email && (
                    <span id="email-error" className="text-[10px] text-red-500 mt-0.5 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enquiry-purpose"
                    className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                  >
                    Purpose of Visit *
                  </label>
                  <select
                    id="enquiry-purpose"
                    value={purposeOfVisit}
                    onChange={(e) => setPurposeOfVisit(e.target.value)}
                    className="w-full bg-theme-bg dark:bg-theme-surface-raised border border-theme-border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors"
                  >
                    <option value="Family Stay">Family Stay</option>
                    <option value="Friends Gathering">Friends Gathering</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Private Function">Private Function</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label
                    htmlFor="contact-checkin"
                    className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                  >
                    Check-in Date *
                  </label>
                  <input
                    id="contact-checkin"
                    type="date"
                    min={todayStr}
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    aria-describedby={errors.checkInDate ? 'checkin-error' : undefined}
                    className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors ${
                      errors.checkInDate ? 'border-red-500' : 'border-theme-border'
                    }`}
                  />
                  {errors.checkInDate && (
                    <span id="checkin-error" className="text-[10px] text-red-500 mt-0.5 block">
                      {errors.checkInDate}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-checkout"
                    className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                  >
                    Check-out Date *
                  </label>
                  <input
                    id="contact-checkout"
                    type="date"
                    min={checkInDate || todayStr}
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    aria-describedby={errors.checkOutDate ? 'checkout-error' : undefined}
                    className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors ${
                      errors.checkOutDate ? 'border-red-500' : 'border-theme-border'
                    }`}
                  />
                  {errors.checkOutDate && (
                    <span id="checkout-error" className="text-[10px] text-red-500 mt-0.5 block">
                      {errors.checkOutDate}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-guests"
                    className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                  >
                    Number of Guests *
                  </label>
                  <select
                    id="contact-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-theme-bg dark:bg-theme-surface-raised border border-theme-border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={6}>6 Guests</option>
                    <option value={8}>8 Guests</option>
                    <option value={10}>10+ Guests (Please specify below)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                >
                  Additional Message or Group Details (Optional)
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  maxLength={500}
                  placeholder="Tell us about your group, preferred arrival timings, or event requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-theme-bg dark:bg-theme-surface-raised border border-theme-border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3 bg-theme-accent hover:bg-theme-accent-strong disabled:opacity-60 text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Availability Enquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <a
                  href={buildWhatsAppFromForm()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-3 border border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-theme-bg text-xs font-sans tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send On WhatsApp</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
