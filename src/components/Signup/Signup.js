import React, {useState, useContext, useEffect} from "react";
import {Col, Form, Row, FormGroup, Label, Input, Button, Container, FormFeedback, Alert} from "reactstrap";
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

    const [validationErrors, setValidationErrors] = useState([]);
    const [validated, setValidated] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [alertMessage, setAlertMessage] = useState([]);

    const validateFields = () => {
        const errors = [];

        if (firstName.length < 1) {
            errors.push("firstName");
        }
        if (lastName.length < 1) {
            errors.push("lastName");
        }
        if (username.length < 4 || !username.match(/(?=.{4,})(?=.*[0-9])|(?=.*[!@#$%&*()_+=|<>?{}~-])/g)) {
            errors.push("username");
        }
        if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)) {
            errors.push("email")
        }
        if (password.length < 6) {
            errors.push("password")
        }
        if (password !== confirmPassword) {
            errors.push("confirmPassword")
        }
        
        if (errors.length > 0) {
            setValidated(false);
            setValidationErrors(errors);
        } else if(errors.length === 0) {
            setValidated(true);
            setValidationErrors(errors);
        }
    }

    useEffect(() => {
            validateFields();
    }, [firstName, lastName, username, email, password, confirmPassword])

      
    const handleSubmit = async (event) => {
        event.preventDefault();
        validateFields();
        
        if (validated) { // fields have passed all requirmenets (true), submit data
            try {
                // submit user data to server
                const newUser = await fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/user/signup`, {
                    method: "POST",
                    body: JSON.stringify({
                        user:{firstName, lastName, username, email, password}
                    }),
                    headers: new Headers({"Content-Type":"application/json"})
                }).then(res => {
                    console.log(res.status)
                    if (res.status === 400) {
                        setSubmitError(true);
                        setAlertMessage("The supplied username and/or email address is in use")
                        return res.json()
                    } else {
                        return res.json()
                    }
                })
                // check to see if we have a returned user obj
                if ("sessionToken" in newUser) {
                    // set the userContext token
                    userContext.setToken(newUser.sessionToken);

                    // check to see if we have an image
                    if (profileImage) { 
                        // create a new formdata obj for our image
                        const formData = new FormData();
                        formData.append("image", profileImage);
                        // submit fetch
                        await fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/upload?type=user`, {
                            method: "POST",
                            body: formData,
                            headers: new Headers({
                                "Authorization": `Bearer ${newUser.sessionToken}`
                            })
                        })
                    }
                    return history.push(`/profile/${newUser.user.username}`)
                }                
            } catch (err) {
                console.log(err)
            }
        }
    };

    const fileUploadHandler = (event) => {
        setProfileImage(event.target.files[0]);
    };

    return (
        <Container>
            {submitError ? <Alert color="danger">{alertMessage}</Alert> : null}
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center">Sign Up</h1>
                <p>Let's say you have an old recipe box. One that's handed down for years. The index cards are starting to fade. You need a place to store the recipe but want to easily get to it again. Maybe even have the aility to add a photo of that index card or of the meal.</p>
                <Row className="mt-3">
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="text" name="signup-firstname" id="signup-firstname" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                            <Label htmlFor="signup-firstname">First Name:</Label>
                            {validationErrors.includes("firstName") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="text" name="signup-lastname" id="signup-lastname" value={lastName} placeholder="Last Name" onChange={e => setLastName(e.target.value)}/>
                            <Label htmlFor="signup-lastname">Last Name:</Label>
                            {validationErrors.includes("lastName") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="text" name="signup-username" id="signup-username" value={username} placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                            <Label htmlFor="signup-username">Username:</Label>
                            {validationErrors.includes("username") && (<FormFeedback className="d-block">* Must be 4 characters long and have one number or special character</FormFeedback>)}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="text" name="signup-email" id="signup-email" value={email} placeholder="Email Address" onChange={e => setEmail(e.target.value)}/>
                            <Label htmlFor="signup-email">Email Address:</Label>
                            {validationErrors.includes("email") && (<FormFeedback className="d-block">* Invalid Email Format</FormFeedback>)}
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="password" name="signup-password" id="signup-password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                            <Label htmlFor="signup-password">Password:</Label>
                            {validationErrors.includes("password") && (<FormFeedback className="d-block">* Password must be 6 characters in length</FormFeedback>)}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="password" name="signup-confirm-password" id="signup-confirm-password" value={confirmPassword} placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/>
                            <Label htmlFor="signup-confirm-password">Confirm Password:</Label>
                            {validationErrors.includes("confirmPassword") && (<FormFeedback className="d-block">* Passwords do not match</FormFeedback>)}
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