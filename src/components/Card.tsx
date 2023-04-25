import Image from "next/image";
import Category from "./Category";
import Link from "next/link";

export default function Card({
  id,
  image,
  title,
  description,
  category,
  background,
}: {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  background: string;
}) {
  return (
    <Link
      href={"/summary/1"}
      className="relative flex max-w-xs cursor-pointer flex-col rounded-xl bg-base200 shadow-xl duration-500 ease-in-out lg:hover:scale-105"
    >
      <div className="relative h-48 w-full">
        <Image
          src={`${image}/tr:h-570,w-1000`}
          fill
          alt={title}
          className="rounded-t-xl"
        />
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
