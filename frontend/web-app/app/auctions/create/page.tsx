import Heading from '@/app/components/Heading';
import AuctionForm from '../AuctionForm';

const Create = () => {
  return (
    <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
      <Heading title='Sell your stuff!' subTitle='Please enter the details' />
      <AuctionForm />
    </div>
  );
};
export default Create;
