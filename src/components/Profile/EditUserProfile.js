import React, { useRef, useState, useContext, useEffect } from "react";
import genericeProfileImg from "../../assets/generic_profile_img.svg"
import { Input, Modal, ModalBody, Card, CardImg, CardBody, Form, Row, Col, FormGroup, Button, Alert, Label, FormFeedback } from "reactstrap";
import UserContext from "../../context/UserContext";
import API_URL from "../../helpers/environment";

export default function EditUserProfile({isOpen, toggle, onExit}) {
    const userContext = useContext(UserContext);
    const [firstName, setFirstName] = useState(userContext.user.firstName);
    const [lastName, setLastName] = useState(userContext.user.lastName);
    const [username, setUsername] = useState(userContext.user.username);
    const [email, setEmail] = useState(userContext.user.email);
    const [aboutMe, setAboutMe] = useState(userContext.user.aboutMe);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState(userContext.user.profileImageURL ? userContext.user.profileImageURL : genericeProfileImg);
    
    const [imgFile, setImgFile] = useState(null);
    const imageInput = useRef(null);

    const [validationErrors, setValidationErrors] = useState([]);
    const [validated, setValidated] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [alertMessage, setAlertMessage] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

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
        // if (formSubmitted) {
            validateFields();
        // }
    }, [firstName, lastName, username, email, password, confirmPassword, formSubmitted])

      
    const handleSubmit = async (event) => {
        event.preventDefault();
        validateFields();
        setFormSubmitted(true);
        
        if (validated) { // fields have passed all requirmenets (true), submit data
            try {
                // submit user data to server
                const updatedUser = await fetch(`${API_URL}user/update`, {
                    method: "PUT",
                    body: JSON.stringify({
                        user:{firstName, lastName, username, email, password, aboutMe}
                    }),
                    headers: new Headers({
                        "Content-Type":  "application/json",
                        "Authorization": `Bearer ${userContext.token}`
                    })
                }).then(res => res.json())
                // check to see if we have a returned user obj
                
                if (updatedUser[0] === 1) {
                    // check to see if we have an image
                    if (imgFile) { 
                        // create a new formdata obj for our image
                        const formData = new FormData();
                        formData.append("image", imgFile);
                        // submit fetch
                        await fetch(`${API_URL}upload?type=user`, {
                            method: "POST",
                            body: formData,
                            headers: new Headers({
                                "Authorization": `Bearer ${userContext.token}`
                            })
                        })
                    } else {
                        toggle();
                    }
                    toggle();
                } else {
                    setSubmitError(true);
                    setAlertMessage("The supplied username and/or email address is in use");
                }               
            } catch (err) {
                console.log(err)
            }
        }
    };

    const handleImageFileSelected = (event) => {
        setImgFile(event.target.files[0]);
        setProfileImage(URL.createObjectURL(event.target.files[0]));
    }

    const profileImageClicked = () => {
        imageInput.current.click();
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} onExit={onExit} size="xl">
            <ModalBody>
                <Card>
                    <input type="file" hidden ref={imageInput} onChange={handleImageFileSelected} />
                    <CardImg top className="profile-cover" src={profileImage} alt="profile image" height="400" style={{cursor: "pointer"}} onClick={profileImageClicked}/>
                    <CardBody>
                    {submitError ? <Alert color="danger">{alertMessage}</Alert> : null}
                        <Form onSubmit={handleSubmit}>
                            <h2 className="text-center"><b>Edit Profile</b></h2>
                            <Row className="mt-3">
                                <Col>
                                    <FormGroup className="form-floating">
                                        <Input type="text" name="edit-profile-firstname" id="edit-profile-firstname" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                        <Label htmlFor="edit-profile-firstname">First Name:</Label>
                                        {validationErrors.includes("firstName") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className="form-floating">
                                        <Input type="text" name="edit-profile-lastname" id="edit-profile-lastname" value={lastName} placeholder="Last Name" onChange={e => setLastName(e.target.value)}/>
                                        <Label htmlFor="edit-profile-lastname">Last Name:</Label>
                                        {validationErrors.includes("lastName") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col>
                                    <FormGroup className="form-floating">
                                        <Input type="text" name="edit-profile-username" id="edit-profile-username" value={username} placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                                        <Label htmlFor="edit-profile-username">Username:</Label>
                                        {validationErrors.includes("username") && (<FormFeedback className="d-block">* Must be 4 characters long and have one number or special character</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className="form-floating">
                                        <Input type="text" name="edit-profile-email" id="edit-profile-email" value={email} placeholder="Email Address" onChange={e => setEmail(e.target.value)}/>
                                        <Label htmlFor="edit-profile-email">Email Address:</Label>
                                        {validationErrors.includes("email") && (<FormFeedback className="d-block">* Invalid Email Format</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col>
                                    <FormGroup className="form-floating">
                                        <Input type="password" name="edit-profile-password" id="edit-profile-password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                                        <Label htmlFor="edit-profile-password">Password:</Label>
                                        {validationErrors.includes("password") && (<FormFeedback className="d-block">* Password must be 6 characters in length</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className="form-floating">
                                        <Input type="password" name="edit-profile-confirm-password" id="edit-profile-confirm-password" value={confirmPassword} placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/>
                                        <Label htmlFor="edit-profile-confirm-password">Confirm Password:</Label>
                                        {validationErrors.includes("confirmPassword") && (<FormFeedback className="d-block">* Passwords do not match</FormFeedback>)}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <FormGroup className="form-floating">
                                        <textarea className="form-control" value={aboutMe} id="edit-about-me" placeholder="About Me" onChange={e => setAboutMe(e.target.value)}></textarea>
                                        <Label htmlFor="edit-about-me">About Me</Label>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Button type="submit" className="mt-2" size="lg">Submit Changes</Button>
                        </Form>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    )
}