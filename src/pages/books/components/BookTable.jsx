import { MdStar, MdStarBorder } from "react-icons/md";
import Rating from "react-rating";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const BookTable = ({ books }) => {
  return (
    <div className="overflow-x-auto mx-4 lg:mx-0 rounded-md border">
      <table className="table table-xs md:table-md table-pin-rows table-pin-cols table-zebra">
        <thead>
          <tr>
            <th></th>
            <td>Book Name</td>
            <td>Author</td>
            <td>Rating</td>
            <td>Quantity</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {books?.map((spot, idx) => {
            const { _id, title, name, rating, quantity } = spot;
            return (
              <tr
                key={_id}
                className="dark:bg-gray-400 dark:text-white dark:even:text-gray-700"
              >
                <th className="dark:text-black dark:odd:bg-gray-400">
                  {idx + 1}
                </th>
                <td>{title}</td>
                <td>{name}</td>
                <td>
                  <Rating
                    className="md:text-2xl"
                    readonly
                    initialRating={rating}
                    emptySymbol={<MdStarBorder />}
                    fullSymbol={<MdStar />}
                  />
                </td>
                <td>{quantity}</td>
                <td>
                  <Link className="grid w-full" to={`/book/${_id}`}>
                    <button className="btn btn-xs btn-info md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
