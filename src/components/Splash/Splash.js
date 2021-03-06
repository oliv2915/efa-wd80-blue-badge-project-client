import React, {useEffect, useState} from "react";
import {Row, Button, Input} from "reactstrap";
import RecipeCard from "../RecipeCard/RecipeCard";
import splashHero from "../../assets/mealBOX_SplashHero.jpg"

export default function Splash() {
    const [recipes, setRecipes] = useState();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (!searchText) {
            fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/recipe/published`)
                .then(res => res.json())
                .then(setRecipes)
                .catch(console.error)
        }
    }, [searchText])

    useEffect(() => {

    }, [recipes])

    const handleSearch = (event) => {
        event.preventDefault()
        let searchQueryArray = searchText.split(",")
        let searchQueryString = "?"
        searchQueryArray.map((string, idx) => {
            if (idx === 0) {
                return searchQueryString += `ingredients[]=${string}`
            } else {
                return searchQueryString += `&ingredients[]=${string}`
            }
        })
        try {
            fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/recipe/published${searchQueryString}`)
            .then(res => res.json())
            .then(setRecipes)
            .catch(console.error)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Row className="mb-3">
                <img className="splash-hero" src={splashHero} width="100%" alt="man prepping ingredients to cook"/>
            </Row>
            <Row className="mb-3">
                <div className="col-md-6 offset-md-4">
                    <form className="row" onSubmit={handleSearch}>
                        <div className="col-6">
                            <Input className="splash-search-field form-control" type="search" id="search" placeholder="Search" value={searchText} onChangeCapture={e => setSearchText(e.target.value)}/>
                        </div>

                        <div className="col-1">
                            <Button type="submit" className="btn btn-primary">Search</Button>
                        </div>
                    </form>
                </div>
            </Row>
            <Row>
                {recipes && recipes.length > 0 ? recipes.map((recipe, idx) => {return <RecipeCard key={idx} recipe={recipe}/>}) : null}
            </Row>
        </div>
    )
}