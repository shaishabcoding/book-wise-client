import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  MdOutlineDriveFileRenameOutline,
  MdStar,
  MdStarBorder,
} from "react-icons/md";
import Rating from "react-rating";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Loading from "../../components/Loading";

const UpdateBook = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [rating, setRating] = useState(4);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-wise-316.vercel.app/book/${id}`)
      .then(({ data }) => {
        setLoading(false);
        setRating(data?.rating);
        setValue("title", data?.title);
        setValue("image", data?.image);
        setValue("name", data?.name);
        setValue("email", data?.email);
        setValue("quantity", data?.quantity);
        setValue("category", data?.category);
        setValue("description", data?.description);
        setValue("long_description", data?.long_description);
        setValue("_id", data?._id);
      });
  }, [id]);

  const handleFormSubmit = handleSubmit((data) => {
    data.quantity = parseInt(data.quantity);
    const id = data._id;
    delete data._id;
    data.rating = rating;
    axios
      .put(`https://book-wise-316.vercel.app/book/${id}/edit`, data)
      .then(({ data }) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Success",
            text: "Book Update successfully!",
            icon: "success",
            confirmButtonText: "Done",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  });
  return (
    <div className="m-4 p-6 lg:mx-0 rounded-lg lg:pb-10 border bg-gradient-to-bl from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <h2 className="text-2xl lg:mt-8 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        Update Book
      </h2>
      {loading ? (
        <Loading />
      ) : (
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
              Update <MdOutlineDriveFileRenameOutline />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
