import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/Loading";
import BookCard2 from "./components/BookCard2";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Borrowed = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/books/borrowed").then(({ data }) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const handleReturn = (id) => {
    axios
      .put(`http://localhost:5000/book/${id}/return`)
      .then(({ data }) => {
        if (data.success) {
          Swal.fire({
            title: "Success",
            text: "Book return successfully!",
            icon: "success",
            confirmButtonText: "Done",
          });
          const newBooks = books.filter((book) => book._id !== id);
          setBooks(newBooks);
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err);
      });
  };

  console.log(books);
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        Borrowed Books
      </h2>
      {loading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
        {books.map((book, idx) => (
          <BookCard2 key={idx} book={book} handleReturn={handleReturn} />
        ))}
      </div>
    </div>
  );
};

export default Borrowed;