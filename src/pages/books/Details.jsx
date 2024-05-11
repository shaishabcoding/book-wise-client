import { useLoaderData } from "react-router-dom";

const Details = () => {
  const book = useLoaderData();
  const { category, image, name, rating, title, description, _id } = book;
  console.log(book);
  return (
    <div className="m-4 mt-8">
      <h2 className="text-xl font-bold md:text-4xl text-center md:my-8 my-4 dark:border-gray-400 dark:text-white">
        View Details
      </h2>
      <div className="rounded-lg overflow-hidden flex flex-col lg:flex-row border border-gray-100 shadow-sm">
        <img src={image} className="flex-1 p-4 aspect-video object-cover" />
        <div className="flex-1">
          <div className="p-3 flex-1 pb-5 bg-white dark:bg-gray-600 dark:text-white grow flex flex-col">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className="flex flex-col gap-2 mt-3">
              <p>{description}</p>
              <p>
                <b>Category : </b>
                {category}
              </p>
              <p>
                <b>Author : </b> {name}
              </p>
            </div>
          </div>
          <button className="btn btn-primary mb-4 mx-4">Borrow</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
