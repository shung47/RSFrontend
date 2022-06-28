import * as React from "react";
import {LinkButton} from "./Buttons";
import {OpenInNew} from "@material-ui/icons";
import {Fade, Modal} from "@mui/material";
import Box from "@material-ui/core/Box";

interface ButtonedModalProps {
    children: JSX.Element;
    actionButton?: JSX.Element;
    buttonText?: string;
}

export function ButtonWithModal(props: ButtonedModalProps) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '75%',
        maxWidth: '700px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 16,
        p: 4,
        mt: 1
    };
    return (
        <>
            {props.actionButton &&
                <Box onClick={handleModalOpen}>
                    {props.actionButton}
                </Box>
            }
            {!props.actionButton &&
                <>
                    <LinkButton onClick={handleModalOpen} actionIcon={<OpenInNew fontSize="small"/>}>
                        {props.buttonText}
                    </LinkButton>
                </>
            }
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={modalOpen}>
                    <Box sx={modalStyle}>
                        {props.children}
                    </Box>
                </Fade>
            </Modal>
        </>

    )
}
