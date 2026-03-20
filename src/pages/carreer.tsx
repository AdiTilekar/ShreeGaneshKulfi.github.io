import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CarreerRedirectPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/career');
  }, [router]);

  return null;
};

export default CarreerRedirectPage;