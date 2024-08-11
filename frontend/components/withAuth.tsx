// components/withAuth.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isLoggedIn } from '../utils/auth';

const withAuth = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn()) {
        router.push('/login');
      }
    }, [router]);

    return isLoggedIn() ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
