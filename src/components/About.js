import React from "react";
import AppInfo from "../assets/info";
import {Translate} from "react-localize-redux";

export class About extends React.Component {
    render() {
        return (
            <div>
                <h3><Translate id="about.title"/></h3>
                <ul>
                    <li>{AppInfo.name}</li>
                    <li>{AppInfo.short_name}</li>
                    <li>{AppInfo.version}</li>
                </ul>
            </div>
        );
    }
}