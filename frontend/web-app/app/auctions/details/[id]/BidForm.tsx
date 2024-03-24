'use client';

import { PlaceBidForAuction } from '@/app/actions/auctionActions';
import { currencyFormatter } from '@/app/utils/utils';
import { useBidStore } from '@/hooks/useBidStore';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
  auctionId: string;
  highBid: number;
};
const BidForm = ({ auctionId, highBid }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const addBid = useBidStore(state => state.addBid);

  const onSubmit = (data: FieldValues) => {
    if (data.amount <= highBid) {
      reset();
      return toast.error(
        'Bid must be at least ' + currencyFormatter.format(highBid + 1)
      );
    }
    PlaceBidForAuction(auctionId, +data.amount)
      .then(bid => {
        if (bid.error) throw bid.error;
        addBid(bid);
        reset();
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex items-center border-2 rounded-lg py-2'
    >
      <input
        type='number'
        {...register('amount')}
        className='input-custom text-sm text-gray-600'
        placeholder={`Enter your bid (minimum is ${currencyFormatter.format(
          highBid + 1
        )})`}
      />
    </form>
  );
};
export default BidForm;
