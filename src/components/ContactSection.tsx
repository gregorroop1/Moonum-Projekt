import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, ChevronDown } from 'lucide-react';
import { CATEGORIES, PLANS_BY_CATEGORY } from '../constants/data';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  const { t, i18n } = useTranslation(['contact', 'data']);
  const [selectedPlan, setSelectedPlan] = useState<string>(() => {
    return (window as any).__lastSelectedPlan || '';
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleSelectPlan = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setSelectedPlan(customEvent.detail);
      }
    };

    window.addEventListener('select-plan', handleSelectPlan);
    return () => window.removeEventListener('select-plan', handleSelectPlan);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('service', selectedPlan ? t(`pricing.plans.${selectedPlan}`, { ns: 'data' }) : 'General Inquiry');
      formDataToSend.append('lang', i18n.language || 'en');

      const response = await fetch('https://www.moonum.ee/contact.php', {
        method: 'POST',
        body: formDataToSend,
      });

      const responseText = await response.text();
      
      try {
        const data = JSON.parse(responseText);
        if (data.status === 'success') {
          setStatus('success');
          setFormData({ name: '', email: '', company: '', message: '' });
          setSelectedPlan('');
        } else {
          setStatus('error');
          setErrorMessage(data.message || 'Something went wrong.');
        }
      } catch (parseError) {
        // Handle Bluehost anti-bot protection (409 Conflict with cookie challenge)
        const cookieMatch = responseText.match(/document\.cookie\s*=\s*"([^"]+)"/);
        
        if (response.status === 409 && cookieMatch) {
          console.log("Anti-bot challenge detected. Solving and retrying...");
          
          // Set the required cookie
          document.cookie = cookieMatch[1] + "; path=/";
          
          // Retry the exact same request
          try {
            const retryResponse = await fetch('contact.php', {
              method: 'POST',
              body: formDataToSend,
            });
            const retryText = await retryResponse.text();
            const retryData = JSON.parse(retryText);
            
            if (retryData.status === 'success') {
              setStatus('success');
              setFormData({ name: '', email: '', company: '', message: '' });
              setSelectedPlan('');
            } else {
              setStatus('error');
              setErrorMessage(retryData.message || 'Something went wrong on retry.');
            }
          } catch (retryError) {
             console.error('Retry failed:', retryError);
             setStatus('error');
             setErrorMessage('Failed to connect securely. Please try again.');
          }
        } else {
          console.error('Server returned non-JSON response:', responseText);
          setStatus('error');
          setErrorMessage('Server error. Please check the console for details.');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <section id="contact" className="bg-white text-black pt-20 pb-16 px-4 md:px-16">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 relative text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter leading-[1.1] uppercase">
            <span className="text-zinc-300">{t('header.title1', { ns: 'contact' })}</span> {t('header.title2', { ns: 'contact' })}
            <div className="inline-block md:block lg:inline-block ml-0 md:ml-4 mb-2 md:mt-0 align-middle">
               <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 md:w-32 h-auto mx-auto transform md:rotate-0 block">
                 <path d="M2 20H118M118 20L100 8M118 20L100 32" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </div>
          </h2>
          <p className="mt-6 text-zinc-500 text-base md:text-lg font-medium tracking-tight">
            {t('header.description', { ns: 'contact' })}
          </p>
          
          {/* Dot Grid Decoration - Adjusted for center */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden xl:grid grid-cols-5 gap-2 opacity-10">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-black rounded-full"></div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl mx-auto py-20 text-center space-y-6"
          >
            <div className="w-24 h-24 bg-black flex items-center justify-center mx-auto mb-8 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]">
              <Zap className="text-white fill-current" size={32} />
            </div>
            <h3 className="text-3xl font-display font-bold uppercase tracking-tighter">{t('success.title', { ns: 'contact' })}</h3>
            <p className="text-zinc-500 text-lg">{t('success.description', { ns: 'contact' })}</p>
            <div className="flex justify-center">
              <Button
                onClick={() => setStatus('idle')}
                variant="polygon2"
                className="mt-8 px-8 py-5 text-[10px] flex items-center gap-3 mx-auto"
              >
                {t('success.button', { ns: 'contact' })}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="space-y-8 w-full max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-widest">{t('form.name.label', { ns: 'contact' })}</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('form.name.placeholder', { ns: 'contact' })}
                  className="w-full border-b border-zinc-300 py-3 focus:border-black outline-none transition-colors placeholder:text-zinc-400 text-base"
                  required
                  disabled={status === 'loading'}
                />
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-widest">{t('form.email.label', { ns: 'contact' })}</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('form.email.placeholder', { ns: 'contact' })}
                  className="w-full border-b border-zinc-300 py-3 focus:border-black outline-none transition-colors placeholder:text-zinc-400 text-base"
                  required
                  disabled={status === 'loading'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-widest">{t('form.company.label', { ns: 'contact' })}</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t('form.company.placeholder', { ns: 'contact' })}
                  className="w-full border-b border-zinc-300 py-3 focus:border-black outline-none transition-colors placeholder:text-zinc-400 text-base"
                  disabled={status === 'loading'}
                />
              </div>

              <div className="space-y-3 relative">
                <label className="block text-xs font-bold uppercase tracking-widest">{t('form.services.label', { ns: 'contact' })}</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-between border-b border-zinc-300 py-3 text-base text-left focus:border-black outline-none transition-colors bg-white relative z-50"
                  >
                    <span className={selectedPlan ? 'text-black font-medium' : 'text-zinc-400'}>
                      {selectedPlan ? t(`pricing.plans.${selectedPlan}`, { ns: 'data' }) : t('form.services.placeholder', { ns: 'contact', defaultValue: 'Select a package' })}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsDropdownOpen(false)} 
                      />
                      <div className="absolute top-full left-0 w-full mt-2 bg-white border border-zinc-200 shadow-2xl max-h-[300px] overflow-y-auto z-50">
                        {CATEGORIES.map(category => (
                          <div key={category}>
                            <div className="px-4 py-2 bg-zinc-50 text-[10px] font-black uppercase tracking-widest text-zinc-400 sticky top-0 border-b border-zinc-100 z-10">
                              {t(`categories.${category}`, { ns: 'data' })}
                            </div>
                            {PLANS_BY_CATEGORY[category].map(plan => (
                              <button
                                key={plan.id}
                                type="button"
                                onClick={() => {
                                  setSelectedPlan(plan.id);
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                                  selectedPlan === plan.id 
                                    ? 'bg-zinc-100 font-bold text-black border-l-2 border-black' 
                                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-black border-l-2 border-transparent'
                                }`}
                              >
                                {t(`pricing.plans.${plan.id}`, { ns: 'data' })}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-left">
              <label className="block text-xs font-bold uppercase tracking-widest">{t('form.message.label', { ns: 'contact' })}</label>
              <textarea 
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('form.message.placeholder', { ns: 'contact' })}
                className="w-full border-b border-zinc-300 py-3 focus:border-black outline-none transition-colors placeholder:text-zinc-400 text-base resize-none"
                required
                disabled={status === 'loading'}
              ></textarea>
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-1">
                {errorMessage}
              </p>
            )}

            {/* Submit */}
            <div className="flex flex-col items-center md:items-end pt-4">
              <div className="relative">
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className={cn(
                    buttonVariants({ variant: "polygon2" }), 
                    "px-8 py-5 text-[10px] flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {status === 'loading' ? 'SENDING...' : t('form.submit', { ns: 'contact' })}
                  <Zap className={cn("fill-current group-hover:animate-pulse", status === 'loading' && "animate-bounce")} size={18} />
                </button>
              </div>
              <p className="mt-6 text-zinc-400 text-sm italic font-medium">
                {t('form.footer', { ns: 'contact' })}
              </p>
            </div>
          </motion.form>
        )}
      </div>
    </section>

  );
};

export default ContactSection;
