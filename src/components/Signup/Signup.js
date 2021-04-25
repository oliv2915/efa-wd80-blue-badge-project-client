import React, {useState, useContext} from "react";
import {Col, Form, Row, FormGroup, Label, Input, Button, Container} from "reactstrap";
import {useHistory} from "react-router-dom"
import UserContext from "../../context/UserContext";

export default function SignUp() {
    const history = useHistory();
    const userContext = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState();
      
    const handleSubmit = async (event) => {
        event.preventDefault();
        /*
            This will handle two things. End result, we have newly created user
            with a profileImage attached to there profile.
            1 - create the user in the database
            2 - upload image file
        */
        try {
            // create the user
            const createdUser = await fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/user/signup`, {
                method: "POST",
                body: JSON.stringify({
                    user:{firstName, lastName, username, email, password, confirmPassword}
                }),
                headers: new Headers({"Content-Type":"application/json"})
            }).then(res => res.json())
            // updateToken
            userContext.setToken(createdUser.sessionToken);
            // if we do not have an image, redirect to user profile
            if (!profileImage) return history.push(`/profile/${username}`);
            // proccess image upload
            const formData = new FormData();
            formData.append("image", profileImage);
            // upload image
            await fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/upload?type=user`, {
                method: "POST",
                body: formData,
                headers: new Headers({
                    "Authorization": `Bearer ${createdUser.sessionToken}`
                })
            }).then(res => res.json()).catch(console.log);
            // redirect to profile
            return history.push(`/profile/${username}`);
        } catch (err) {
            console.log(err);
        }
    };

    const fileUploadHandler = (event) => {
        setProfileImage(event.target.files[0]);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="signup-firstname">First Name:</Label>
                            <Input required type="text" name="signup-firstname" id="signup-firstname" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="signup-lastname">Last Name:</Label>
                            <Input required type="text" name="signup-lastname" id="signup-lastname" value={lastName} onChange={e => setLastName(e.target.value)}/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="signup-username">Username:</Label>
                            <Input required type="text" name="signup-username" id="signup-username" value={username} onChange={e => setUsername(e.target.value)}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="signup-email">Email Address:</Label>
                            <Input required type="email" name="signup-email" id="signup-email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="signup-password">Password:</Label>
                            <Input required type="password" name="signup-password" id="signup-password" value={password} onChange={e => setPassword(e.target.value)}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="signup-confirm-password">Confirm Password:</Label>
                            <Input required type="password" name="signup-confirm-password" id="signup-confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <FormGroup>
                            <Label htmlFor="profile-image-upload" className="me-2">Upload a Profile Photo:</Label>
                            <Input type="file" name="file" id="profile-image-upload" onChange={fileUploadHandler}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Button type="submit" className="mt-2" size="lg">Sign Up</Button>
            </Form>  
        </Container>
    )
}