import { ReactNode } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import { Button, Pagination } from 'antd';

import Card from '../card/card';

// ─── Constants ────────────────────────────────────────────────────────────────
export const PAGE_SIZE = 10;

// ─── Status / badge config ────────────────────────────────────────────────────
export type BadgeVariant = 'Active' | 'Inactive' | 'Pending' | 'Verified' | 'Unverified';

const BADGE_CONFIG: Record<BadgeVariant, { bg: string; border: string; text: string }> = {
  Active: { bg: 'bg-[#a2ffc9]', border: 'border-[#71c795]', text: 'text-[#2e6645]' },
  Verified: { bg: 'bg-[#a2ffc9]', border: 'border-[#71c795]', text: 'text-[#2e6645]' },
  Inactive: { bg: 'bg-[#ffe4e4]', border: 'border-[#f5a0a0]', text: 'text-[#9b1c1c]' },
  Unverified: { bg: 'bg-[#ffe4e4]', border: 'border-[#f5a0a0]', text: 'text-[#9b1c1c]' },
  Pending: { bg: 'bg-[#fff3cd]', border: 'border-[#ffc107]', text: 'text-[#856404]' },
};

export function StatusBadge({ label }: { label: BadgeVariant }) {
  const { bg, border, text } = BADGE_CONFIG[label];
  return (
    <span
      className={`inline-flex items-center justify-center h-6 px-3 rounded-md border text-xs font-medium whitespace-nowrap ${bg} ${border} ${text}`}
    >
      {label}
    </span>
  );
}

// ─── Category badge (green pill, same look as Cleaning, Plumbing etc.) ────────
const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Cleaning: { bg: 'bg-[#a2ffc9]', border: 'border-[#71c795]', text: 'text-[#2e6645]' },
  Plumbing: { bg: 'bg-[#bfdbfe]', border: 'border-[#93c5fd]', text: 'text-[#1e40af]' },
  Electrical: { bg: 'bg-[#fef08a]', border: 'border-[#fde047]', text: 'text-[#854d0e]' },
  Carpentry: { bg: 'bg-[#e9d5ff]', border: 'border-[#c084fc]', text: 'text-[#6b21a8]' },
  Painting: { bg: 'bg-[#fed7aa]', border: 'border-[#fb923c]', text: 'text-[#9a3412]' },
  Landscaping: { bg: 'bg-[#d1fae5]', border: 'border-[#6ee7b7]', text: 'text-[#065f46]' },
  Catering: { bg: 'bg-[#fce7f3]', border: 'border-[#f9a8d4]', text: 'text-[#9d174d]' },
  Security: { bg: 'bg-[#e0e7ff]', border: 'border-[#a5b4fc]', text: 'text-[#3730a3]' },
};

export function CategoryBadge({ category }: { category: string }) {
  const cfg = CATEGORY_COLORS[category] ?? { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-700' };
  return (
    <span
      className={`inline-flex items-center justify-center h-6 px-3 rounded-md border text-xs font-medium whitespace-nowrap ${cfg.bg} ${cfg.border} ${cfg.text}`}
    >
      {category}
    </span>
  );
}

// ─── Avatar with name + sub-text ─────────────────────────────────────────────
interface AvatarCellProps {
  avatar?: string;
  name: string;
  sub: string;
  underlineSub?: boolean;
  icon?: ReactNode;
  showPreview?: boolean;
}

export function AvatarCell({ avatar, name, sub, underlineSub, icon, showPreview = true }: AvatarCellProps) {
  return (
    <div className='flex items-center gap-2.5'>
      {showPreview && (
        <>
          {avatar ? (
            <img src={avatar} alt={name} className='w-6.5 h-6.5 rounded-full object-cover shrink-0' />
          ) : icon ? (
            <div className='flex items-center justify-center w-6.5 h-6.5 rounded-full bg-background text-text-secondary text-xs shrink-0 font-semibold'>
              {icon}
            </div>
          ) : (
            <div className='flex items-center justify-center w-6.5 h-6.5 rounded-full bg-background text-text-secondary text-xs shrink-0 font-semibold'>
              {name.charAt(0)}
            </div>
          )}
        </>
      )}
      <div className='flex flex-col gap-0.5'>
        <p className='text-sm font-normal text-text-primary leading-none whitespace-nowrap'>{name}</p>
        <p
          className={`text-xs leading-none whitespace-nowrap ${underlineSub ? 'underline text-text-secondary' : 'text-text-secondary'}`}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}

// ─── Actions  ─────────────────────────────────────────────────────────
export function ActionsMenu() {
  return (
    <div className='relative'>
      <Button type='text' className='flex items-center justify-center w-6 h-6 p-0'>
        <IoIosArrowForward className='text-base text-text-secondary' />
      </Button>
    </div>
  );
}

// ─── Generic table shell ──────────────────────────────────────────────────────
export interface ColumnDef {
  key: string;
  label: ReactNode;
  width?: string;
}

interface TableShellProps {
  columns: ColumnDef[];
  children: React.ReactNode;
}

export function TableShell({ columns, children }: TableShellProps) {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full min-w-312.5'>
        <thead>
          <tr className='bg-forground border-b border-border'>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`p-4 text-left text-xs font-semibold text-icon-primary tracking-wide whitespace-nowrap ${col.width ?? ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

// ─── Generic table row wrapper ────────────────────────────────────────────────
interface TableRowWrapProps extends React.HTMLProps<HTMLTableRowElement> {
  children: React.ReactNode;
}

export function TableRowWrap({ className = '', children, ...props }: TableRowWrapProps) {
  return (
    <tr className={`hover:bg-background-hover transition-colors border-b border-border ${className}`} {...props}>
      {children}
    </tr>
  );
}

// ─── Table footer (pagination + item info) ───────────────────────────────────
interface TableFooterProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export function TableFooter({ currentPage, totalItems, pageSize, onChange }: TableFooterProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const itemStart = (currentPage - 1) * pageSize + 1;
  const itemEnd = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className='grid grid-cols-3 pb-4 pt-10'>
      <span />
      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
        className='justify-self-center'
      />
      <p className='text-xs text-text-secondary justify-self-end whitespace-nowrap'>
        Page {currentPage} of {totalPages}&nbsp;&nbsp;–&nbsp;&nbsp;Items {itemStart} to {itemEnd} of {totalItems}
      </p>
    </div>
  );
}

// ─── Table container card ─────────────────────────────────────────────────────
export function TableCard({ children }: { children: React.ReactNode }) {
  return <Card className='overflow-hidden'>{children}</Card>;
}
