import {
  MdOutlineFileDownloadDone,
  MdShoppingCart,
  MdStar,
  MdStarBorder,
} from "react-icons/md";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { useRef } from "react";

const Details = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const borrowModalRef = useRef();
  const { id } = useParams();
  const { user } = useAuth();
  const { category, image, name, rating, title, long_description, _id } = book;
  const [quantity, setQuantity] = useState(0);
  const [returnDate, setReturnDate] = useState(new Date());
  const { register } = useForm({
    defaultValues: {
      email: user?.email,
      name: user?.displayName,
    },
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-wise-316.vercel.app/book/${id}`)
      .then(({ data }) => {
        setBook(data);
        setQuantity(data.quantity);
        setLoading(false);
      });
  }, [id]);

  const handleBorrow = () => {
    axios
      .put(`https://book-wise-316.vercel.app/book/${_id}/borrow`, {
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
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <div className="m-4 mt-8">
      <dialog ref={borrowModalRef} className="modal">
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
                  Confirm <MdOutlineFileDownloadDone />
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
      <h2 className="text-xl font-bold md:text-4xl text-center md:my-8 my-4 dark:border-gray-400 dark:text-white">
        View Details
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="rounded-lg overflow-hidden flex flex-col lg:flex-row border border-gray-100 shadow-sm">
          <img
            src={image}
            className="flex-1 p-4 dark:bg-gray-400 bg-gray-200 aspect-video object-cover"
          />
          <div className="flex-1">
            <div className="p-3 flex-1 pb-5 bg-white dark:bg-gray-600 dark:text-white grow h-full flex flex-col">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <div className="flex flex-col gap-2 mt-3 grow">
                <p>{long_description}</p>
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
                onClick={() => borrowModalRef.current.showModal()}
                className="btn btn-primary mt-4 dark:bg-blue-500"
              >
                Borrow <MdShoppingCart />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
