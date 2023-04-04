import { useState, type ChangeEvent, useEffect } from "react";
import { api } from "../utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Article {
  title: string;
  content: string;
  image: string;
  categoryId: string;
}

const Upload = () => {
  const [option, setOption] = useState<string>("category");
  const [data, setData] = useState<Article>({
    title: "",
    content: "",
    image:
      "https://res.cloudinary.com/dij6smhap/image/upload/v1680532681/cld-sample-5.jpg",
    categoryId: "",
  });
  const [category, setCategory] = useState("");
  const router = useRouter();

  const user = useSession();

  useEffect(() => {
    if (user.data?.user?.role === "USER") {
      void router.push("/");
    }
  }, [user, router]);

  const addCategory = api.categories.addCategory.useMutation({
    onSuccess: () => {
      setCategory("");
    },
  });

  const addArticle = api.articles.addArticle.useMutation({
    onSuccess: () => {
      setData({
        ...data,
        categoryId: "",
        content: "",
        image:
          "https://res.cloudinary.com/dij6smhap/image/upload/v1680532681/cld-sample-5.jpg",
        title: "",
      });
    },
  });

  const { data: categories } = api.categories.getCategories.useQuery(...[,], {
    enabled: option === "article",
  });

  const handleSubmit = async () => {
    if (option === "category" && !!category) {
      await addCategory.mutateAsync({ name: category });
    } else if (option === "article") {
      await addArticle.mutateAsync(data);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center">
          <div className="tabs tabs-boxed w-fit">
            <h1
              onClick={() => setOption("category")}
              className={`tab ${option === "category" ? "tab-active" : ""}`}
            >
              Add Category
            </h1>
            <h1
              onClick={() => setOption("article")}
              className={`tab ${option === "article" ? "tab-active" : ""}`}
            >
              Add Article
            </h1>
          </div>
          {option === "category" ? (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter Category</span>
              </label>
              <label className="input-group">
                <span>Category</span>
                <input
                  type="text"
                  value={category}
                  className="input-bordered input"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCategory(e.currentTarget.value)
                  }
                />
              </label>
            </div>
          ) : (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter Title</span>
              </label>
              <label className="input-group">
                <span>Title</span>
                <input
                  type="text"
                  value={data?.title}
                  placeholder="Science"
                  className="input-bordered input"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({ ...data, title: e.currentTarget.value })
                  }
                />
              </label>
              <div className="py-2" />
              <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setData({ ...data, categoryId: e.target.value })
                }
                className="select-accent select w-full max-w-xs"
              >
                <option disabled selected>
                  Categories
                </option>
                {categories?.map((name) => (
                  <option value={name.id} key={name.id}>
                    {name.name}
                  </option>
                ))}
              </select>
              <div className="py-2" />
              <span className="label-text mb-2">Upload image</span>
              <input
                type="file"
                className="file-input-bordered file-input-accent file-input w-full max-w-xs"
              />
              <div className="py-2" />
              <textarea
                className="textarea-accent textarea"
                placeholder="Content"
                value={data.content}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setData({ ...data, content: event.currentTarget.value })
                }
              ></textarea>
            </div>
          )}
          <div className="py-2" />
          <div className="card-actions justify-end">
            <button
              onClick={() => void handleSubmit()}
              className="btn-primary btn"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
