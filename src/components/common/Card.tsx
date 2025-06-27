import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false, onClick }) => {
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';
  
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all duration-300 ${hoverClasses} ${className}`}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      {children}
    </div>
  );
};