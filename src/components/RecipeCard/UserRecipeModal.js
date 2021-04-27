import React, { useEffect, useState, useContext, useRef } from "react"
import genericRecipeImage from "../../assets/generic_recipe_img.svg";
import { Modal, ModalBody, Form, Row, Col, FormGroup, Input, Label, Card, CardImg, CardBody, Button, Alert, FormFeedback } from "reactstrap"
import UserContext from "../../context/UserContext"
import API_URL from "../../helpers/environment";


export default function RecipeModal({isOpen, toggle, recipe, onExit}) {
    const userContext = useContext(UserContext);
    const [recipeId, setRecipeId] = useState(null);
    const [recipeOwner, setRecipeOwner] = useState("");
    const [recipeImg, setRecipeImg] = useState("")
    const [recipeName, setRecipeName] = useState("");
    const [recipeType, setRecipeType] = useState("");
    const [servings, setServings] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [draft, setDraft] = useState(true);
    const [description, setDescription] = useState("");
    const [cookingDirections, setCookingDirections] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const [imgFile, setImgFile] = useState(null);
    const inputFile = useRef(null);

    const [validated, setValidated] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [submitError, setSubmitError] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const validateFields = () => {
        const errors = [];

        if (recipeName.length < 1) {
            errors.push("recipeName");
        }
        if (recipeType.length < 1) {
            errors.push("recipeType");
        }
        if (prepTime.length < 0) {
            errors.push("prepTime");
        }
        if (isNaN(servings) || servings.length < 1) {
            errors.push("servings");
        }
        if (description.length < 1) {
            errors.push("description");
        }
        if (cookingDirections.length < 1) {
            errors.push("cookingDirections");
        }
        if (ingredients.length < 0) {
            errors.push("ingredients");
        }

        if (errors.length > 0) {
            setValidated(false);
            setValidationErrors(errors);
        } else {
            setValidated(true);
            setValidationErrors(errors)
        }
    }

    useEffect(() => {
        validateFields();
    }, [recipeName, recipeType, servings, prepTime, draft, description, cookingDirections, ingredients])


    useEffect(() => {
        setRecipeId(recipe.id);
        setRecipeImg(recipe.recipeImageURL ? recipe.recipeImageURL : genericRecipeImage);
        setRecipeName(recipe.recipeName);
        setRecipeType(recipe.recipeType);
        setServings(recipe.servings);
        setPrepTime(recipe.prepTime);
        console.log(recipe)
        setDraft(recipe.draft);
        setDescription(recipe.description);
        setCookingDirections(recipe.cookingDirections);
        setIngredients(recipe.ingredients.toString());
    }, [recipe.id, recipe.recipeImg, recipe.recipeName, recipe.recipeType, recipe.servings, recipe.prepTime, recipe.draft, recipe.description, recipe.cookingDirections, recipe.ingredients]);


    const deleteRecipeClicked = (event) => {
        console.log("delete recipe");
    }

    const recipeImageClicked = () => {
        inputFile.current.click();
    }

    const handleImageUpload = (event) => {
        setImgFile(event.target.files[0])
        setRecipeImg(URL.createObjectURL(event.target.files[0]))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        validateFields();

        // console.log(JSON.stringify({
        //     recipe: {
        //         recipeName: recipeName,
        //         recipeType: recipeType,
        //         servings: servings,
        //         prepTime: prepTime,
        //         description: description,
        //         draft: draft,
        //         cookingDirections: cookingDirections,
        //         ingredients: ingredients.split(",")
        //     }
        // }))

        if (validated) {
            try {
                const updateRecipe = await fetch(`${API_URL}recipe/update/${recipeId}`, {
                    method: "PUT",                    
                    body: JSON.stringify({
                        recipe: {
                            recipeName: recipeName,
                            recipeType: recipeType,
                            servings: servings,
                            prepTime: prepTime,
                            description: description,
                            draft: draft,
                            cookingDirections: cookingDirections,
                            ingredients: ingredients.split(",")
                        }
                    }),
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userContext.token}`
                    })
                }).then(res => res.json());

                if ('recipe' in updateRecipe) {
                    if (imgFile) {
                        const formData = new FormData();
                        formData.append('image', imgFile);

                        await fetch(`${API_URL}upload?type=recipe&recipe=${updateRecipe.recipe.id}`, {
                            method: "POST",
                            body: formData,
                            headers: new Headers({
                                "Authorization": `Bearer ${userContext.token}`
                            })
                        }).then(res => {
                            if (res.status !== 200) {
                                setSubmitError(true);
                                setAlertMessage("There was an issue uploading your photo.");
                            } else {
                                toggle();
                            }
                        })
                    } else {
                        toggle();
                    }
                } else {
                    setSubmitError(true);
                    setAlertMessage("There was a problem with updating your recipe. Please check your entries and try again.")
                }

            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} onExit={onExit} size="xl">
                <ModalBody>
                    <Card>
                    <input type="file" style={{display: "none"}} ref={inputFile} onChange={handleImageUpload}/>
                        <CardImg top src={recipeImg} alt="recipe image" height="400" className="recipe-cover" style={{cursor: "pointer"}} onClick={recipeImageClicked}/>
                        <CardBody>
                            {submitError ? <Alert color="danger">{alertMessage}</Alert> : null}
                            <Form onSubmit={handleFormSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup className="form-floating">
                                            <Input type="text" id="recipe-name" placeholder={recipeName} value={recipeName} onChange={e => setRecipeName(e.target.value)}/>
                                            <Label htmlFor="recipe-name">Recipe Name</Label>
                                            {validationErrors.includes("recipeName") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup className="form-floating">
                                            <Input type="text" id="recipe-type" placeholder={recipeType} value={recipeType} onChange={e => setRecipeType(e.target.value)}/>
                                            <Label htmlFor="recipe-type">Recipe Type</Label>
                                            {validationErrors.includes("recipeType") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col md={4}>
                                        <FormGroup className="form-floating">
                                            <Input type="text" id="recipe-servings" placeholder={servings} value={servings} onChange={e => setServings(e.target.value)}/>
                                            <Label htmlFor="recipe-servings">Servings</Label>
                                            {validationErrors.includes("servings") && (<FormFeedback className="d-block">* Required and must be a number</FormFeedback>)}
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup className="form-floating">
                                            <Input type="text" id="recipe-prep-time" placeholder={prepTime} value={prepTime} onChange={e => setPrepTime(e.target.value)}/>
                                            <Label htmlFor="recipe-prep-time">Prep Time</Label>
                                            {validationErrors.includes("prepTime") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup className="form-floating">
                                            <Input type="select" id="recipe-status" onChange={e => setDraft(e.target.value)} value={draft}>
                                                <option value={true}>Draft</option>
                                                <option value={false}>Public</option>
                                            </Input>
                                            <Label htmlFor="recipe-status">Recipe Status</Label>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col md={12}>
                                        <FormGroup className="form-floating">
                                            <textarea className="form-control" value={description} id="recipe-description" placeholder={description} onChange={e => setDescription(e.target.value)}></textarea>
                                            <Label htmlFor="recipe-description">Description</Label>
                                            {validationErrors.includes("description") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col md={12}>
                                        <FormGroup className="form-floating">
                                            <textarea className="form-control" value={cookingDirections} id="recipe-cooking-directions" placeholder={cookingDirections} onChange={e => setCookingDirections(e.target.value)}></textarea>
                                            <Label htmlFor="recipe-cooking-directions">Cooking Directions</Label>
                                            {validationErrors.includes("cookingDirections") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={12}>
                                        <FormGroup className="form-floating">
                                            <textarea className="form-control" id="recipe-ingredients" placeholder={ingredients} value={ingredients} onChange={e => setIngredients(e.target.value)}></textarea>
                                            <Label htmlFor="recipe-ingredients">Ingredients</Label>
                                            {validationErrors.includes("ingredients") && (<FormFeedback className="d-block">* Required and must be comman seprated, no spaces</FormFeedback>)}
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