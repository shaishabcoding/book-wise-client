import { useParams } from "react-router-dom";
import BookCard from "./components/BookCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";

const Categories = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-wise-316.vercel.app/books/categories/${category}`)
      .then(({ data }) => {
        setBooks(data);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        {category}
      </h2>
      {loading ? (
        <Loading />
      ) : books.length < 1 ? (
        <div>
          No books found.{" "}
          <Link className="btn btn-xs btn-info" to="/books/new">
            Add new book
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
          {books.map((book, idx) => (
            <BookCard key={idx} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
