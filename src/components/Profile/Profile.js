import React, {useContext, useEffect, useState} from "react";
import {useParams } from "react-router-dom";
import {Row, Col, Card, CardBody, CardImg, CardTitle, CardText, Button} from "reactstrap";
import genericProfileImg from "../../assets/generic_profile_img.svg";
import UserContext from "../../context/UserContext";
import RecipeCard from "../RecipeCard/RecipeCard";

export default function Profile() {
    const {username} = useParams();
    const userContext = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);
    const [publicUser, setPublicUser] = useState(false);

    useEffect(() => {
        if (userContext.user.username === username) {
            fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/recipe/all`, {
                method: "GET",
                headers: new Headers({"Authorization": `Bearer ${userContext.token}`})
            }).then(res => res.json()).then(setRecipes).catch(console.log);
        } else {
            fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/user/profile/${username}`)
            .then(res => res.json()).then(data => {
                setPublicUser(data);
                setRecipes(data.recipes);
            }).catch(console.log);
        }
    }, [userContext.token, userContext.isAuth, userContext.user.username, username]);

    return (
        <div>
            <Row>
                <Col sm={12} lg={3}>
                    <Card color="secondary">
                        <CardImg top src={publicUser ? !publicUser.profileImageURL ? genericProfileImg : publicUser.profileImageURL : !userContext.user.profileImageURL ? genericProfileImg : userContext.user.profileImageURL} alt="profile image" />
                        <CardBody>
                            <CardTitle tag="h3">{publicUser ? publicUser.username : userContext.user.username}</CardTitle>
                            <CardText>{publicUser ? publicUser.aboutMe : userContext.user.aboutMe}</CardText>
                        </CardBody>
                        {userContext.isAuth ? <Button className="mb-1" type="button" size="md" color="danager">Edit Profile</Button>: null}
                        {userContext.isAuth ? <Button type="button" size="md" color="danager">Add Recipe</Button> : null}
                    </Card>
                </Col>
                <Col lg={9}>
                    <Row>
                        {recipes && recipes.length > 0 ? recipes.map((recipe, idx) => {
                            return <RecipeCard key={idx} recipe={recipe} />
                        }) : null}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}