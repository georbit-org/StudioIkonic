'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
}

interface PreviewModalState {
  isOpen: boolean;
  actionTitle: string;
  actionDescription: string;
  techDetails?: string;
}

interface FeedbackContextType {
  toast: (message: string, type?: 'success' | 'error' | 'info', title?: string) => void;
  confirm: (opts: { title: string; message: string; confirmText?: string; onConfirm: () => void }) => void;
  showPreviewInfo: (actionTitle: string, actionDescription: string, techDetails?: string) => void;
}

const FeedbackContext = createContext<FeedbackContextType | null>(null);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });
  const [previewModal, setPreviewModal] = useState<PreviewModalState>({
    isOpen: false,
    actionTitle: '',
    actionDescription: '',
  });

  const toast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success', title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const confirm = useCallback((opts: { title: string; message: string; confirmText?: string; onConfirm: () => void }) => {
    setConfirmDialog({
      isOpen: true,
      title: opts.title,
      message: opts.message,
      confirmText: opts.confirmText || 'Delete',
      onConfirm: () => {
        opts.onConfirm();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  }, []);

  const showPreviewInfo = useCallback((actionTitle: string, actionDescription: string, techDetails?: string) => {
    setPreviewModal({
      isOpen: true,
      actionTitle,
      actionDescription,
      techDetails,
    });
  }, []);

  return (
    <FeedbackContext.Provider value={{ toast, confirm, showPreviewInfo }}>
      {children}

      {/* ── Toast Container (Top Right) ── */}
      <div className="fixed top-20 right-4 z-[99999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md ${
                t.type === 'success'
                  ? 'bg-[#FAF7F2]/95 border-[#C9A84C]/60 text-[#1F1713]'
                  : t.type === 'error'
                  ? 'bg-red-50/95 border-red-300 text-red-900'
                  : 'bg-[#1F1713]/95 border-[#C9A84C]/40 text-white'
              }`}
            >
              {t.type === 'success' && <CheckCircle2 size={18} className="text-[#C9A84C] shrink-0 mt-0.5" />}
              {t.type === 'error' && <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />}
              {t.type === 'info' && <Sparkles size={18} className="text-[#C9A84C] shrink-0 mt-0.5" />}

              <div className="flex-1 text-xs">
                {t.title && <div className="font-bold mb-0.5">{t.title}</div>}
                <div className="leading-relaxed">{t.message}</div>
              </div>

              <button
                onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
                className="text-gray-400 hover:text-gray-700 transition"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Confirmation Dialog ── */}
      <AnimatePresence>
        {confirmDialog.isOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
              className="absolute inset-0 bg-[#0F141E]/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-[#DED4C5] bg-[#FAF7F2] p-6 shadow-2xl z-10"
            >
              <h3 className="text-lg font-bold text-[#1F1713]">{confirmDialog.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#6B5A49]">{confirmDialog.message}</p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 rounded-xl border border-[#D5C9B8] bg-white text-xs font-semibold text-[#5A4B3D] hover:bg-[#EFE8DD] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDialog.onConfirm}
                  className="px-4 py-2 rounded-xl bg-red-600 text-xs font-semibold text-white shadow-sm hover:bg-red-700 transition"
                >
                  {confirmDialog.confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Preview Info Modal ── */}
      <AnimatePresence>
        {previewModal.isOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewModal((prev) => ({ ...prev, isOpen: false }))}
              className="absolute inset-0 bg-[#0F141E]/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg rounded-2xl border border-[#C9A84C]/40 bg-[#FAF7F2] p-6 sm:p-8 shadow-2xl z-10"
            >
              <button
                onClick={() => setPreviewModal((prev) => ({ ...prev, isOpen: false }))}
                className="absolute right-4 top-4 p-2 text-[#6B5A49] hover:text-[#1F1713]"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#937123]">
                <Sparkles size={14} className="text-[#C9A84C]" />
                <span>Feature Preview</span>
              </div>

              <h3 className="mt-2 text-xl font-bold text-[#1F1713]">{previewModal.actionTitle}</h3>
              <p className="mt-3 text-xs leading-relaxed text-[#5A4D41] sm:text-sm">{previewModal.actionDescription}</p>

              {previewModal.techDetails && (
                <div className="mt-4 rounded-xl border border-[#C9A84C]/20 bg-[#F3ECE1] p-3 text-xs text-[#6B5A49] flex items-start gap-2">
                  <ShieldAlert size={15} className="text-[#C9A84C] shrink-0 mt-0.5" />
                  <span>{previewModal.techDetails}</span>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setPreviewModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-5 py-2.5 rounded-xl bg-[#1F1713] text-xs font-bold text-white hover:bg-[#342721] transition"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) {
    throw new Error('useFeedback must be used within FeedbackProvider');
  }
  return ctx;
}

