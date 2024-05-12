import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { MdStar, MdStarBorder } from "react-icons/md";
import Rating from "react-rating";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const NewBook = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(3);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: user?.email,
    },
  });

  const handleFormSubmit = handleSubmit((data) => {
    data.quantity = parseInt(data.quantity);
    axios
      .post("http://localhost:5000/books/new", { ...data, rating })
      .then(({ data }) => {
        if (data.insertedId) {
          reset();
          Swal.fire({
            title: "Success",
            text: "New Book insert successfully!",
            icon: "success",
            confirmButtonText: "Done",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err);
      });
  });
  return (
    <div className="m-4 p-6 lg:mx-0 rounded-lg lg:pb-10 border bg-gradient-to-bl from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <h2 className="text-2xl lg:mt-8 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        Add Book
      </h2>
      <div className="w-full lg:px-12 mx-auto">
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
              Image
              <input
                type="url"
                className="grow"
                placeholder="Enter Image Url"
                required
                {...register("image")}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
              Name
              <input
                type="text"
                className="grow"
                placeholder="Enter book name"
                {...register("title")}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
              Quantity
              <input
                type="number"
                className="grow"
                placeholder="Enter quantity of books"
                {...register("quantity")}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
              Category
              <select
                required
                {...register("category")}
                className="grow border-0 outline-0 bg-transparent dark:bg-gray-500 dark:text-gray-200"
              >
                <option value="Novel">Novel</option>
                <option value="Thriller">Thriller</option>
                <option value="History">History</option>
                <option value="Drama">Drama</option>
                <option value="SciFi">SciFi</option>
              </select>
            </label>
            <label className="input hidden input-bordered items-center gap-2 dark:bg-gray-500 dark:border-gray-400 disabled bg-white">
              Email
              <input
                type="text"
                className="grow cursor-not-allowed"
                placeholder="Enter tourists spot name"
                {...register("email")}
                disabled
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
              Author
              <input
                type="text"
                className="grow"
                placeholder="Enter user name"
                {...register("name")}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
              Rating
              <Rating
                onChange={setRating}
                initialRating={rating}
                className="text-xl"
                emptySymbol={<MdStarBorder />}
                fullSymbol={<MdStar />}
              />
            </label>
          </div>
          <input
            required
            {...register("description")}
            className="textarea textarea-bordered w-full mt-4 dark:bg-gray-500 dark:border-gray-400"
            placeholder="Enter short description"
          />
          <textarea
            required
            {...register("long_description")}
            className="textarea textarea-bordered w-full h-40 my-4 dark:bg-gray-500 dark:border-gray-400"
            placeholder="Enter Long description"
          ></textarea>
          <button className="btn btn-primary w-full" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBook;
