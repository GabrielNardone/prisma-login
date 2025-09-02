import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Spinner } from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-sm font-bold transition-colors hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-cyan-600 text-white hover:bg-cyan-500 disabled:hover:bg-cyan-800',
    ghost:
      'bg-transparent border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white',
    danger:
      'bg-rose-600 text-white hover:bg-rose-500 disabled:hover:bg-rose-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="sm" className="mr-2" />
          Loading
        </>
      ) : (
        children
      )}
    </button>
  );
}
