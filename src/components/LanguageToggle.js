import React from 'react';
import {withLocalize} from 'react-localize-redux';

const LanguageToggle = ({languages, activeLanguage, setActiveLanguage}) => {

    return (
        languages.map(lang => <button key={lang.code} className="btn"
                                      onClick={() => setActiveLanguage(lang.code)}>{lang.name}</button>)
    );
};

export default withLocalize(LanguageToggle);