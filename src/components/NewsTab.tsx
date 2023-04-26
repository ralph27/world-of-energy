import { BiNews } from "react-icons/bi";
import SearchBar from "./SearchBar";
import { api } from "~/utils/api";
import Article from "./Article";

const NewsTab = () => {
  const { data } = api.articles.getArticles.useQuery();

  return (
    <div className="flex-1 pt-8 font-kanit">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-lg text-white">
          <BiNews size={25} /> Latest News
        </h1>
        <SearchBar />
      </div>
      <div className="mt-2 bg-base200 ">
        {data &&
          data.map((article) => (
            <Article
              category={article.category.name}
              date={article.createdAt}
              title={article.title}
              key={article.id}
            />
          ))}
      </div>
    </div>
  );
};

export default NewsTab;
