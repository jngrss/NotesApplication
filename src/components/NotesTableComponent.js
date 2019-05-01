import React from "react";
import NotesTableRowComponent from "./NotesTableRowComponent";
import {Translate} from "react-localize-redux";

export class NotesTableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {notes: [],};
    }

    componentDidMount() {
        const apiUrl = 'http://private-9aad-note10.apiary-mock.com/notes';
        fetch(apiUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}})
            .then(results => {
                return results.json()
            })
            .then(data => {
                this.setState({notes: data})
            })
            .catch((err) => {
                console.error(err)
            });
    }

    render() {
        const rows = [];

        this.state.notes.forEach((note) => {
            rows.push(
                <NotesTableRowComponent key={note.id} note={note} onEditClick={() => this.props.onEditClick(note.id)}
                                        onDeleteClick={() => this.props.onDeleteClick(note.id)}/>
            );
        });

        return (
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th><Translate id="notestable.title"/></th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    };
}