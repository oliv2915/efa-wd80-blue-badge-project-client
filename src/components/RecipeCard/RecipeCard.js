import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Col } from "reactstrap";

export default function Recipe({recipe}) {


    return (
        <Col sm={12} md={6} lg={4} xl={3}>
            <Card className="recipe-card mb-3">
                <CardImg className="recipe-card-image" src={recipe.recipeImageURL} alt="recipe image"/>
                <CardBody className="recipe-card-body">
                    <CardTitle tag="h5">{recipe.recipeName}</CardTitle>
                    <CardText>{recipe.description}</CardText>
                </CardBody>
            </Card>
        </Col>
    )
}