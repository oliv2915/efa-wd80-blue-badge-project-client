import React, { useEffect, useState } from "react";
import genericRecipeImage from "../../assets/generic_recipe_img.svg";
import { Modal, ModalBody, Row, Col, Card, CardTitle, CardText, CardImg, CardBody } from "reactstrap";

export default function PublicRecipeModal({isOpen, toggle, recipe}) {
    const [recipeId, setRecipeId] = useState(null);
    const [recipeOwner, setRecipeOwner] = useState("");
    const [recipeImg, setRecipeImg] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [recipeType, setRecipeType] = useState("");
    const [servings, setServings] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [description, setDescription] = useState("");
    const [cookingDirections, setCookingDirections] = useState("");
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        setRecipeId(recipe.id);
        setRecipeOwner(recipe.user && recipe.user.username);
        setRecipeImg(recipe.recipeImageURL ? recipe.recipeImageURL : genericRecipeImage);
        setRecipeName(recipe.recipeName);
        setRecipeType(recipe.recipeType);
        setServings(recipe.servings);
        setPrepTime(recipe.prepTime);
        setDescription(recipe.description);
        setCookingDirections(recipe.cookingDirections);
        setIngredients(recipe.ingredients);
    }, [recipe.id, recipe.user, recipe.recipeImg, recipe.recipeName, recipe.recipeType, recipe.servings, recipe.prepTime, recipe.description, recipe.cookingDirections, recipe.ingredients]);


    return (
        <Modal isOpen={isOpen} toggle={toggle} size="xl">
            <ModalBody>
                <Card>
                    <CardImg className="recipe-cover" top src={recipeImg} alt="recipe image" style={{cursor: "pointer"}}/>
                    <CardBody className="recipe-card-body mt-3">
                        <CardTitle className="recipe-name" tag="h2">{recipe.recipeName}</CardTitle>
                        <CardText style={{textAlign: "center"}}>Description: {recipe.description}</CardText>
                        <CardText style={{textAlign: "center"}}>Category: <b>{recipe.recipeType}</b> | Servings: <b>{recipe.servings}</b> | Time: <b>{recipe.prepTime}</b></CardText>
                        <br/>
                        <Row className="mt-3">
                            <Col md={6}>
                                <CardText><b>Ingredients</b></CardText>
                                <ul>{recipe.ingredients.map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })}</ul>
                            </Col>
                            <Col md={6}>
                            <CardText><b>Directions</b></CardText>
                                <p>{recipe.cookingDirections}</p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    )
}