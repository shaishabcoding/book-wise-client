import { useLoaderData, useParams } from "react-router-dom";
import BookCard from "./components/BookCard";
import { Link } from "react-router-dom";

const Categories = () => {
  const books = useLoaderData();
  const { category } = useParams();
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        {category}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
        {books.map((book, idx) => (
          <BookCard key={idx} book={book} />
        ))}
        {books.length < 1 && (
          <div>
            No books found.{" "}
            <Link className="btn btn-xs btn-info" to="/books/new">
              Add new book
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
