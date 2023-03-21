import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import { HiDotsVertical } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { DeletePost } from '../DeletePost/DeletePost';



const Poper = ({
    anchorEl,
    setAnchorEl,
    setEditId,
    note,
    deleteNote,
    deleteModal,
    setDeleteModal
}) => {

    const [anchorEl1, setAnchorEl1] = React.useState(null);


    const [deleteid, setDeleteid] = useState();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    const hanndleDeletePoper = (event) => {
        // setAnchorEl1(event.currentTarget)
        console.log("note id ----------", deleteid, note?._id)

        setDeleteid(note._id);
    }

    const handleDelete = () => {
        deleteNote(deleteid)
    }


    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>

            <div onClick={handleClick}>
                <HiDotsVertical />
            </div>


            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >

                <p>
                    <p
                        className="NoteActionOption"
                        onClick={() => {
                            // myWindow("edit-note", note.id);
                            // setEditModal(true);
                            setAnchorEl(null);
                            setEditId(note.id);
                        }}
                    >
                        <BiEdit /> Edit
                    </p>

                </p>



                <p>

                    <p
                        className="NoteActionOption"
                        onClick={() => {
                            setDeleteModal(true);
                            setAnchorEl(null);
                            hanndleDeletePoper(note.id)
                        }}
                    >
                        <AiOutlineDelete /> Delete
                    </p>

                </p>

            </Popover>

            <DeletePost
                open={deleteModal}
                anchorEl={anchorEl1}
                close={() => {
                    setDeleteModal(false);
                    console.log("close clicked")
                }}
                action={handleDelete}
            />

        </div>
    )
}

export default Poper

