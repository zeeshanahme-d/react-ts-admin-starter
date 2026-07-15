import { type Dispatch, type SetStateAction, useMemo, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { useSearchParams } from 'react-router-dom';

import { Input } from 'antd';

import { debounce } from '../../../helpers/CustomHelpers';

export interface DebouncedParamsSearchProps<T extends { [key: string]: any }> {
  setParams: Dispatch<SetStateAction<T>>;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
  searchKey?: keyof T;
}

export default function DebouncedParamsSearch<T extends { [key: string]: any }>({
  setParams,
  placeholder = 'Search...',
  className = 'w-72! h-10!',
  debounceMs = 600,
  searchKey = 'search',
}: DebouncedParamsSearchProps<T>) {
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedSetParams = useMemo(
    () =>
      debounce((value: string) => {
        setParams((prev) => ({ ...prev, [searchKey]: value, page: 1 }));
        handlePageChange(1);
      }, debounceMs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setParams, debounceMs]
  );

  const handlePageChange = (page: number) => {
    setSearchParams({
      tab: searchParams.get('tab') || '',
      page: String(page),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setSearch(next);
    debouncedSetParams(next.trim());
  };

  return (
    <Input
      prefix={<LuSearch size={18} color='#4C536B' className='mr-2' />}
      placeholder={placeholder}
      value={search}
      onChange={handleChange}
      className={`flex-1 h-10 w-full! py-0 sm:min-w-80! ${className}`}
      allowClear
    />
  );
}
