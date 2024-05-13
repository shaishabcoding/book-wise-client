/* eslint-disable react/prop-types */
import { MdStar, MdStarBorder } from "react-icons/md";
import { RiArrowGoBackLine } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import Rating from "react-rating";
import { Link } from "react-router-dom";

const BookCard = ({ book, handleReturn }) => {
  const { category, image, name, rating, title, _id, returnDate, borrowDate } =
    book;

  return (
    <div className="rounded-lg h-full overflow-hidden flex flex-col border dark:border-gray-400 border-gray-200 shadow-sm">
      <div className="relative border-b border-gray-400">
        <img src={image} className="w-full aspect-video bg-gray-200" />
        <div className="absolute top-3 right-3 flex gap-2">
          <p className="bg-green-200 rounded-md px-2 text-sm border border-gray-400">
            {category}
          </p>
          <p className="bg-pink-200 rounded-md px-2 text-sm border border-gray-400">
            <Rating
              readonly
              initialRating={rating}
              emptySymbol={<MdStarBorder />}
              fullSymbol={<MdStar />}
            />
          </p>
        </div>
      </div>
      <div className="p-3 pb-5 bg-white dark:bg-gray-600 dark:text-white grow flex flex-col">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="font-bold my-1">Author : {name}</p>
        <p className="font-bold">Borrowed : {borrowDate}</p>
        <p className="font-bold my-1">Return : {returnDate}</p>
        <p className="font-bold mb-4">Category : {category}</p>
        <div className="grid gap-3">
          <Link className="grid w-full" to={`/book/${_id}`}>
            <button className="btn btn-accent btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400">
              View Details <TbListDetails />
            </button>
          </Link>
          <button
            onClick={() => handleReturn(_id)}
            className="btn btn-info btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
          >
            Return <RiArrowGoBackLine />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
