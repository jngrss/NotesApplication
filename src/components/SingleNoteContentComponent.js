import React from "react";
import {Translate} from "react-localize-redux";

export class SingleNoteContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: undefined,
            noteTitle: '',
            isModified: false,
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    componentDidMount() {
        const apiUrl = `http://private-9aad-note10.apiary-mock.com/notes/${this.props.selectedNoteId}`;
        fetch(apiUrl, {method: 'GET'})
            .then(results => {
                return results.json()
            })
            .then(data => {
                this.setState({note: data, noteTitle: data.title})
            })
            .catch((err) => {
                console.error(err)
            });
    }

    handleTextChange(event) {
        this.setState({[event.target.name]: event.target.value, isModified: true,});
    }

    handleSaveClick() {
        const updatedNoteText = this.state.isModified ? this.state.noteTitle : this.state.note.title;
        const apiUrl = `http://private-9aad-note10.apiary-mock.com/notes/${this.props.selectedNoteId}`;
        fetch(apiUrl, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: `${this.props.selectedNoteId}`, title: `${updatedNoteText}`})
        })
            .then((results) => {
                if (results.ok && results.status === 201) {
                    console.log('successfully updated');
                }
            })
            .catch((err) => {
                console.error(err)
            });
    }

    render() {
        const noteText = this.state.noteTitle;
        return (
            <div>
                <h2><Translate id="notesedit.title"/>{this.props.selectedNoteId}</h2>
                <table>
                    <tbody>
                    <tr>
                        <td>id: {this.props.selectedNoteId}</td>
                        <td><input type="text" value={noteText} onChange={this.handleTextChange} name="noteTitle"/></td>
                        <td>
                            <button className="btn btn-green" onClick={this.handleSaveClick}><Translate id="button.update"/></button>
                        </td>
                        <td>
                            <button className="btn btn-red" onClick={this.props.handleCancelClick}><Translate id="button.cancel"/></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    };
}