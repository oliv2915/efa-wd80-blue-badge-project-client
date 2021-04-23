import React, {useState, useContext} from "react";
import {Col, Form, Row, FormGroup, Label, Input, Button, Container} from "reactstrap";
import {useHistory} from "react-router-dom"

export default function SignUp({updateToken}) {
    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
      
    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/user/signup`, {
                method: "POST",
                body: JSON.stringify({
                    user:{firstName, lastName, username, email, password, confirmPassword}
                }),
                headers: new Headers({"Content-Type":"application/json"})
            }).then(res => res.json()).then(data => {
                updateToken(data.sessionToken);
                history.push("/user/profile");
            });
        } catch (err) {
            console.log(err);
        }
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
                <Button type="submit" className="mt-2" size="lg">Sign Up</Button>
            </Form>  
        </Container>
    )
}