import React, {useRef, useState, useContext, useEffect} from "react"
import genericRecipeImage from "../../assets/generic_recipe_img.svg";
import { Modal, ModalBody, Form, Row, Col, FormGroup, Input, Label, Card, CardImg, CardBody, Button, FormFeedback, Alert } from "reactstrap";
import UserContext from "../../context/UserContext";




export default function RecipeModal({isOpen, toggle, onExit}) {
    const userContext = useContext(UserContext)
    const [recipeImg, setRecipeImg] = useState(genericRecipeImage)
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
    const [formSubmitted, setFormSubmitted] = useState(false);

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
        // if (formSubmitted) {
            validateFields();
        // }
    }, [recipeType, recipeName, servings, description, cookingDirections, ingredients, prepTime, draft, formSubmitted])

    const handleImageUpload = (event) => {
        setImgFile(event.target.files[0]);
        setRecipeImg(URL.createObjectURL(event.target.files[0]));
    }

    const profileImageClicked = () => {
        inputFile.current.click();
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        validateFields();
        setFormSubmitted(true);


        if (validated) {
            try {
                const newRecipe = await fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/recipe/add`, {
                    method: "POST",
                    body: JSON.stringify({
                        recipe: {
                            recipeName: recipeName,
                            recipeType: recipeType,
                            servings: servings,
                            prepTime: prepTime,
                            description: description,
                            draft: draft,
                            cookingDirections: cookingDirections,
                            ingredients: ingredients.split(",")}
                    }),
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userContext.token}`
                    })
                }).then(res => res.json());

                if ("recipe" in newRecipe) {
                    if (imgFile) {
                        const formData = new FormData();
                        formData.append("image", imgFile);

                        await fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/upload?type=recipe&recipe=${newRecipe.recipe.id}`, {
                            method: "POST",
                            body: formData,
                            headers: new Headers({
                                "Authorization": `Bearer ${userContext.token}`
                            })
                        }).then(res => {
                            if (res.status !== 200) {
                                setSubmitError(true);
                                setAlertMessage("There was an issue uploading your photo");
                            } else {
                                toggle();
                            }
                        })
                    } else {
                        toggle();
                    }

                } else {
                    setSubmitError(true);
                    setAlertMessage("There was a problem with adding your recipe. Please check your entries and try again.")
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
                    <input type="file" style={{display: "none"}} ref={inputFile} onChange={handleImageUpload} />
                    <CardImg top src={recipeImg} alt="recipe image" height="400" className="recipe-cover" style={{cursor: "pointer"}} onClick={profileImageClicked}/>
                    <CardBody>
                        {submitError ? <Alert color="danger">{alertMessage}</Alert> : null}
                        <Form onSubmit={handleFormSubmit}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup className="form-floating">
                                        <Input type="text" id="recipe-name" placeholder="Recipe Name" value={recipeName} onChange={e => setRecipeName(e.target.value)}/>
                                        <Label htmlFor="recipe-name">Recipe Name</Label>
                                        {validationErrors.includes("recipeName") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className="form-floating">
                                        <Input type="text" id="recipe-type" placeholder="Recipe Type" value={recipeType} onChange={e => setRecipeType(e.target.value)}/>
                                        <Label htmlFor="recipe-type">Recipe Type</Label>
                                        {validationErrors.includes("recipeType") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col md={4}>
                                    <FormGroup className="form-floating">
                                        <Input type="text" id="recipe-servings" placeholder="Servings" value={servings} onChange={e => setServings(e.target.value)}/>
                                        <Label htmlFor="recipe-servings">Servings</Label>
                                        {validationErrors.includes("servings") && (<FormFeedback className="d-block">* Required and must be a number</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup className="form-floating">
                                        <Input type="text" id="recipe-prep-time" placeholder="Prep Time" value={prepTime} onChange={e => setPrepTime(e.target.value)}/>
                                        <Label htmlFor="recipe-prep-time">Prep Time</Label>
                                        {validationErrors.includes("prepTime") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup className="form-floating">
                                        <Input type="select" id="recipe-status" onChange={e => setDraft(e.target.value)} value={draft}>
                                            <option value="true">Draft</option>
                                            <option value="false">Public</option>
                                        </Input>
                                        {/* <select className="form-select" id="recipe-status" onChange={e => setDraft(e.target.value)} value={draft}>
                                        </select> */}
                                        <Label htmlFor="recipe-status">Recipe Status</Label>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col md={12}>
                                    <FormGroup className="form-floating">
                                        <textarea className="form-control" value={description} id="recipe-description" placeholder="Description" onChange={e => setDescription(e.target.value)}></textarea>
                                        <Label htmlFor="recipe-description">Description</Label>
                                        {validationErrors.includes("description") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col md={12}>
                                    <FormGroup className="form-floating">
                                        <textarea className="form-control" value={cookingDirections} id="recipe-cooking-directions" placeholder="Cooking Directions" onChange={e => setCookingDirections(e.target.value)}></textarea>
                                        <Label htmlFor="recipe-cooking-directions">Cooking Directions</Label>
                                        {validationErrors.includes("cookingDirections") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <FormGroup className="form-floating">
                                        <Input type="text" id="recipe-ingredients" placeholder="Ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)}/>
                                        <Label htmlFor="recipe-ingredients">Ingredients</Label>
                                        {validationErrors.includes("ingredients") && (<FormFeedback className="d-block">* Required and must be comman seprated, no spaces</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <Button type="submit" color="secondary">Add Recipe</Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    )
}