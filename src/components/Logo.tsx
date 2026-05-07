import React from 'react';

import { cn } from '@/lib/utils';

export interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <span className={cn("font-michroma flex items-center", className)}>
      MOONUM
    </span>
  );
};
