import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, Loader2, AlertCircle } from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { useBooking } from '../../context/BookingContext';
import { PROPERTY } from '../../content/property';
import {
  submitEnquiry,
  validateEnquiryForm,
  ValidationErrors,
} from '../../services/enquiryService';
import { EnquiryThankYouScreen } from './EnquiryThankYouScreen';
import { EnquiryForWhatsApp } from '../../utils/whatsappMessage';

const SESSION_STORAGE_KEY = 'va_pending_whatsapp_enquiry';

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
  } = useBooking();

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');

  // Persist / restore submitted enquiry across reloads
  const [submittedEnquiry, setSubmittedEnquiry] = useState<EnquiryForWhatsApp | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const currentData = {
      fullName,
      phone,
      email: email || '',
      checkInDate,
      checkOutDate,
      guests: Number(guests) || 1,
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

    // Save to sessionStorage immediately so reload persists the thank-you screen
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentData));
    } catch (err) {
      console.warn('sessionStorage write error:', err);
    }

    // Optional background record persistence per Section 3 (never blocks WhatsApp step)
    try {
      await submitEnquiry(currentData, honeypot);
    } catch (err) {
      console.warn('Database record optional fallback:', err);
    } finally {
      setIsSubmitting(false);
      // Switch view to thank-you and WhatsApp handoff screen
      setSubmittedEnquiry(currentData);
    }
  };

  const handleEditDetails = () => {
    setSubmittedEnquiry(null);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {}
  };

  const handleStartNewEnquiry = () => {
    setSubmittedEnquiry(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {}
  };

  return (
    <section id="contact" className="relative py-10 sm:py-14 border-t border-theme-border/40 overflow-hidden font-sans">
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
          CONTACT & BOOKING ENQUIRY
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] text-theme-text-primary font-normal leading-tight mb-3">
                Send an Availability Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed mb-6 max-w-md">
                Reach out to reserve the entire private villa. Fill in your dates and requirements, then send them to the owner on WhatsApp to confirm availability.
              </p>

              {/* Package Banner */}
              <div className="mb-5 p-4 bg-theme-surface border border-theme-border">
                <span className="text-[10px] uppercase tracking-widest text-theme-accent font-medium block">
                  Exclusive Stay Rate
                </span>
                <span className="font-serif text-2xl sm:text-3xl text-theme-text-primary font-normal block mt-1">
                  {PROPERTY.priceDisplay} / 24 Hours
                </span>
                <p className="text-xs text-theme-text-secondary mt-1">
                  Villa Aurelia is offered as an entire private house. Booking enquiries are subject to availability and confirmation by the property. After you submit, you will send your details to the owner on WhatsApp.
                </p>
              </div>

              {/* Contact Rows */}
              <div className="space-y-3 mb-5">
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
                      className="text-xs text-theme-text-secondary hover:text-theme-accent font-mono transition-colors block"
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
                      Chat with villa owner
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
                      href="mailto:contact@villaaurelia.com"
                      className="text-xs text-theme-text-secondary hover:text-theme-accent transition-colors block"
                    >
                      contact@villaaurelia.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-theme-surface border border-theme-border text-theme-accent shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-theme-text-primary font-medium">
                      Location
                    </h3>
                    <p className="text-xs text-theme-text-secondary leading-relaxed">
                      {PROPERTY.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Directions Link */}
            <div className="pt-2">
              <a
                href={PROPERTY.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-theme-accent hover:underline underline-offset-4 flex items-center gap-1.5"
              >
                <span>Get Driving Directions to VM Chatram</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Reservation Enquiry Form OR Thank-You Send Screen */}
          <div className="lg:col-span-7">
            {submittedEnquiry ? (
              <EnquiryThankYouScreen
                enquiry={submittedEnquiry}
                onEditDetails={handleEditDetails}
                onStartNewEnquiry={handleStartNewEnquiry}
              />
            ) : (
              <div className="bg-theme-surface border border-theme-border p-5 sm:p-7 shadow-sm">
                <h3 className="font-serif text-xl sm:text-2xl text-theme-text-primary mb-1">
                  Availability Enquiry Form
                </h3>
                <p className="text-xs text-theme-text-secondary mb-5">
                  Complete the details below to check availability for your preferred stay dates. After you submit, you will send your details to the owner on WhatsApp.
                </p>

                {serverError && (
                  <div className="p-4 mb-5 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{serverError}</span>
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

                  {/* Row 1: Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="enquiry-name"
                        className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="enquiry-name"
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary outline-none transition-colors ${
                          errors.fullName
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-theme-border focus:border-theme-accent'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-phone"
                        className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                      >
                        Phone Number (10 Digits) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary outline-none transition-colors font-mono ${
                          errors.phone
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-theme-border focus:border-theme-accent'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email & Purpose */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="enquiry-email"
                        className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="enquiry-email"
                        type="email"
                        required
                        placeholder="e.g. ramesh@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-theme-border focus:border-theme-accent'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-purpose"
                        className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                      >
                        Purpose of Visit <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="contact-purpose"
                        value={purposeOfVisit}
                        onChange={(e) => setPurposeOfVisit(e.target.value)}
                        className="w-full bg-theme-bg dark:bg-theme-surface-raised border border-theme-border px-3 py-2 text-theme-text-primary focus:border-theme-accent outline-none transition-colors"
                      >
                        <option value="Family Stay">Family Stay / Vacation</option>
                        <option value="Birthday Celebration">Birthday / Anniversary Gathering</option>
                        <option value="Temple Visit / Tourism">Temple Visit / Tirunelveli Tourism</option>
                        <option value="Corporate / Professional">Corporate / Business Trip</option>
                        <option value="Wedding Attendance">Attending Family Wedding</option>
                        <option value="Other">Other Private Stay</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Check-in, Check-out, Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="contact-checkin"
                        className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                      >
                        Check-in Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-checkin"
                        type="date"
                        min={todayStr}
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary outline-none transition-colors ${
                          errors.checkInDate
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-theme-border focus:border-theme-accent'
                        }`}
                      />
                      {errors.checkInDate && (
                        <p className="text-red-500 text-[11px] mt-1">{errors.checkInDate}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-checkout"
                        className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                      >
                        Check-out Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-checkout"
                        type="date"
                        min={checkInDate || todayStr}
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className={`w-full bg-theme-bg dark:bg-theme-surface-raised border px-3 py-2 text-theme-text-primary outline-none transition-colors ${
                          errors.checkOutDate
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-theme-border focus:border-theme-accent'
                        }`}
                      />
                      {errors.checkOutDate && (
                        <p className="text-red-500 text-[11px] mt-1">{errors.checkOutDate}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-guests"
                        className="block text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1"
                      >
                        Guests <span className="text-red-500">*</span>
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
                      Additional Message or Group Details (Optional, max 500 characters)
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
                    <div className="flex justify-between items-center text-[10px] text-theme-text-secondary mt-0.5">
                      <span>Will be included in the WhatsApp message to the owner</span>
                      <span>{message.length}/500</span>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-theme-accent hover:bg-theme-accent-strong disabled:opacity-60 text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Preparing WhatsApp Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Availability Enquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-theme-text-secondary text-center mt-2 font-sans italic">
                      After submitting, you will be taken to Step 2 to send your details to the owner on WhatsApp.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
