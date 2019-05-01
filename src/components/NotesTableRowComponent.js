import React from "react";
import {Translate} from "react-localize-redux";

function NotesTableRowComponent(props) {
    const singleNote = props.note;
    const noteId = singleNote.id;
    const noteTitle = singleNote.title;

    return (
        <tr>
            <td>{noteId}</td>
            <td>{noteTitle}</td>
            <td>
                <button className="btn btn-yellow" onClick={props.onEditClick}><Translate id="button.edit"/></button>
            </td>
            <td>
                <button className="btn btn-red" onClick={props.onDeleteClick}><Translate id="button.delete"/></button>
            </td>
        </tr>
    );
}

export default NotesTableRowComponent;