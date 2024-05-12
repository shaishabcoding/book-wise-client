import { MdStar, MdStarBorder } from "react-icons/md";
import Rating from "react-rating";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../providers/auth/AuthProvider";

const Details = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);
  const { category, image, name, rating, title, description, _id } = book;
  const [quantity, setQuantity] = useState(book.quantity);
  const [returnDate, setReturnDate] = useState(new Date());
  const { register } = useForm({
    defaultValues: {
      email: user?.email,
      name: user?.displayName,
    },
  });

  const handleBorrow = () => {
    axios
      .put(`http://localhost:5000/book/${_id}/borrow`, {
        returnDate: returnDate.toLocaleDateString("en-US"),
        email: user?.email,
        name: user?.displayName,
      })
      .then(({ data }) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success",
            text: "Book borrowed successfully!",
            icon: "success",
            confirmButtonText: "Done",
          });
          setQuantity(quantity - 1);
        }
        console.log(data);
      });
  };

  return (
    <div className="m-4 mt-8">
      <dialog id="borrow-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-3xl mb-4">Borrow Book</h3>
          <div className="grid gap-4">
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
              Return
              <DatePicker
                selected={returnDate}
                dateFormat="MM/dd/yyyy"
                onChange={(date) => setReturnDate(date)}
              />
            </label>
            <label className="input bg-gray-50 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-400 input-bordered flex items-center gap-2">
              Email
              <input
                type="text"
                className="grow cursor-not-allowed"
                placeholder="Enter tourists spot name"
                {...register("email")}
                disabled
              />
            </label>
            <label className="input bg-gray-50 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-400 input-bordered flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow cursor-not-allowed"
                placeholder="Enter user name"
                {...register("name")}
                disabled
              />
            </label>
            <div className="modal-action m-0">
              <form method="dialog" className="w-full">
                <button
                  disabled={quantity < 1}
                  onClick={handleBorrow}
                  className="btn btn-primary w-full dark:bg-blue-500"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
      <h2 className="text-xl font-bold md:text-4xl text-center md:my-8 my-4 dark:border-gray-400 dark:text-white">
        View Details
      </h2>
      <div className="rounded-lg overflow-hidden flex flex-col lg:flex-row border border-gray-100 shadow-sm">
        <img
          src={image}
          className="flex-1 p-4 dark:bg-gray-400 bg-gray-200 aspect-video object-cover"
        />
        <div className="flex-1">
          <div className="p-3 flex-1 pb-5 bg-white dark:bg-gray-600 dark:text-white grow h-full flex flex-col">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className="flex flex-col gap-2 mt-3 grow">
              <p>{description}</p>
              <p>
                <b>Category : </b>
                {category}
              </p>
              <p>
                <b>Quantity : </b>
                {quantity}
              </p>
              <p>
                <b>Rating :</b>
                <Rating
                  className="translate-y-1"
                  readonly
                  initialRating={rating}
                  emptySymbol={<MdStarBorder />}
                  fullSymbol={<MdStar />}
                />
              </p>
              <p>
                <b>Author : </b> {name}
              </p>
            </div>
            <button
              disabled={quantity < 1}
              onClick={() =>
                document.getElementById("borrow-modal").showModal()
              }
              className="btn btn-primary mt-4 dark:bg-blue-500"
            >
              Borrow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
