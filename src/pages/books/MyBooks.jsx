import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import BookCard3 from "./components/BookCard3";
import Loading from "../../components/Loading";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/books/my").then(({ data }) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        My Books
      </h2>
      {loading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
        {books.map((book, idx) => (
          <BookCard3 key={idx} book={book} />
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
