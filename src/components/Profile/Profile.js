import React, {useContext, useEffect, useState} from "react";
import {useParams } from "react-router-dom";
import {Row, Col, Card, CardBody, CardImg, CardTitle, CardText, Button} from "reactstrap";
import genericProfileImg from "../../assets/generic_profile_img.svg";
import UserContext from "../../context/UserContext";
import RecipeCard from "../RecipeCard/RecipeCard";
import AddRecipeModal from "../RecipeCard/AddRecipeModal";
import EditUserProfile from "./EditUserProfile";

export default function Profile() {
    const {username} = useParams();
    const userContext = useContext(UserContext);

    const [recipes, setRecipes] = useState([]);
    const [publicUser, setPublicUser] = useState(false);

    const [recipeModalIsOpen, setRecipeModalIsOpen] = useState(false);
    const toggleRecipeModal = () => setRecipeModalIsOpen(!recipeModalIsOpen);

    const [editUserModalIsOpen, setEditUserModalIsOpen] = useState(false);
    const toggleEditUserModal = () => setEditUserModalIsOpen(!editUserModalIsOpen);
    const reloadWindow = () => window.location.reload();

    useEffect(() => {
        if (userContext.user.username === username) { // authorized user
            fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/recipe/all`, {
                method: "GET",
                headers: new Headers({"Authorization": `Bearer ${userContext.token}`})
            }).then(res => res.json()).then(setRecipes).catch(console.error);
        } else { // public visitor
            fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/user/profile/${username}`)
            .then(res => res.json()).then(data => {
                setPublicUser(data.user);
                setRecipes(data.recipes);
            }).catch(console.error);
        }
    }, [userContext.token, userContext.isAuth, userContext.user.username, username]);

    return (
        <div>
            <Row>
                <Col className="mb-3 col-md-6" sm={12} lg={3}>
                    <Card color="primary">
                        <CardImg top src={publicUser ? !publicUser.profileImageURL ? genericProfileImg : publicUser.profileImageURL : !userContext.user.profileImageURL ? genericProfileImg : userContext.user.profileImageURL} alt="profile image" />
                        <CardBody>
                            <CardTitle style={{color: "white"}} tag="h3"><b>{publicUser ? publicUser.username : userContext.user.username}</b></CardTitle>
                            <CardText style={{color: "white"}}>{publicUser ? publicUser.aboutMe : userContext.user.aboutMe}</CardText>
                        </CardBody>
                        {/* button should only be seen when the user isAuth and username provided matches the signed in user */}
                        {userContext.isAuth && username === userContext.user.username ?
                            <Button className="mb-2 mx-2" type="button" size="md" color="danger" style={{color: "white"}} onClick={toggleEditUserModal}>Edit Profile</Button>: null}
                        {/* button should only be seen when the user isAuth and username provided matches the signed in user */}
                        {userContext.isAuth && username === userContext.user.username ?
                            <Button className="mb-2 mx-2" type="button" size="md" color="success" style={{color: "white"}} onClick={toggleRecipeModal}>Add Recipe</Button> : null}
                    </Card>
                </Col>
                <Col lg={9}>
                    <Row>
                        {recipes && recipes.length > 0 ? recipes.map((recipe, idx) => {
                            return <RecipeCard key={idx} recipe={recipe}/>
                        }) : null}
                    </Row>
                </Col>
                {editUserModalIsOpen? <EditUserProfile isOpen={editUserModalIsOpen} toggle={toggleEditUserModal} onExit={reloadWindow} /> : null}
                {recipeModalIsOpen ? <AddRecipeModal isOpen={recipeModalIsOpen} toggle={toggleRecipeModal} onExit={reloadWindow}/> : null}
            </Row>
        </div>
    )
}