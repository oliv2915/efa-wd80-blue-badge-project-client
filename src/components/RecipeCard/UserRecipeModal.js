import React, { useEffect, useState } from "react"
import genericRecipeImage from "../../assets/generic_recipe_img.svg";
import { Modal, ModalBody, Form, Row, Col, FormGroup, Input, Label, Card, CardImg, CardBody, Button } from "reactstrap"


export default function RecipeModal({isOpen, toggle, recipe}) {
    const [recipeId, setRecipeId] = useState(null);
    const [recipeOwner, setRecipeOwner] = useState("");
    const [recipeImg, setRecipeImg] = useState("")
    const [recipeName, setRecipeName] = useState("");
    const [recipeType, setRecipeType] = useState("");
    const [servings, setServings] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [draft, setDraft] = useState("");
    const [description, setDescription] = useState("");
    const [cookingDirections, setCookingDirections] = useState("");
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        setRecipeId(recipe.id);
        setRecipeOwner(recipe.user && recipe.user.username);
        setRecipeImg(recipe.recipeImg ? recipe.recipeImg : genericRecipeImage);
        setRecipeName(recipe.recipeName);
        setRecipeType(recipe.recipeType);
        setServings(recipe.servings);
        setPrepTime(recipe.prepTime);
        setDraft(recipe.draft);
        setDescription(recipe.description);
        setCookingDirections(recipe.cookingDirections);
        setIngredients(recipe.ingredients);
    }, [recipe.id, recipe.user, recipe.recipeImg, recipe.recipeName, recipe.recipeType, recipe.servings, recipe.prepTime, recipe.draft, recipe.description, recipe.cookingDirections, recipe.ingredients]);

    const profileImageClicked = (event) => {
        console.log("profile image clicked");
    }

    const deleteRecipeClicked = (event) => {
        console.log("delete recipe");
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="xl">
                <ModalBody>
                    <Card>
                        <CardImg top src={recipeImg} alt="recipe image" height="400" className="recipe-cover" style={{cursor: "pointer"}} onClick={profileImageClicked}/>
                        <CardBody>
                            <Form onSubmit={handleFormSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup className="form-floating">
                                            <Input type="text" id="recipe-name" placeholder={recipeName} value={recipeName} onChange={e => setRecipeName(e.target.value)}/>
                                            <Label htmlFor="recipe-name">Recipe Name</Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup className="form-floating">
                                            <Input type="text" id="recipe-type" placeholder={recipeType} value={recipeType} onChange={e => setRecipeType(e.target.value)}/>
                                            <Label htmlFor="recipe-type">Recipe Type</Label>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col md={4}>
                                        <FormGroup className="form-floating">
                                            <Input type="text" id="recipe-servings" placeholder={servings} value={servings} onChange={e => setServings(e.target.value)}/>
                                            <Label htmlFor="recipe-servings">Servings</Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup className="form-floating">
                                            <Input type="text" id="recipe-prep-time" placeholder={prepTime} value={prepTime} onChange={e => setPrepTime(e.target.value)}/>
                                            <Label htmlFor="recipe-prep-time">Prep Time</Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup className="form-floating">
                                            <select className="form-select" id="recipe-status" onChange={e => setDraft(e.target.value)} value={draft}>
                                                <option value={true}>Draft</option>
                                                <option value={false}>Public</option>
                                            </select>
                                            <Label htmlFor="recipe-status">Recipe Status</Label>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col md={12}>
                                        <FormGroup className="form-floating">
                                            <textarea className="form-control" value={description} id="recipe-description" placeholder={description} onChange={e => setDescription(e.target.value)}></textarea>
                                            <Label htmlFor="recipe-description">Description</Label>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col md={12}>
                                        <FormGroup className="form-floating">
                                            <textarea className="form-control" value={cookingDirections} id="recipe-cooking-directions" placeholder={cookingDirections} onChange={e => setCookingDirections(e.target.value)}></textarea>
                                            <Label htmlFor="recipe-cooking-directions">Cooking Directions</Label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={12}>
                                        <FormGroup className="form-floating">
                                            <Input type="text" id="recipe-ingredients" placeholder={ingredients} value={ingredients} onChange={e => setIngredients(e.target.value)}/>
                                            <Label htmlFor="recipe-ingredients">Ingredients</Label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={6}>
                                        <Button type="button" color="danger" onClick={deleteRecipeClicked}>Delete Recipe</Button>
                                    </Col>
                                    <Col md={6}>
                                        <Button type="submit" color="secondary">Update Recipe</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>
    )
}