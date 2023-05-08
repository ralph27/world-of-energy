import { useState, type ChangeEvent, useEffect } from 'react';
import { api } from '../utils/api';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface Article {
  title: string;
  content: string;
  categoryId: string;
}

interface Category {
  name: string;
  background: string;
}

interface Notification {
  title: string;
  status: 'SUCCESS' | 'FAILURE';
}

interface Summary {
  title: string;
  description: string;
  categoryId: string;
  image: string;
  content: string;
}

interface Image {
  url: string;
}

const Upload = () => {
  const [option, setOption] = useState<string>('category');
  const [notification, setNotification] = useState<Notification | null>(null);
  const [imageSelected, setImageSelected] = useState('');

  const [data, setData] = useState<Article>({
    title: '',
    content: '',
    categoryId: ''
  });
  const [category, setCategory] = useState<Category>({
    name: '',
    background: ''
  });

  const [summary, setSummary] = useState<Summary>({
    title: '',
    description: '',
    categoryId: '',
    image: '',
    content: ''
  });

  const router = useRouter();

  const user = useSession();

  useEffect(() => {
    if (user.data?.user?.role === 'USER') {
      void router.push('/');
    }
  }, [user, router]);

  const addCategory = api.categories.addCategory.useMutation({
    onSuccess: () => {
      setCategory({
        name: '',
        background: ''
      });
    }
  });

  const addArticle = api.articles.addArticle.useMutation({
    onSuccess: () => {
      setData({
        ...data,
        categoryId: '',
        content: '',
        title: ''
      });
    }
  });

  const uploadImage = api.summaries.addPicture.useMutation();

  const uploadSummary = api.summaries.addSummary.useMutation({
    onSuccess: () => {
      setSummary({
        categoryId: '',
        content: '',
        description: '',
        image: '',
        title: ''
      });
    }
  });

  const { data: categories } = api.categories.getCategories.useQuery(...[,], {
    enabled: option === 'article'
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const reader = new FileReader();
    const currentFile = e.target.files?.[0];

    if (currentFile) {
      reader.readAsDataURL(currentFile);
    }

    reader.onloadend = async () => {
      const res = (await uploadImage.mutateAsync({
        fileSelected: reader.result as string,
        name: currentFile?.name || ''
      })) as Image;

      if (res && res.url) {
        setImageSelected(res.url);
      }
    };
  };

  const handleSubmit = async () => {
    if (option === 'category' && !!category) {
      if (category.name && category.background) {
        const res = await addCategory.mutateAsync({
          name: category.name,
          background: category.background
        });
        res
          ? setNotification({
              ...notification,
              status: 'SUCCESS',
              title: 'SUCCESS'
            })
          : setNotification({
              ...notification,
              status: 'FAILURE',
              title: 'FAILED'
            });
      }
    } else if (option === 'article') {
      const res = await addArticle.mutateAsync(data);
      res
        ? setNotification({
            ...notification,
            status: 'SUCCESS',
            title: 'SUCCESS'
          })
        : setNotification({
            ...notification,
            status: 'FAILURE',
            title: 'FAILED'
          });
    } else if (option === 'summary') {
      const res = await uploadSummary.mutateAsync({
        ...summary,
        image: imageSelected
      });
      res
        ? setNotification({
            ...notification,
            status: 'SUCCESS',
            title: 'SUCCESS'
          })
        : setNotification({
            ...notification,
            status: 'FAILURE',
            title: 'FAILED'
          });
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-base200">
      {notification && (
        <div className="toast top-20">
          <div
            className={`alert ${
              notification.status === 'FAILURE'
                ? 'alert-error'
                : 'alert-success'
            }`}
          >
            <div>
              <span>{notification?.title}</span>
            </div>
          </div>
        </div>
      )}
      <div className="card bg-base100 shadow-xl">
        <div className="card-body items-center">
          <div className="tabs tabs-boxed w-fit">
            <h1
              onClick={() => setOption('category')}
              className={`tab ${option === 'category' ? 'tab-active' : ''}`}
            >
              Add Category
            </h1>
            <h1
              onClick={() => setOption('article')}
              className={`tab ${option === 'article' ? 'tab-active' : ''}`}
            >
              Add Article
            </h1>
            <h1
              onClick={() => setOption('summary')}
              className={`tab ${option === 'summary' ? 'tab-active' : ''}`}
            >
              Add Summary
            </h1>
          </div>
          {option === 'category' && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter Category</span>
              </label>
              <label className="input-group">
                <span>Category</span>
                <input
                  type="text"
                  value={category.name}
                  className="input-bordered input"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCategory({
                      ...category,
                      name: e.currentTarget.value
                    })
                  }
                />
              </label>
              <label className="label">
                <span className="label-text">Enter Background in HEX</span>
              </label>
              <label className="input-group">
                <span>Background</span>
                <input
                  type="text"
                  value={category.background}
                  className="input-bordered input"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCategory({
                      ...category,
                      background: e.currentTarget.value
                    })
                  }
                />
              </label>
            </div>
          )}
          {option === 'article' && (
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
                    setData({
                      ...data,
                      title: e.currentTarget.value
                    })
                  }
                />
              </label>
              <div className="py-2" />
              <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setData({
                    ...data,
                    categoryId: e.target.value
                  })
                }
                value={data.categoryId}
                className="select-accent select w-full max-w-xs"
              >
                <option disabled selected value={''}>
                  Categories
                </option>
                {categories?.map((name) => (
                  <option value={name.id} key={name.id}>
                    {name.name}
                  </option>
                ))}
              </select>

              <div className="py-2" />
              <textarea
                className="textarea-accent textarea"
                placeholder="Content"
                value={data.content}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setData({
                    ...data,
                    content: event.currentTarget.value
                  })
                }
              ></textarea>
            </div>
          )}
          {option === 'summary' && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter Title</span>
              </label>
              <label className="input-group">
                <span>Title</span>
                <input
                  type="text"
                  value={summary?.title}
                  placeholder="Science"
                  className="input-bordered input"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSummary({
                      ...summary,
                      title: e.currentTarget.value
                    })
                  }
                />
              </label>
              <div className="py-2" />
              <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSummary({
                    ...summary,
                    categoryId: e.target.value
                  })
                }
                value={summary.categoryId}
                className="select-accent select w-full max-w-xs"
              >
                <option disabled selected value={''}>
                  Categories
                </option>
                {categories?.map((name) => (
                  <option value={name.id} key={name.id}>
                    {name.name}
                  </option>
                ))}
              </select>

              <div className="py-2" />

              <input
                type="file"
                className="file-input-bordered file-input w-full max-w-xs"
                onChange={handleImageUpload}
              />

              <div className="py-2" />

              <textarea
                className="textarea-accent textarea"
                placeholder="Description"
                value={summary.description}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setSummary({
                    ...summary,
                    description: event.currentTarget.value
                  })
                }
              ></textarea>

              <div className="py-2" />
              <textarea
                className="textarea-accent textarea"
                placeholder="Content"
                value={summary.content}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setSummary({
                    ...summary,
                    content: event.currentTarget.value
                  })
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
