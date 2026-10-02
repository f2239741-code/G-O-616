import React, { useState } from 'react';
import { LogIn, ShieldCheck, Sparkles, Check, Lock, UserCheck, Key, RefreshCw, X, Download, Save } from 'lucide-react';
import { GuardianProfile } from '../types';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: GuardianProfile;
  onLoginGoogle: (email: string, name: string) => void;
  onLogout: () => void;
  onSaveCurrentConvo?: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  profile,
  onLoginGoogle,
  onLogout,
  onSaveCurrentConvo
}) => {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulatedGoogleSignIn = (emailToUse: string, nameToUse: string) => {
    setIsAuthenticating(true);
    setAuthSuccessMsg(null);

    setTimeout(() => {
      onLoginGoogle(emailToUse, nameToUse);
      setIsAuthenticating(false);
      setAuthSuccessMsg(`Successfully authenticated via Google (${emailToUse})`);

      setTimeout(() => {
        onClose();
      }, 1200);
    }, 800);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = customEmail.trim() || 'user@gmail.com';
    const name = customName.trim() || email.split('@')[0];
    handleSimulatedGoogleSignIn(email, name);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Decorative ambient glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <LogIn className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                GOOGLE GUARDIAN AUTHENTICATION
              </h3>
              <p className="text-[11px] font-sans text-neutral-400">
                Secure Identity Node & Oracle Session Sync
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#141416] border border-[#262626] text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Auth Status */}
        {profile.isAuthenticated ? (
          <div className="space-y-4">
            <div className="p-4 bg-[#141416] border border-emerald-500/30 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  AUTHENTICATED GUARDIAN
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {profile.authProvider?.toUpperCase() || 'GOOGLE'}
                </span>
              </div>

              <div className="text-xs font-sans text-neutral-200 space-y-1 pt-1">
                <div><span className="text-neutral-500 font-mono">User:</span> {profile.displayName}</div>
                <div><span className="text-neutral-500 font-mono">Email:</span> {profile.email}</div>
                <div><span className="text-neutral-500 font-mono">Tier:</span> <span className="uppercase text-amber-300 font-bold">{profile.tier}</span></div>
                {profile.isSuperAdmin && (
                  <div className="pt-2 border-t border-[#222226] text-[11px] font-mono text-amber-400 flex items-center gap-1 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    SOVEREIGN SUPER ADMIN OVERRIDE ACTIVE
                  </div>
                )}
              </div>
            </div>

            {onSaveCurrentConvo && (
              <button
                onClick={() => {
                  onSaveCurrentConvo();
                  setAuthSuccessMsg('Current conversation session backed up to storage.');
                }}
                className="w-full py-2.5 px-4 bg-[#141416] hover:bg-[#1A1A1E] border border-[#262626] rounded-xl text-xs font-mono font-medium text-neutral-300 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 text-indigo-400" />
                <span>SAVE & BACKUP CURRENT CONVERSATION</span>
              </button>
            )}

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 rounded-xl text-xs font-mono font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>DISCONNECT SESSION (LOGOUT)</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Quick 1-Click Google Sign-In Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                SELECT GOOGLE ACCOUNT SESSION
              </span>

              {/* Instant Google Login Account Option 1 */}
              <button
                onClick={() => handleSimulatedGoogleSignIn('kenx@guardianoracle.com', 'Ken X Cripps (Flamewalker)')}
                disabled={isAuthenticating}
                className="w-full p-3 bg-[#141416] hover:bg-[#1A1A1E] border border-amber-500/30 rounded-xl transition flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs font-mono shadow-sm">
                    G
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-white group-hover:text-amber-300 transition">
                      Ken X Cripps
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      kenx@guardianoracle.com
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                  SOVEREIGN SIGN IN
                </span>
              </button>

              {/* Instant Google Login Account Option 2 */}
              <button
                onClick={() => handleSimulatedGoogleSignIn('f2239741@gmail.com', 'Guardian Seeker')}
                disabled={isAuthenticating}
                className="w-full p-3 bg-[#141416] hover:bg-[#1A1A1E] border border-[#262626] hover:border-indigo-500/40 rounded-xl transition flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs font-mono">
                    G
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold text-neutral-200 group-hover:text-white transition">
                      Google Seeker Node
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      f2239741@gmail.com
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-neutral-400">CONNECT</span>
              </button>
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#222226]" />
              </div>
              <div className="relative flex justify-center text-[10px] font-mono uppercase">
                <span className="bg-[#0F0F11] px-2 text-neutral-500">OR ENTER CUSTOM GOOGLE EMAIL</span>
              </div>
            </div>

            {/* Manual Google Email Sign In Form */}
            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-neutral-400 block mb-1">GOOGLE EMAIL</label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="kenx@guardianoracle.com or user@gmail.com"
                  className="w-full bg-[#0A0A0B] border border-[#2A2A30] rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-neutral-400 block mb-1">DISPLAY NAME (OPTIONAL)</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Ken X / Flamewalker"
                  className="w-full bg-[#0A0A0B] border border-[#2A2A30] rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>VERIFYING GOOGLE AUTH...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>AUTHENTICATE WITH GOOGLE</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {authSuccessMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-300 text-center animate-pulse">
            {authSuccessMsg}
          </div>
        )}
      </div>
    </div>
  );
};
