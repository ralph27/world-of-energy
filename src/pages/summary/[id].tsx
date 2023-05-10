import Image from 'next/image';
import Category from '~/components/Category';
import LeftTab from '~/components/LeftTab';
import { Kanit, Roboto } from 'next/font/google';
import Subscribe from '~/components/Subscribe';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface Params extends ParsedUrlQuery {
  id: string;
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
  variable: '--roboto-font'
});

const kanit = Kanit({
  subsets: ['latin'],
  weight: '400',
  variable: '--kanit-font'
});

export default function Page({ menuOpen }: { menuOpen: boolean }) {
  const router = useRouter();
  const { id } = router.query as Params;
  const summary = api.summaries.getSummaryById.useQuery({ id });

  return (
    <div className={`flex ${kanit.variable} ${roboto.variable} pb-10 bg-base200`}>
      <LeftTab menuOpen={menuOpen} />
      <div className="mx-auto my-0 w-full pt-5 lg:w-3/4 max-w-7xl">
        <div className='px-3 sm:px-10'>
          <div className="font-kanit">
            <Category
              category={summary.data?.category.name || ''}
              color={summary.data?.category.background || ''}
            />
            <h1 className="pt-4 text-3xl text-white sm:text-5xl lg:text-6xl">
              {summary.data?.title}
            </h1>
          </div>
          <div className="relative my-6 sm:px-10 h-64 w-full sm:h-80 md:h-96 lg:mx-auto lg:my-10 lg:h-100">
            <Image src={summary.data?.image || ''} fill alt="picture" className='rounded-lg' />
          </div>
        </div>
        <div className="mx-auto my-0 max-w-3xl items-center pl-3 pr-3 leading-7 text-[#d1d5db] sm:px-6">
          <Subscribe />
          <ReactMarkdown className="mt-5 font-kanit text-xl sm:text-xl lg:text-2xl">
            {summary.data?.content || ''}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
