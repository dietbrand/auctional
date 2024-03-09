import EmptyFilter from '@/app/components/EmptyFilter';

const Page = ({ searchParams }: { searchParams: { callbackUrl: string } }) => {
  return (
    <EmptyFilter
      title='You need to be logged in'
      subTitle='please click below to sign in'
      showLogin
      callbackUrl={searchParams.callbackUrl}
    />
  );
};
export default Page;
