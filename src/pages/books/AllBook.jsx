import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import Loading from "../../components/Loading";
import axios from "axios";

const AllBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/books").then(({ data }) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  console.log(books);
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        All Tourists Spot
      </h2>
      {loading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
        {books.map((book, idx) => (
          <BookCard key={idx} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBook;
