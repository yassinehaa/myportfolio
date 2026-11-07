import React, { useState } from 'react';
import { PORTFOLIO_OWNER } from '../data/portfolio-data';
import { Mail, Linkedin, Github, Send, Copy, Check, ArrowUpRight, MessageSquare, MapPin, Loader2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _honey: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_OWNER.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setFallbackMailto(null);

    // Bot honeypot check
    if (formData._honey) {
      setIsSubmitted(true);
      return;
    }

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim() || 'New Portfolio Inquiry';
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMessage('Please complete all required fields (Name, Email, Message).');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(PORTFOLIO_OWNER.email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          _replyto: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
          _subject: `[Portfolio Inquiry] ${trimmedName} — ${trimmedSubject}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (!data || data.success === 'true' || data.success === true || data.message)) {
        setIsSubmitted(true);
        setSubmittedEmail(trimmedEmail);
        setFormData({ name: '', email: '', subject: '', message: '', _honey: '' });
      } else {
        throw new Error(data?.message || 'Failed to dispatch message via mail service.');
      }
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      const mailtoUrl = `mailto:${PORTFOLIO_OWNER.email}?subject=${encodeURIComponent(
        `[Portfolio] ${trimmedSubject}`
      )}&body=${encodeURIComponent(
        `From: ${trimmedName} (${trimmedEmail})\n\nMessage:\n${trimmedMessage}`
      )}`;

      setErrorMessage(
        'Unable to send via automated delivery. You can click below to send directly using your personal email client:'
      );
      setFallbackMailto(mailtoUrl);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-14 reveal reveal-up">
          <div className="text-xs uppercase tracking-widest text-[#e32b3c] font-semibold mb-2">
            05. Initiation & Inquiries
          </div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#f2efeb]">
            Let’s Build Something Dependable Together
          </h2>
          <p className="text-sm text-[#a09c9a] mt-2 max-w-xl">
            Currently available for international software development roles, contract opportunities, and backend engineering collaborations.
          </p>
        </div>

        {/* 2-Column Split: Contact Channels + Functional Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Column 1: Direct Channels & Social Credentials */}
          <div className="lg:col-span-5 space-y-6 reveal reveal-left">
            {/* Direct Email Card with One-Click Copy */}
            <div className="p-6 bg-[#121212] border border-white/10 rounded-lg hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#a09c9a]">
                  Direct Electronic Mail
                </span>
                <Mail className="w-4 h-4 text-[#e32b3c]" />
              </div>

              <div className="text-base sm:text-lg font-mono text-[#f2efeb] break-all mb-4 select-all">
                {PORTFOLIO_OWNER.email}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="btn-lift flex-1 py-2 px-3 text-xs font-semibold bg-white/5 hover:bg-white/10 text-[#f2efeb] border border-white/10 rounded flex items-center justify-center gap-1.5 transition-all"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#a09c9a]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PORTFOLIO_OWNER.email}`}
                  className="btn-lift py-2 px-3 text-xs font-semibold bg-[#e32b3c] hover:bg-[#c82231] text-white rounded flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Compose Mail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* LinkedIn Profile */}
            <a
              href={PORTFOLIO_OWNER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-[#121212] border border-white/10 rounded-lg hover:border-white/20 transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded bg-white/5 border border-white/10">
                  <Linkedin className="w-5 h-5 text-[#e32b3c]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#f2efeb] group-hover:text-[#e32b3c] transition-colors">
                    LinkedIn Network
                  </div>
                  <div className="text-xs text-[#a09c9a]">
                    linkedin.com/in/yassineha
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#a09c9a] group-hover:text-[#f2efeb] transition-colors" />
            </a>

            {/* GitHub Profile */}
            <a
              href={PORTFOLIO_OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-[#121212] border border-white/10 rounded-lg hover:border-white/20 transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded bg-white/5 border border-white/10">
                  <Github className="w-5 h-5 text-[#e32b3c]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#f2efeb] group-hover:text-[#e32b3c] transition-colors">
                    GitHub Codebase
                  </div>
                  <div className="text-xs text-[#a09c9a]">
                    github.com/yassinehaa
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#a09c9a] group-hover:text-[#f2efeb] transition-colors" />
            </a>

            {/* Location Note */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg flex items-center gap-3 text-xs text-[#a09c9a]">
              <MapPin className="w-4 h-4 text-[#e32b3c] shrink-0" />
              <span>
                Based in <strong className="text-[#f2efeb]">Béni Mellal, Morocco</strong>. Synchronized with European and Atlantic time zones.
              </span>
            </div>
          </div>

          {/* Column 2: Functional Message Dispatcher */}
          <div className="lg:col-span-7 reveal reveal-right">
            <div className="p-8 bg-[#121212] border border-white/10 rounded-lg">
              <h3 className="text-lg font-bold text-[#f2efeb] mb-2 tracking-tight">
                Send a Direct Message
              </h3>
              <p className="text-xs text-[#a09c9a] mb-6">
                Fill in your project specs or inquiry. I will respond to your email within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="p-6 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-semibold text-[#f2efeb]">
                    Message Delivered to Inbox
                  </h4>
                  <p className="text-xs text-[#a09c9a] max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out! Your message was sent directly to{' '}
                    <span className="text-[#f2efeb] font-mono font-medium">{PORTFOLIO_OWNER.email}</span>.
                    {submittedEmail && (
                      <> I will review your inquiry and reply to <span className="text-[#f2efeb] font-mono font-medium">{submittedEmail}</span> within 24 hours.</>
                    )}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFallbackMailto(null);
                    }}
                    className="mt-3 text-xs text-[#e32b3c] hover:underline uppercase tracking-wider font-semibold"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Anti-spam honeypot field (hidden from real users) */}
                  <input
                    type="text"
                    name="_honey"
                    value={formData._honey}
                    onChange={(e) => setFormData({ ...formData, _honey: e.target.value })}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {errorMessage && (
                    <div className="p-3.5 text-xs bg-red-950/40 border border-red-500/30 text-red-200 rounded space-y-2">
                      <p>{errorMessage}</p>
                      {fallbackMailto && (
                        <a
                          href={fallbackMailto}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e32b3c] hover:bg-[#c82231] text-white rounded font-medium text-xs transition-colors"
                        >
                          <span>Open in Your Email Client</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#a09c9a] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-3.5 py-2.5 bg-[#181818] border border-white/10 rounded text-sm text-[#f2efeb] placeholder:text-[#a09c9a]/40 focus:outline-none focus:border-[#e32b3c] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#a09c9a] mb-1.5">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 bg-[#181818] border border-white/10 rounded text-sm text-[#f2efeb] placeholder:text-[#a09c9a]/40 focus:outline-none focus:border-[#e32b3c] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#a09c9a] mb-1.5">
                      Subject / Project Scope
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Backend API Architecture / Full-Time Role"
                      className="w-full px-3.5 py-2.5 bg-[#181818] border border-white/10 rounded text-sm text-[#f2efeb] placeholder:text-[#a09c9a]/40 focus:outline-none focus:border-[#e32b3c] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#a09c9a] mb-1.5">
                      Message Content *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your technical requirements, team needs, or questions..."
                      className="w-full px-3.5 py-2.5 bg-[#181818] border border-white/10 rounded text-sm text-[#f2efeb] placeholder:text-[#a09c9a]/40 focus:outline-none focus:border-[#e32b3c] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-lift w-full py-3 px-4 bg-[#e32b3c] hover:bg-[#c82231] text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all shadow-md shadow-[#e32b3c]/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting to Inbox...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Direct Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
