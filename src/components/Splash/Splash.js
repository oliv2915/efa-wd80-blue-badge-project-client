import React, {useEffect, useState} from "react";
import {Row} from "reactstrap";
import RecipeCard from "../RecipeCard/RecipeCard";
import splashHero from "../../assets/mealBOX_SplashHero.jpg"

export default function Splash() {
    const [recipes, setRecipes] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/recipe/published`)
            .then(res => res.json())
            .then(setRecipes)
            .catch(console.error)
    }, [])

    return (
        <div>
            <Row className="mb-3">
                <img className="splash-hero" src={splashHero} width="100%" alt="man prepping ingredients to cook"/>
            </Row>
            <Row>
                {recipes && recipes.length > 0 ? recipes.map((recipe, idx) => {return <RecipeCard key={idx} recipe={recipe}/>}) : null}
            </Row>
        </div>
    )
}