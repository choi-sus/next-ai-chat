'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import PAGES_HREF from '@/types/PageHref';

const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navigator = {
    push(href: PAGES_HREF) {
      return router.push(href);
    },
    back() {
      return router.back();
    },
    path() {
      return pathname;
    },
    params() {
      return searchParams.toString();
    },
  };

  return navigator;
};

export default useNavigation;
