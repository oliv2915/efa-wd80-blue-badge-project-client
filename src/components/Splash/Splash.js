import React, {useEffect, useState} from "react";
import {Row } from "reactstrap";
import RecipeCard from "../RecipeCard/RecipeCard";
import API_URL from "../../helpers/environment";

export default function Splash() {
    const [recipes, setRecipes] = useState();

    useEffect(() => {
        fetch(`${API_URL}/recipe/published`)
            .then(res => res.json())
            .then(setRecipes)
            .catch(console.log)
    }, [])

    return (
        <Row>
           {recipes && recipes.length > 0 ? recipes.map((recipe, idx) => {return <RecipeCard key={idx} recipe={recipe} />}) : null}
        </Row>
    )
}