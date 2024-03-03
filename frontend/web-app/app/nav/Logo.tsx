'use client';
import { useParamsStore } from '@/hooks/useParamsStore';
import { FaCanadianMapleLeaf } from 'react-icons/fa';

const Logo = () => {
  const reset = useParamsStore(state => state.reset);
  return (
    <div
      onClick={reset}
      className='cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500'
    >
      <FaCanadianMapleLeaf size={34} />
      <div>2delands.be</div>
    </div>
  );
};
export default Logo;
