import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'black' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

const sizeConfig = {
  sm: { width: 80, height: 31 },
  md: { width: 120, height: 46 },
  lg: { width: 160, height: 61 },
};

export default function Logo({ 
  variant = 'black', 
  size = 'md', 
  className, 
  showText = false 
}: LogoProps) {
  const logoSrc = variant === 'white' ? '/logo-white.svg' : '/logo-black.svg';
  const { width, height } = sizeConfig[size];

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Image
        src={logoSrc}
        alt="Dar Al Khayma - Moroccan luxury accommodations"
        width={width}
        height={height}
        className="object-contain transition-opacity duration-300 hover:opacity-80"
        priority
      />
      {showText && (
        <span
          className={cn(
            'font-display font-semibold text-xl transition-colors',
            variant === 'white' ? 'text-white' : 'text-neutral-800'
          )}
        >
          Dar Al Khayma
        </span>
      )}
    </div>
  );
}
