import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  let base = 'inline-flex items-center justify-center font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-all duration-200';
  let variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    accent: 'bg-accent text-white hover:bg-accent/90',
    outline: 'border border-accent text-accent bg-white hover:bg-accent/10',
  };
  let sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-2 text-base rounded-xl',
    lg: 'px-8 py-3 text-lg rounded-2xl',
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};