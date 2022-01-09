import React, { useEffect } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = React.useRef("");

  const handleChange = () => {
    const newValue = searchValue.current.value;
    setSearchTerm(newValue);
  };

  // if the user hits enter then the page wont refresh (prevent default form behaviour)
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    searchValue.current.focus();
  }, []);

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input
            id="name"
            type="text"
            name="name"
            ref={searchValue}
            onChange={handleChange}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
