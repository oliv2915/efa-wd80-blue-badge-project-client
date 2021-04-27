import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import {Form, Row, Col, FormGroup, Label, Input, Button, Container, Alert, FormFeedback} from "reactstrap";
import UserContext from "../../context/UserContext";
import API_URL from "../../helpers/environment";

export default function Login() {
    const userContext = useContext(UserContext);
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [validated, setValidated] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const [submitError, setSubmitError] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const validateFields = () => {
        const errors = []

        if (username.length < 4 || !username.match(/(?=.{4,})(?=.*[0-9])|(?=.*[!@#$%&*()_+=|<>?{}~-])/g)) {
            errors.push("username");
        }

        if (password.length < 6 || password.length === 0) {
            errors.push("password");
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
            validateFields()
    }, [username, password])



    const handleSubmit = async (event) => {
        event.preventDefault();
        validateFields();

        if (validated) {
            try {
                const loginUser = await fetch(`${API_URL}/user/login`, {
                    method: "POST",
                    body: JSON.stringify({
                        user:{username, password}
                    }),
                    headers: new Headers({"Content-Type":"application/json"})
                }).then(res => res.json())

                if ("sessionToken" in loginUser) {
                    userContext.setToken(loginUser.sessionToken);
                    return history.push(`/profile/${loginUser.user.username}`);
                } else {
                    setSubmitError(true);
                    setAlertMessage("The username and password entered do not macth a registered user.")
                }
            } catch (err) {
                console.log(err);
            }
        } 
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center">Login</h1>
                {submitError ? <Alert color="danger">{alertMessage}</Alert> : null}
                <Row className="mt-3">
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="text" name="login-username" id="login-username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                            <Label htmlFor="login-username">Username:</Label>
                            {validationErrors.includes("username") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="form-floating">
                            <Input type="password" name="login-password" id="login-password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                            <Label htmlFor="login-password">Password:</Label>
                            {validationErrors.includes("password") && (<FormFeedback className="d-block">* Required</FormFeedback>)}
                        </FormGroup>
                    </Col>
                </Row>
                <Button type="submit" className="mt-2" size="lg">Login</Button>
            </Form>
        </Container>
    )
}