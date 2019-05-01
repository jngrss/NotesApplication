import React from "react";
import {Link} from "react-router-dom";
import {Translate, withLocalize} from "react-localize-redux";
import {renderToStaticMarkup} from "react-dom/server";
import globalTranslations from "./assets/translation.json";
import LanguageToggle from "./components/LanguageToggle";
import './Notes.scss';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.props.initialize({
            languages: [
                {name: "English", code: "en"},
                {name: "Czech", code: "cs"}
            ],
            translation: globalTranslations,
            options: {renderToStaticMarkup}
        });
    }

    render() {
        return (
            <div>
                <h1><Translate id="appname.title"/></h1>
                <div>
                    <Link to="/about"><button className="btn"><Translate id="button.about"/></button></Link>
                    <Link to="/notes"><button className="btn btn-blue"><Translate id="button.notes"/></button></Link>
                    <LanguageToggle/>
                </div>
                <hr/>
            </div>
        );
    }
}

export default withLocalize(Notes);