'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, AlertCircle, X, ShieldAlert, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type ModalType = 'preview' | 'success' | 'error';

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string;
  actionHint?: string;
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

interface DemoContextType {
  showPreview: (actionLabel: string, hint?: string) => void;
  showSuccess: (title: string, message: string, secondaryAction?: { label: string; href?: string; onClick?: () => void }) => void;
  showError: (message: string, title?: string) => void;
  closeModal: () => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return ctx;
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: 'preview',
    title: '',
    message: '',
  });

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const showPreview = useCallback((actionLabel: string, hint?: string) => {
    setModal({
      isOpen: true,
      type: 'preview',
      title: 'Admin Preview Mode',
      message: `You clicked "${actionLabel}". This is an interactive client test drive, so write actions and real server mutations are simulated.`,
      actionHint: hint || 'In the production deployment, this action will immediately synchronize with your database and cloud media storage.',
    });
  }, []);

  const showSuccess = useCallback((title: string, message: string, secondaryAction?: { label: string; href?: string; onClick?: () => void }) => {
    setModal({
      isOpen: true,
      type: 'success',
      title: title || 'Action Complete',
      message,
      secondaryAction,
    });
  }, []);

  const showError = useCallback((message: string, title?: string) => {
    setModal({
      isOpen: true,
      type: 'error',
      title: title || 'Access Denied',
      message,
    });
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modal.isOpen, closeModal]);

  return (
    <DemoContext.Provider value={{ showPreview, showSuccess, showError, closeModal }}>
      {children}

      <AnimatePresence>
        {modal.isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            aria-describedby="demo-modal-desc"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#0F141E]/70 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#C9A84C]/30 bg-[#FAF7F2] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(15,20,30,0.35)]"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 rounded-full p-2 text-[#6B5E51] transition-colors hover:bg-[#EFE9DF] hover:text-[#1F1713]"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                {/* Icon badge */}
                <div
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full border shadow-sm ${
                    modal.type === 'preview'
                      ? 'border-[#C9A84C]/40 bg-[#C9A84C]/15 text-[#A67C2E]'
                      : modal.type === 'success'
                      ? 'border-emerald-600/30 bg-emerald-50 text-emerald-700'
                      : 'border-red-500/30 bg-red-50 text-red-600'
                  }`}
                >
                  {modal.type === 'preview' && <Sparkles size={32} className="animate-pulse" />}
                  {modal.type === 'success' && <CheckCircle2 size={34} />}
                  {modal.type === 'error' && <AlertCircle size={34} />}
                </div>

                {/* Subtitle pill */}
                <span className="mb-2 inline-block rounded-full bg-[#1F1713]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#8A7968]">
                  {modal.type === 'preview' ? 'Client Demo • Interactive Sandbox' : modal.type === 'success' ? 'Simulated Action' : 'Security Notice'}
                </span>

                {/* Title */}
                <h3
                  id="demo-modal-title"
                  className="font-serif text-2xl font-bold tracking-tight text-[#1F1713] sm:text-3xl"
                  style={{ fontFamily: 'var(--font-serif, "Playfair Display", serif)' }}
                >
                  {modal.title}
                </h3>

                {/* Description */}
                <p id="demo-modal-desc" className="mt-3 text-sm leading-relaxed text-[#5A4D41] sm:text-base">
                  {modal.message}
                </p>

                {/* Action hint block */}
                {modal.actionHint && (
                  <div className="mt-4 w-full rounded-xl border border-[#C9A84C]/25 bg-[#F3ECE1]/70 p-3.5 text-left text-xs text-[#6B5A49]">
                    <div className="flex items-start gap-2">
                      <ShieldAlert size={16} className="mt-0.5 shrink-0 text-[#C9A84C]" />
                      <span>{modal.actionHint}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-6 flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
                  {modal.secondaryAction && (
                    modal.secondaryAction.href ? (
                      <Link
                        href={modal.secondaryAction.href}
                        onClick={closeModal}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#C9A84C] bg-white px-5 py-2.5 text-sm font-semibold text-[#8C6D27] shadow-sm transition hover:bg-[#FDFBF7]"
                      >
                        {modal.secondaryAction.label}
                        <ArrowRight size={15} />
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          modal.secondaryAction?.onClick?.();
                          closeModal();
                        }}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#C9A84C] bg-white px-5 py-2.5 text-sm font-semibold text-[#8C6D27] shadow-sm transition hover:bg-[#FDFBF7]"
                      >
                        {modal.secondaryAction.label}
                      </button>
                    )
                  )}

                  <button
                    onClick={closeModal}
                    className="inline-flex items-center justify-center rounded-xl bg-[#1F1713] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#342721] hover:shadow-lg"
                  >
                    {modal.type === 'preview' ? 'Continue Test Drive' : modal.type === 'error' ? 'Understood' : 'Got it'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DemoContext.Provider>
  );
}

