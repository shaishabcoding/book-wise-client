import { useState } from "react";
import axios from "axios";

const Autocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    try {
      const response = await axios.get(
        "https://book-wise-316.vercel.app/books/suggestions",
        {
          params: { query: value },
        }
      );
      setSuggestions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = () => {
    onSelect(query);
  };

  return (
    <div className="autocomplete">
      <div className="join">
        <div>
          <div>
            <input
              className="input input-bordered join-item border-primary"
              type="text"
              list="suggestions"
              value={query}
              onChange={handleChange}
              placeholder="Search for books..."
            />
          </div>
        </div>
        <div className="indicator">
          <button onClick={handleSelect} className="btn join-item btn-primary">
            Search
          </button>
        </div>
      </div>
      <datalist id="suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion.title}>
            {suggestion.title}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default Autocomplete;
