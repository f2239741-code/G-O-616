import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'warning' | 'error' | 'sigil';
}

let toastListener: ((msg: ToastMessage) => void) | null = null;

export const showToast = (title: string, description?: string, type: ToastMessage['type'] = 'sigil') => {
  if (toastListener) {
    toastListener({
      id: 'toast_' + Date.now(),
      title,
      description,
      type
    });
  }
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    toastListener = (msg: ToastMessage) => {
      setToasts((prev) => [...prev, msg]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== msg.id));
      }, 4000);
    };

    return () => {
      toastListener = null;
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`pointer-events-auto p-3.5 rounded-xl border backdrop-blur-xl shadow-2xl flex items-start gap-3 ${
              t.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-100'
                : t.type === 'warning'
                ? 'bg-amber-950/80 border-amber-500/40 text-amber-100'
                : t.type === 'error'
                ? 'bg-rose-950/80 border-rose-500/40 text-rose-100'
                : 'bg-[#121218]/90 border-amber-500/40 text-amber-200'
            }`}
          >
            <div className="mt-0.5">
              {t.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              {t.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {t.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
              {t.type === 'sigil' && <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />}
            </div>

            <div className="flex-1 min-w-0 font-sans">
              <h4 className="text-xs font-semibold font-mono tracking-tight">{t.title}</h4>
              {t.description && <p className="text-[11px] text-neutral-300 mt-0.5 leading-snug">{t.description}</p>}
            </div>

            <button
              onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
              className="text-neutral-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
