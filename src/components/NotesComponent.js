import React from 'react';
import {NotesTableComponent} from "./NotesTableComponent";
import {CreateNewNoteComponent} from "./CreateNewNoteComponent";
import {SingleNoteContentComponent} from "./SingleNoteContentComponent";
import {Translate, withLocalize} from "react-localize-redux";
import translation from "../assets/translation.json";

class NotesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props.addTranslation(translation);
        this.state = {
            isNoteContentVisible: false,
            selectedNoteId: undefined,
            editMode: false,
        };
        this.handleNoteEditClick = this.handleNoteEditClick.bind(this);
        this.handleNoteDeleteClick = this.handleNoteDeleteClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleCreateNewNoteClick = this.handleCreateNewNoteClick.bind(this);
    }

    handleNoteEditClick(i) {
        this.setState({isNoteContentVisible: true, selectedNoteId: i, editMode: true,});
    }

    handleNoteDeleteClick(i) {
        const apiUrl = `http://private-9aad-note10.apiary-mock.com/notes/${i}`;
        fetch(apiUrl, {method: 'DELETE'})
            .then((results) => {
                if (results.ok && results.status === 204) {
                    console.log('successfully deleted');
                }
            })
            .catch((err) => {
                console.error(err)
            });
        this.setState({isNoteContentVisible: false, selectedNoteId: undefined, editMode: false,});
    }

    handleCreateNewNoteClick() {
        this.setState({isNoteContentVisible: true, selectedNoteId: 0, editMode: false,});
    }

    handleCancelClick() {
        this.setState({isNoteContentVisible: false,});
    }

    render() {
        return (
            <div>
                <h3><Translate id="notes.title"/></h3>
                <NotesTableComponent onEditClick={(i) => this.handleNoteEditClick(i)}
                                     onDeleteClick={(i) => this.handleNoteDeleteClick(i)}/>

                <button className="btn btn-blue" onClick={this.handleCreateNewNoteClick}><Translate id="button.create"/></button>

                {this.state.isNoteContentVisible && this.state.editMode && this.state.selectedNoteId
                && <SingleNoteContentComponent key={this.state.selectedNoteId}
                                               selectedNoteId={this.state.selectedNoteId}
                                               handleCancelClick={this.handleCancelClick}/>}

                {this.state.isNoteContentVisible && !this.state.editMode
                && <CreateNewNoteComponent key={this.state.selectedNoteId}
                                           handleCancelClick={this.handleCancelClick}/>}
            </div>
        )
    }
}

export default withLocalize(NotesComponent);