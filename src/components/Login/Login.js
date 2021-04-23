import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import {Form, Row, Col, FormGroup, Label, Input, Button, Container} from "reactstrap";

export default function Login({updateToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/user/login`, {
                method: "POST",
                body: JSON.stringify({
                    user:{username, password}
                }),
                headers: new Headers({"Content-Type":"application/json"})
            }).then(res => res.json()).then(data => {
                updateToken(data.sessionToken);
                history.push("/user/profile");
            });
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="signup-username">Username:</Label>
                            <Input required type="text" name="signup-username" id="signup-username" value={username} onChange={e => setUsername(e.target.value)}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="signup-password">Password:</Label>
                            <Input required type="password" name="signup-password" id="signup-password" value={password} onChange={e => setPassword(e.target.value)}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Button type="submit" className="mt-2" size="lg">Login</Button>
            </Form>
        </Container>
    )
}