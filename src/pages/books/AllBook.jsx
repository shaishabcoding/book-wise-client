import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import Loading from "../../components/Loading";
import axios from "axios";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";
import BookTable from "./components/BookTable";

const AllBook = () => {
  const [books, setBooks] = useState([]);
  const [allBook, setAllBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAllShown, setIsAllShown] = useState(false);
  const [isCardView, setIsCardView] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/books").then(({ data }) => {
      setBooks(data);
      setAllBook(data);
      setLoading(false);
    });
  }, []);

  const handleAvailableBook = () => {
    const availableBooks = allBook.filter((book) => book.quantity > 0);
    setBooks(availableBooks);
    setIsAllShown(true);
  };
  const handleAllBook = () => {
    setBooks(allBook);
    setIsAllShown(false);
  };

  const handleCardView = () => {
    setIsCardView(true);
  };
  const handleTableView = () => {
    setIsCardView(false);
  };

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        All Tourists Spot
      </h2>
      <div className="text-center gap-3 flex-wrap mb-8 lg:mb-16 flex items-center justify-center">
        {isAllShown ? (
          <button onClick={handleAllBook} className="btn btn-primary">
            Show all books
          </button>
        ) : (
          <button onClick={handleAvailableBook} className="btn btn-primary">
            Show available books
          </button>
        )}
        <div className="join bg-gray-100 dark:bg-gray-700">
          <button
            onClick={handleCardView}
            className={`btn btn-ghost join-item ${
              isCardView && "bg-blue-400 dark:bg-blue-600"
            }`}
          >
            <BsFillGrid3X3GapFill />
          </button>
          <button
            onClick={handleTableView}
            className={`btn btn-ghost join-item ${
              !isCardView && "bg-blue-400 dark:bg-blue-600"
            }`}
          >
            <FaTableList />
          </button>
        </div>
      </div>
      {loading && <Loading />}
      {isCardView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
          {books.map((book, idx) => (
            <BookCard key={idx} book={book} />
          ))}
        </div>
      ) : (
        <BookTable books={books} />
      )}
    </div>
  );
};

export default AllBook;
