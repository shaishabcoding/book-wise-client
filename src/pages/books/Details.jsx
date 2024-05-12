import { MdStar, MdStarBorder } from "react-icons/md";
import Rating from "react-rating";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const Details = () => {
  const book = useLoaderData();
  const { category, image, name, rating, title, description, _id } = book;
  const [quantity, setQuantity] = useState(book.quantity);

  const handleBorrow = () => {
    axios.put(`http://localhost:5000/book/${_id}/borrow`).then(({ data }) => {
      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Success",
          text: "Book borrowed successfully!",
          icon: "success",
          confirmButtonText: "Done",
        });
        setQuantity(quantity - 1);
      }
    });
  };

  return (
    <div className="m-4 mt-8">
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
              onClick={handleBorrow}
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
