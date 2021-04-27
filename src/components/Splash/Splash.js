import React, {useEffect, useState} from "react";
import {Row } from "reactstrap";
import RecipeCard from "../RecipeCard/RecipeCard";

export default function Splash() {
    const [recipes, setRecipes] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/recipe/published`)
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