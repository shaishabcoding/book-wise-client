import { Link } from "react-router-dom";
import getRandomColor from "../../../utils/getRandomColor";

const Categories = () => {
  return (
    <div>
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        Categories
      </h2>
      <div className="flex flex-wrap md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
        <Link to="/books/categories/Novel">
          <button
            className="btn text-white"
            style={{ backgroundColor: getRandomColor() }}
          >
            Novel
          </button>
        </Link>
        <Link to="/books/categories/Thriller">
          <button
            className="btn text-white"
            style={{ backgroundColor: getRandomColor() }}
          >
            Thriller
          </button>
        </Link>
        <Link to="/books/categories/History">
          <button
            className="btn text-white"
            style={{ backgroundColor: getRandomColor() }}
          >
            History
          </button>
        </Link>
        <Link to="/books/categories/Drama">
          <button
            className="btn text-white"
            style={{ backgroundColor: getRandomColor() }}
          >
            Drama
          </button>
        </Link>
        <Link to="/books/categories/SciFi">
          <button
            className="btn text-white"
            style={{ backgroundColor: getRandomColor() }}
          >
            SciFi
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
