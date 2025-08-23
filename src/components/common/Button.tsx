import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Spinner } from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
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
    'inline-flex items-center justify-center rounded-md font-bold transition-colors shadow disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-cyan-800 text-white hover:bg-cyan-500 disabled:hover:bg-cyan-800',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:hover:bg-gray-200',
    ghost:
      'bg-transparent border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-500 disabled:hover:bg-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
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
