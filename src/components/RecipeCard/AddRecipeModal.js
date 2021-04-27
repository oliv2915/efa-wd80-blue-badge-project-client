import React, {useRef, useState, useContext} from "react"
import genericRecipeImage from "../../assets/generic_recipe_img.svg";
import { Modal, ModalBody, Form, Row, Col, FormGroup, Input, Label, Card, CardImg, CardBody, Button } from "reactstrap";
import UserContext from "../../context/UserContext";




export default function RecipeModal({isOpen, toggle}) {
    const userContext = useContext(UserContext)
    const [recipeImg, setRecipeImg] = useState(genericRecipeImage)
    const [recipeName, setRecipeName] = useState("");
    const [recipeType, setRecipeType] = useState("");
    const [servings, setServings] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [draft, setDraft] = useState("");
    const [description, setDescription] = useState("");
    const [cookingDirections, setCookingDirections] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const [imgFile, setImgFile] = useState(null);
    const inputFile = useRef(null);

    const handleImageUpload = (event) => {
        setImgFile(event.target.files[0]);
        setRecipeImg(URL.createObjectURL(event.target.files[0]));
    }

    const profileImageClicked = () => {
        inputFile.current.click();
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // const fetchResponse = await fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/recipe/add`, {
        //     method: 'POST',
        //     body: JSON.stringify({recipe: 
        //         {
        //         recipeName: recipeName, 
        //         recipeType: recipeType,
        //         servings: servings, 
        //         prepTime: prepTime, 
        //         draft: draft, 
        //         description: description, 
        //         cookingDirections: cookingDirections, 
        //         ingredients: ingredients}  
        //     }),
        //     headers: new Headers({
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${userContext.token}`
        //     })
        // }) 
        // console.log(await fetchResponse.json());
        // .then((res) => res.json())
        // .then((recipeData) => {
        //     console.log(recipeData);
        //     setRecipeType(recipeData.recipeType)
        //     setServings(recipeData.setServings)
        //     setPrepTime(recipeData.setPrepTime)
        //     setDraft(recipeData.setDraft)
        //     setDescription(recipeData.setDescription)
        //     setCookingDirections(recipeData.setCookingDirections)
        //     setIngredients(recipeData.setIngredients)
            
        // }) 
    }


       
    

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="xl">
            <ModalBody>
                <Card>
                    <input type="file" style={{display: "none"}} ref={inputFile} onChange={handleImageUpload} />
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