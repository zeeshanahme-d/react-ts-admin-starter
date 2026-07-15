import { ReactNode } from 'react';

import Card from '../card/card';

// ─── Types ────────────────────────────────────────────────────────────────────

type BadgeVariant = 'positive' | 'negative' | 'neutral';

interface StatCardProps {
  label: string;
  value: string | number;
  badge?: string;
  badgeVariant?: BadgeVariant;
  icon?: ReactNode;
  className?: string;
}

// ─── Badge colour map ─────────────────────────────────────────────────────────

const badgeColour: Record<BadgeVariant, string> = {
  positive: 'text-primary',
  negative: 'text-danger',
  neutral: 'text-text-primary',
};

// ─── Component ────────────────────────────────────────────────────────────────

function StatCard({ label, value, badge, badgeVariant = 'positive', icon, className = '' }: StatCardProps) {
  return (
    <Card className={`flex flex-col gap-3.5 ${className} `}>
      {/* Top row: label + badge */}
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-1.5'>
          {icon && <span className='text-[#7d859d] text-[14px] leading-none'>{icon}</span>}
          <span className='font-normal text-[12px] tracking-[-0.36px] leading-[1.11] text-text-secondary whitespace-nowrap'>
            {label}
          </span>
        </div>

        {badge && (
          <span
            className={`font-normal text-[12px] tracking-[-0.36px] leading-[1.11] whitespace-nowrap ${badgeColour[badgeVariant]}`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Value */}
      <p className='font-semibold text-2xl tracking-[-0.69px] leading-[1.11] text-[#1b1e28] whitespace-nowrap'>
        {value}
      </p>
    </Card>
  );
}

export default StatCard;
