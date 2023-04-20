export default function Category({
  category,
  color,
}: {
  category: string;
  color: string;
}) {
  return (
    <div
      style={{ backgroundColor: color }}
      className={`w-fit rounded-md px-2 py-0.5`}
    >
      <p className="text-sm text-white">#{category}</p>
    </div>
  );
}
