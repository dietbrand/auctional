'use client';
import { useParamsStore } from '@/hooks/useParamsStore';
import { usePathname, useRouter } from 'next/navigation';
import { FaCanadianMapleLeaf } from 'react-icons/fa';

const Logo = () => {
  const router = useRouter();
  const pathName = usePathname();

  const reset = useParamsStore(state => state.reset);

  const doReset = () => {
    if (pathName !== '/') router.push('/');
    reset();
  };
  return (
    <div
      onClick={doReset}
      className='cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500'
    >
      <FaCanadianMapleLeaf size={34} />
      <div>2delands.be</div>
    </div>
  );
};
export default Logo;
