'use client';

import AuctionCard from './AuctionCard';
import AppPagination from '../components/AppPagination';
import { useEffect, useState } from 'react';
import { Auction, PagedResult } from '@/types';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';
import { useParamsStore } from '@/hooks/useParamsStore';
import { shallow } from 'zustand/shallow';
import qs from 'query-string';
import EmptyFilter from '../components/EmptyFilter';
import { useAuctionsStore } from '@/hooks/useAuctionStore';

const Listings = () => {
  const [loading, setLoading] = useState(true);
  const params = useParamsStore(
    state => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    }),
    shallow
  );
  const data = useAuctionsStore(
    state => ({
      auctions: state.auctions,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }),
    shallow
  );
  const setData = useAuctionsStore(state => state.setData);

  const setParams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({ url: '', query: params });

  const setPageNumber = (pageNumber: number) => {
    setParams({ pageNumber });
  };

  useEffect(() => {
    getData(url).then(data => {
      setData(data);
      setLoading(false);
    });
  }, [setData, url]);

  if (loading) return <h3>Loading...</h3>;

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          {' '}
          <div className='grid grid-cols-4 gap-6'>
            {data.auctions.map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
          <div className='flex justify-center mt-4'>
            <AppPagination
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
              pageChanged={setPageNumber}
            />
          </div>
        </>
      )}
    </>
  );
};
export default Listings;
