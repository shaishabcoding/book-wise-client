import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import BookCard from "../../books/components/BookCard";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://book-wise-316.vercel.app/books/popular")
      .then(({ data }) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        Popular Books
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
          {books.length < 1 ? (
            <div>
              No books found.{" "}
              <Link className="btn btn-xs btn-info" to="/books/new">
                Add new book
              </Link>
            </div>
          ) : (
            books.map((book, idx) => <BookCard key={idx} book={book} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Books;
