import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Borrowed = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/books/borrowed").then(({ data }) => {
      console.log(data);
    });
  }, []);
  return (
    <div>
      <h2>jhhjkhj</h2>
    </div>
  );
};

export default Borrowed;
