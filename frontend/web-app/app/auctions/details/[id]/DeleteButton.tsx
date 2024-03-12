'use client';

import { deleteAuction } from '@/app/actions/auctionActions';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  id: string;
};

const DeleteButton = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const delAuction = () => {
    setLoading(true);
    deleteAuction(id)
      .then(res => {
        if (res.error) throw res.error;
        router.push('/');
      })
      .catch(err => toast.error(err.status + ' ' + err.message))
      .finally(() => setLoading(false));
  };
  return (
    <Button color='failure' onClick={delAuction} isProcessing={loading}>
      Delete Auction
    </Button>
  );
};
export default DeleteButton;
