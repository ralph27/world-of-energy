export default function Category({
  category,
  color,
}: {
  category: string;
  color: string;
}) {
  console.log(color);
  if (color.length) {
    return (
      <div className={`w-fit rounded-md bg-[${color}] px-2 py-0.5`}>
        <p className="text-sm text-white">#{category}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
}
