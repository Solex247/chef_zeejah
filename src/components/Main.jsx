import { useState, useEffect, useRef } from "react";
import IngredientsList from "./IngredientsList";
import ZeejahRecipe from "./ZeejahRecipe.jsx";
import { getRecipeFromMistral } from "../AI_model/AI_model.js";

const Main = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const recipeSection = useRef(null);

  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [recipe]);

  // this is the API call

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);

    if (recipeMarkdown) {
      setRecipe(recipeMarkdown);
    } else {
      setRecipe("Sorry, I couldn't generate a recipe at this time.");
    }
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="add at least 4 ingredients to generate a recipe"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
        />
      )}

      {recipe ? <ZeejahRecipe recipe={recipe} /> : null}
    </main>
  );
};

export default Main;
