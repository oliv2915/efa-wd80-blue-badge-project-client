import React, {useContext} from "react";
import {Row, Col} from "reactstrap";
import UserContext from "../../context/UserContext";

export default function Profile() {
    const userContext = useContext(UserContext);
     

    return (
        <div>
            <Row>
                <Col>
                    <div className="profile-card">
                        <div className="profile-image">
                            {userContext.isAuth && <img src={userContext.user.profileImageURL} alt="profile image" />}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}