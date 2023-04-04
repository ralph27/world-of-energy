const Tag = ({ name }: { name: string }) => {
  return (
    <p className=" w-fit rounded-lg bg-success/20 px-2 text-sm text-green-500">
      {name}
    </p>
  );
};

export default Tag;
