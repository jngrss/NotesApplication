import React from "react";
import {Translate} from "react-localize-redux";

export class CreateNewNoteComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newNoteTitle: '',
            isModified: false,
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    handleTextChange(event) {
        this.setState({[event.target.name]: event.target.value, isModified: true});
    }

    handleSaveClick() {
        const updatedNoteText = this.state.newNoteTitle;
        const apiUrl = 'http://private-9aad-note10.apiary-mock.com/notes';
        fetch(apiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: `${updatedNoteText}`})
        })
            .then((results) => {
                if (results.ok && results.status === 201) {
                    console.log('successfully created');
                }
            })
            .catch((err) => {
                console.error(err)
            });
    }

    render() {
        const noteText = this.state.newNoteTitle;
        return (
            <div>
                <h2><Translate id="notesnew.title"/></h2>
                <table>
                    <tbody>
                    <tr>
                        <td><input type="text" value={noteText} onChange={this.handleTextChange} name="newNoteTitle"/>
                        </td>
                        <td>
                            <button className="btn btn-green" onClick={this.handleSaveClick}><Translate id="button.save"/></button>
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