'use client';
import { useParamsStore } from '@/hooks/useParamsStore';
import { usePathname, useRouter } from 'next/navigation';
import path from 'path';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setParams, searchTerm } = useParamsStore(state => state);
  const [event, setEvent] = useState(null);

  const search = (e: any) => {
    if (pathname !== '/') router.push('/');
    setParams({ searchTerm: e.target.value });
  };

  return (
    <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
      <input
        value={searchTerm}
        className='input-custom text-sm text-gray-600'
        type='text'
        placeholder='Search for items'
        onChange={(e: any) => {
          search(e);
          setEvent(e);
        }}
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') search(e);
        }}
      />
      <button
        onClick={() => {
          if (!event) return;
          search(event);
        }}
      >
        <FaSearch
          size={34}
          className='bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2'
        />
      </button>
    </div>
  );
};
export default Search;
