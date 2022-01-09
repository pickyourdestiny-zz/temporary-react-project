import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const getCocktails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;

      // the fetch can either return an array of drinks or null (nothing matching the search term)

      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });

        // this creates a modified array with only the keys or properties we want (and renamed)
        setCocktails(newCocktails);

        // if drinks returns null then set the array to empty for the conditional return
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error); // network error only
    }
  }, [searchTerm]);

  useEffect(() => {
    getCocktails();
  }, [searchTerm, getCocktails]); // when the searchTerm changes, the cocktails are fetched again

  return (
    <AppContext.Provider
      value={{ loading, searchTerm, cocktails, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
