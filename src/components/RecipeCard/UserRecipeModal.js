import React, { useEffect, useState } from "react"
import { Modal, ModalBody, Form, Row, Col, FormGroup, Input, Label } from "reactstrap"

export default function RecipeModal({isOpen, toggle, recipe}) {
    const [recipeId, setRecipeId] = useState(null);
    const [recipeName, setRecipeName] = useState("");
    const [recipeType, setRecipeType] = useState("");
    const [servings, setServings] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [draft, setDraft] = useState("");
    const [description, setDescription] = useState("");
    const [cookingDirections, setCookingDirections] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [recipeOwner, setRecipeOwner] = useState("");

    useEffect(() => {
        setRecipeId(recipe.id);
        setRecipeOwner(recipe.user && recipe.user.username);
        setRecipeName(recipe.recipeName);
        setRecipeType(recipe.recipeType);
        setServings(recipe.servings);
        setPrepTime(recipe.prepTime);
        setDraft(recipe.draft);
        setDescription(recipe.description);
        setCookingDirections(recipe.cookingDirections);
        setIngredients(recipe.ingredients);
    }, [recipe.id, recipe.user, recipe.recipeName, recipe.recipeType, recipe.servings, recipe.prepTime, recipe.draft, recipe.description, recipe.cookingDirections, recipe.ingredients])

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="xl">
                <ModalBody>
                    <Form>
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
                                    <select className="form-select" id="recipe-status" onChange={e => setDraft(e.target.value)}>
                                        <option selected={draft === true} value={true}>Draft</option>
                                        <option selected={draft === false} value={false}>Public</option>
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
                                    {console.log(ingredients.toString())}
                                    <Input type="text" id="recipe-ingredients" placeholder={recipe.ingredients} value={recipe.ingredients} disabled/>
                                    <Label htmlFor="recipe-ingredients">Ingredients</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
    )
}