import type { ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

interface LinkButtonProps extends Omit<LinkProps, 'className'> {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export default function LinkButton({
  to,
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: LinkButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-sm font-bold transition-colors hover:cursor-pointer';

  const variants = {
    primary: 'bg-cyan-600 text-white hover:bg-cyan-400',
    ghost:
      'bg-transparent border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <Link
      to={to}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
