import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { StarFilled } from '@ant-design/icons';

import { vendors_Data } from 'helpers/mock-data';

import VendorIcon from '../../../assets/icons/vendor-icon.svg?react';
import {
  ActionsMenu,
  AvatarCell,
  type BadgeVariant,
  CategoryBadge,
  type ColumnDef,
  PAGE_SIZE,
  StatusBadge,
  TableCard,
  TableFooter,
  TableRowWrap,
  TableShell,
} from '../../../components/core-ui/table-primitives/table-primitivies';

// ─── Column config ────────────────────────────────────────────────────────────
const COLUMNS: ColumnDef[] = [
  { key: 'name', label: 'Vendor', width: 'w-48' },
  { key: 'category', label: 'Category', width: 'w-36' },
  { key: 'city', label: 'City', width: 'w-28' },
  { key: 'agentName', label: 'Agent', width: 'w-36' },
  { key: 'status', label: 'Status', width: 'w-28' },
  { key: 'rating', label: 'Rating', width: 'w-24' },
  { key: 'jobs', label: 'Jobs', width: 'w-20' },
  { key: 'joined', label: 'Joined', width: 'w-28' },
  { key: 'actions', label: 'Action', width: 'w-20' },
];

// ─── Rating cell ──────────────────────────────────────────────────────────────
function RatingCell({ value }: { value: number }) {
  return (
    <div className='flex items-center gap-1'>
      <StarFilled className='text-[#f59e0b] text-xs' />
      <span className='text-sm text-text-secondary'>{value.toFixed(1)}</span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
function VendorsTable() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const pageData = vendors_Data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <TableCard>
      <TableShell columns={COLUMNS}>
        {pageData.map((vendor) => (
          <TableRowWrap key={vendor.id} onClick={() => navigate(`/vendors/${vendor?.id}`)} className='cursor-pointer'>
            {/* Vendor name + phone */}
            <td className='p-4'>
              <AvatarCell
                name={vendor.name}
                sub={vendor.phone}
                icon={<VendorIcon color='var(--color-text-primary)' />}
              />
            </td>

            {/* Category badge */}
            <td className='p-4'>
              <CategoryBadge category={vendor.category} />
            </td>

            {/* City */}
            <td className='p-4'>
              <span className='text-sm text-text-secondary'>{vendor.city}</span>
            </td>

            {/* Agent — underlined (linked) */}
            <td className='p-4'>
              <Link
                to='/sales-agents/1'
                onClick={(e) => e.stopPropagation()}
                className='text-sm text-text-secondary underline cursor-pointer hover:text-text-primary transition-colors whitespace-nowrap'
              >
                {vendor.agentName}
              </Link>
            </td>

            {/* Status badge */}
            <td className='p-4'>
              <StatusBadge label={vendor.status as BadgeVariant} />
            </td>

            {/* Rating */}
            <td className='p-4'>
              <RatingCell value={vendor.rating} />
            </td>

            {/* Jobs */}
            <td className='p-4'>
              <span className='text-sm text-text-secondary'>{vendor.jobs}</span>
            </td>

            {/* Joined */}
            <td className='p-4'>
              <span className='text-sm text-text-secondary whitespace-nowrap'>{vendor.joined}</span>
            </td>

            {/* Actions */}
            <td className='p-4'>
              <ActionsMenu />
            </td>
          </TableRowWrap>
        ))}
      </TableShell>

      <TableFooter
        currentPage={currentPage}
        totalItems={vendors_Data.length}
        pageSize={PAGE_SIZE}
        onChange={setCurrentPage}
      />
    </TableCard>
  );
}

export default VendorsTable;
