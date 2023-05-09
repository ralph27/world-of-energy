import Image from 'next/image';
import Category from './Category';
import Link from 'next/link';

export default function Card({
  id,
  title,
  description,
  category,
  background,
  image
}: {
  id: string;
  title: string;
  description: string;
  category: string;
  background: string;
  image: string;
}) {
  return (
    <Link
      href={`/summary/${id}`}
      className="relative flex max-w-xs cursor-pointer flex-col rounded-xl bg-base200 shadow-xl duration-500 ease-in-out lg:hover:scale-105"
    >
      <div className="relative h-48 w-full">
        <Image src={image} fill alt="picture" className="rounded-t-xl" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="mb-10">
          <h1 className=" text-lg font-bold text-white">{title}</h1>
          <p className="text-gray-400">{description}</p>
        </div>
        <div>
          <Category category={category} color={background} />
        </div>
      </div>
    </Link>
  );
}
