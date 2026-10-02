import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'amber' | 'danger' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center font-mono font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.98] select-none';

    const variantClasses = {
      primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 border border-indigo-500/30',
      secondary: 'bg-[#18181b] hover:bg-[#27272a] text-neutral-200 border border-[#3f3f46]',
      outline: 'bg-transparent border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white',
      ghost: 'bg-transparent hover:bg-white/5 text-neutral-400 hover:text-neutral-100',
      amber: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10',
      danger: 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 shadow-lg shadow-rose-500/10',
      glow: 'bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-cyan-500/20 hover:from-amber-500/30 hover:to-cyan-500/30 text-white border border-amber-400/40 shadow-xl shadow-amber-500/20'
    };

    const sizeClasses = {
      sm: 'text-xs px-2.5 py-1 gap-1.5',
      md: 'text-xs px-3.5 py-2 gap-2',
      lg: 'text-sm px-5 py-2.5 gap-2.5',
      icon: 'p-2 w-9 h-9 flex items-center justify-center'
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
