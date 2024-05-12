import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import BookCard3 from "./components/BookCard3";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

  const handleDelete = (id, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/book/${email}/${id}`)
          .then(({ data }) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Success",
                text: "Book delete successfully!",
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
      }
    });
  };

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        My Books
      </h2>
      {loading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
        {books.map((book, idx) => (
          <BookCard3 key={idx} book={book} handleDelete={handleDelete} />
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

export default MyBooks;
