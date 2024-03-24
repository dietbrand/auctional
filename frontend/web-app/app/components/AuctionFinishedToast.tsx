import { Auction, AuctionFinished } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { currencyFormatter } from '../utils/utils';

type Props = {
  auction: Auction;
  finishedAuction: AuctionFinished;
};
const AuctionFinishedToast = ({ auction, finishedAuction }: Props) => {
  return (
    <Link
      href={`/auctions/details/${auction.id}`}
      className='flex flex-col items-center'
    >
      <div className='flex flex-row items-center gap-2'>
        <Image
          src={auction.imageUrl}
          alt='image'
          height={80}
          width={80}
          className='rounded-lg w-auto h-auto'
        />
        <div className='flex flex-col'>
          <span>
            Auction for {auction.make} {auction.model} has finished.
          </span>
          {finishedAuction.itemSold && finishedAuction.amount ? (
            <p>
              Congratulations to {finishedAuction.winner}. Sold for{' '}
              {currencyFormatter.format(finishedAuction.amount)}
            </p>
          ) : (
            <p>The item wasn&apos;t sold</p>
          )}
        </div>
      </div>
    </Link>
  );
};
export default AuctionFinishedToast;
