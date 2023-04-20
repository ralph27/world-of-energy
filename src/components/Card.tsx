import Image from "next/image";
import Category from "./Category";

export default function Card({
  id,
  image,
  title,
  description,
  category,
}: {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
}) {
  return (
    <div className="relative flex max-w-xs cursor-pointer flex-col rounded-xl bg-base200 shadow-xl duration-500 ease-in-out lg:hover:scale-105">
      <div className="relative h-48 w-full">
        <Image src={image} fill alt={title} className="rounded-t-xl" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="mb-10">
          <h1 className=" text-lg font-bold text-white">{title}</h1>
          <p className=" text-gray-400">{description}</p>
        </div>
        <div>
          <Category category={category} color="#2775c3" />
        </div>
      </div>
    </div>
  );
}
