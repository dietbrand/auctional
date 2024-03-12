import Heading from '@/app/components/Heading';
import AuctionForm from '../../AuctionForm';
import { getDetailedViewData } from '@/app/actions/auctionActions';

const Update = async ({ params }: { params: { id: string } }) => {
  const data = await getDetailedViewData(params.id);
  return (
    <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
      <Heading
        title='Update your auction'
        subTitle='Please update the details'
      />
      <AuctionForm auction={data} />
    </div>
  );
};
export default Update;
