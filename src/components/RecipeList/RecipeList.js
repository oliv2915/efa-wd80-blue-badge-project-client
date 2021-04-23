import React, { useState } from "react";
import { Row } from "reactstrap";
import Recipe from "./Recipe/Recipe";

export default function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    const recipe = {
        recipeName: "Beef Tips",
        recipeType: 30,
        description: "BBQ Beef tips with green onions",
        cookingDirections: "Ipsom lorem bba ally kitchen food drinks",
        servings: 15,
        prepTime: "2 Hours"
    }

    return (
        <Row>
            <Recipe recipe={recipe} />
            <Recipe recipe={recipe} />
            <Recipe recipe={recipe} />
            <Recipe recipe={recipe} />
            <Recipe recipe={recipe} />
            <Recipe recipe={recipe} />
            <Recipe recipe={recipe} />
            <Recipe recipe={recipe} />
        </Row>
    )
}