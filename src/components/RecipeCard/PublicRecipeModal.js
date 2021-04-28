import React from "react";
import genericRecipeImage from "../../assets/generic_recipe_img.svg";
import { Modal, ModalBody, Row, Col, Card, CardTitle, CardText, CardImg, CardBody } from "reactstrap";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export default function PublicRecipeModal({isOpen, toggle, recipe}) {
    const {username} = useParams();
    
    return (
        <Modal isOpen={isOpen} toggle={toggle} size="xl">
            <ModalBody>
                <Card>
                    <CardImg className="recipe-cover" top src={recipe.recipeImageURL ? recipe.recipeImageURL : genericRecipeImage} alt="recipe image"/>
                    <CardBody className="public-recipe-card-body mt-3">
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
                        <br/>
                        <Row>
                        <CardText style={{textAlign: "center"}}>Recipe submitted by: <b><a style={{color: "white"}} href={`/profile/${username ? username : recipe.user.username}`}>{username ? username : recipe.user.username}</a></b></CardText>
                        </Row>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    )
}