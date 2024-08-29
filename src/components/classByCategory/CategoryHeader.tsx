type CategoryHeaderProps = {
  path: string;
};

const CategoryHeader = ({ path }: CategoryHeaderProps) => {
  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <h1 className="font-extrabold text-xl my-6 text-center">
      Class &gt; {capitalize(path)}
    </h1>
  );
};

export default CategoryHeader;
