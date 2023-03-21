import React, { useState } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    paper: {
        minWidth: "400px",
        width: "400px"
    },

}));

export function DeletePost({ open, close, action }) {

    const classes = useStyles();

    return (

        <Dialog open={open} onClose={close} classes={{ paper: classes.paper }}>
            <DialogTitle>
                <strong>Delete Post</strong>
            </DialogTitle>
            <DialogContent dividers>
                <strong>Are you sure to delete the post.</strong>
            </DialogContent>
            <DialogActions>
                <Button
                    size="small"
                    variant="outlined"
                    style={{
                        color: "black",
                        border: "1px solid #3f51b5",
                        textTransform: "none",
                    }}
                    onClick={close}
                >
                    Close
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    style={{
                        background: "#3f51b5",
                        color: "white",
                        textTransform: "none",
                    }}
                    onClick={action}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}