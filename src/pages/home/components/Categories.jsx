import { Link } from "react-router-dom";
import getRandomColor from "../../../utils/getRandomColor";

const Categories = () => {
  const categories = ["Thriller", "Novel", "History", "Drama", "SciFi"];
  return (
    <div>
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        Categories
      </h2>
      <div className="flex flex-wrap md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
        {categories.map((category, idx) => (
          <Link
            key={idx}
            style={{ backgroundColor: getRandomColor() }}
            className="rounded-xl"
            to={`/books/categories/${category}`}
          >
            <button className="btn bg-black/30 dark:bg-black/50 text-white">
              {category}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
