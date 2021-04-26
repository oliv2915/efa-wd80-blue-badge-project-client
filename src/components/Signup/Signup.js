import React, {useState, useContext, useEffect} from "react";
import {Col, Form, Row, FormGroup, Label, Input, Button, Container, FormFeedback} from "reactstrap";
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
    const [submitError, setSubmitError] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const validateFields = () => {
        const errors = [];

        if (firstName < 1) {
            errors.push("firstName");
        }
        if (lastName < 1) {
            errors.push("lastName");
        }
        if (username > 4 || !username.match(/(?=.{4,128})(?=.*[0-9])|(?=.*[!@#$%&*()_+=|<>?{}\[\]~-])/g)) {
            errors.push("username");
        }
        if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)) {
            errors.push("email")
        }
        if (password < 6) {
            errors.push("password")
        }
        if (password !== confirmPassword) {
            errors.push("confirmPassword")
        }
        
        if (errors > 0) {
            setValidated(false);
            setValidationErrors(errors);
        } else {
            setValidated(true);
            setValidationErrors([]);
        }
    }

    useEffect(() => {
        if (formSubmitted) {
            validateFields();
        }
    }, [firstName, lastName, username, email, password, confirmPassword, validated])
      
    const handleSubmit = async (event) => {
        event.preventDefault();
        validateFields();
        /*
        This will handle two things. End result, we have newly created user
        with a profileImage attached to there profile.
        1 - create the user in the database
        2 - upload image file
        */
        if (validateFields) { // fields have passed all requirmenets (true), submit data
            try {
                // submit user data to server
                const response = await fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/user/signup`, {
                    method: "POST",
                    body: JSON.stringify({
                        user:{firstName, lastName, username, email, password, confirmPassword}
                    }),
                    headers: new Headers({"Content-Type":"application/json"})
                });
                // user obj
                const createdUser = response.json()
                // check to see if we have an error, setError if one is found
                if (response !== 200) {
                    const message = createdUser; // this holds the returned message, not matter good or bad.
                    setSubmitError([...submitError, message])
                    setFormSubmitted(true); // form has been submitted but, returned an error
                }
                // set token
                userContext.setToken(createdUser.sessionToken);

                // if we have a profile image, upload it
                if (profileImage) { 
                    // create a new formdata obj for our image
                    const formData = new FormData();
                    formData.append("image", profileImage);
                    // submit fetch
                    const imageUploadResult = await fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/upload?type=user`, {
                        method: "POST",
                        body: formData,
                        headers: new Headers({
                            "Authorization": `Bearer ${createdUser.sessionToken}`
                        })
                    })
                    // check for error, add to submitError array
                    if (imageUploadResult.status !== 200) {
                        const imageMessage = await imageUploadResult.json();
                        setSubmitError([...submitError, imageMessage]);
                        setFormSubmitted(true); // form has been submitted but, returned an error
                    }
                } else { // no image has been provided
                    return history.push(`/profile/${createdUser.username}`);
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            setFormSubmitted(true);
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
                        <FormGroup className="form-floating">
                            <Input type="text" name="signup-firstname" id="signup-firstname" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                            <Label htmlFor="signup-firstname">First Name:</Label>
                            {formSubmitted && validationErrors.includes("firstName") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="text" name="signup-lastname" id="signup-lastname" value={lastName} placeholder="Last Name" onChange={e => setLastName(e.target.value)}/>
                            <Label htmlFor="signup-lastname">Last Name:</Label>
                            {formSubmitted && validationErrors.includes("lastName") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="text" name="signup-username" id="signup-username" value={username} placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                            <Label htmlFor="signup-username">Username:</Label>
                            {formSubmitted && validationErrors.includes("username") && (<FormFeedback className="d-block">* Must be 4 characters long and have one number or special character</FormFeedback>)}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="text" name="signup-email" id="signup-email" value={email} placeholder="Email Address" onChange={e => setEmail(e.target.value)}/>
                            <Label htmlFor="signup-email">Email Address:</Label>
                            {formSubmitted && validationErrors.includes("email") && (<FormFeedback className="d-block">* Invalid Email Format</FormFeedback>)}
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="password" name="signup-password" id="signup-password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                            <Label htmlFor="signup-password">Password:</Label>
                            {formSubmitted && validationErrors.includes("email") && (<FormFeedback className="d-block">* Password must be 6 characters in length</FormFeedback>)}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="password" name="signup-confirm-password" id="signup-confirm-password" value={confirmPassword} placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/>
                            <Label htmlFor="signup-confirm-password">Confirm Password:</Label>
                            {formSubmitted && validationErrors.includes("confirmPassword") && (<FormFeedback className="d-block">* Passwords do not match</FormFeedback>)}
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