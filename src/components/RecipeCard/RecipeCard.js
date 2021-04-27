import React, {useState, useContext} from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Col} from "reactstrap";
import genericRecipeImage from "../../assets/generic_recipe_img.svg";
import UserRecipeModal from "./UserRecipeModal";
import PublicRecipeModal from "./PublicRecipeModal";
import UserContext from "../../context/UserContext";
import { useParams } from "react-router-dom";

export default function Recipe({recipe, onExit}) {
    const {username} = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const toggle = () => setModalIsOpen(!modalIsOpen);
    const userContext = useContext(UserContext);

    return (
        <Col sm={12} md={6} lg={4} xl={3}>            
            <Card className="recipe-card mb-3" onClick={toggle} style={{cursor: "pointer"}}>
                <CardImg className="recipe-card-image" src={!recipe.recipeImageURL ? genericRecipeImage : recipe.recipeImageURL} alt="recipe image" />
                <CardBody className="recipe-card-body">
                    <CardTitle tag="h5"><b>{recipe.recipeName}</b></CardTitle>
                    <CardText>{recipe.description}</CardText>
                </CardBody>
            </Card>
            {/* If user isAuth, show UserRecipeModal else PublicRecipeModal */}
            {userContext.isAuth && userContext.user.username === username ? <UserRecipeModal isOpen={modalIsOpen} toggle={toggle} recipe={recipe} onExit={onExit} /> :
                                    <PublicRecipeModal isOpen={modalIsOpen} toggle={toggle} recipe={recipe}/>}
        </Col>
    )
}