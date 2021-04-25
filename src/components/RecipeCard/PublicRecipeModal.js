import React from "react";
import { Modal, ModalBody } from "reactstrap";


export default function PublicRecipeModal({isOpen, toggle, recipe}) {
    return (
        <Modal isOpen={isOpen} toggle={toggle} size="xl">
            <ModalBody>
                <div>
                    Public Modal View
                </div>
            </ModalBody>
        </Modal>
    )
}