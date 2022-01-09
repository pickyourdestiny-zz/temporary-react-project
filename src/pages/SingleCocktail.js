import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";

const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  const getSingleCocktail = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}${id}`);
      const data = await response.json();

      if (data.drinks) {
        const item = data.drinks[0];

        let ingredients = [];
        for (const key in item) {
          if (key.startsWith("strIngredient") && item[key]) {
            ingredients.push(`${item[key]}`);
          }
        }
        const ingredientlist = ingredients.join(", ");
        const {
          strDrink: name,
          strCategory: category,
          strAlcoholic: info,
          strDrinkThumb: image,
          strGlass: glass,
          strInstructions: instructions,
        } = item;

        const newcocktail = {
          name,
          category,
          image,
          info,
          glass,
          instructions,
          ingredientlist,
        };

        setCocktail(newcocktail);
      } else {
        setCocktail(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getSingleCocktail(id);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (cocktail) {
    const { name, category, info, glass, image, instructions, ingredientlist } =
      cocktail;
    return (
      <section className="section cocktail-section">
        <Link className="btn btn-primary" to="/">
          back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name} />
          <div className="drink-info">
            <p>
              <span className="drink-data">name :</span> {name}
            </p>
            <p>
              <span className="drink-data">category :</span> {category}
            </p>
            <p>
              <span className="drink-data">info :</span> {info}
            </p>
            <p>
              <span className="drink-data">glass :</span> {glass}
            </p>
            <p>
              <span className="drink-data">instructions :</span> {instructions}
            </p>
            <p>
              <span className="drink-data">ingredients:</span> {ingredientlist}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <h2 className="section-title">no cocktail to display</h2>;
};

export default SingleCocktail;
