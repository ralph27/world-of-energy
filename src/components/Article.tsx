import Image from "next/image";
import Tag from "./Tag";

const Article = ({
  img,
  title,
  category,
  date,
}: {
  img: string;
  title: string;
  category: string;
  date: Date;
}) => {
  return (
    <div className="my-1 flex border-t border-white/30 px-2 py-2">
      <Image src={img} width={85} height={85} alt="article img" />
      <div className="pl-2">
        <h1 className="text-2xl text-white">{title}</h1>
        <div className="flex items-center gap-3">
          <p>{date.toDateString()}</p>
          <Tag name={category} />
        </div>
      </div>
    </div>
  );
};

export default Article;
