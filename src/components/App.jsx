import React from "react";
import { nanoid } from "nanoid";
import { defaultLanguage, availableLanguages, selectLanguage, text } from "helpers/languageManager";

import Contacts from "./Contacts";
import ContactForm from "./ContactForm";
import LanguageToggle from "./LanguageToggle";
import Filter from "./Filter";




export class App extends React.Component {
  static defaultState = {
    contacts: [],
    filter: "",
    currentLanguage: defaultLanguage,
  }

  state = structuredClone(this.constructor.defaultState);

  contactExists = searchName => {
    searchName = searchName.toLowerCase();
    return this.state.contacts.some(({ name }) => name.toLowerCase() === searchName);
  }

  addContact = ({ name, number }) => { // Returns true only on successfull insert
    if (this.contactExists(name)) {
      alert(name + text.alreadyInContacts);
      return;
    }
    this.setState(oldState => {
      const contacts = [ ...oldState.contacts ];
      contacts.push({ name, number, id: nanoid() });
      return { contacts };
    });
    return true;
  }

  removeContact = idToDelete => {
    this.setState(oldState => {
      const contacts = oldState.contacts.filter(({ id }) => id !== idToDelete);
      return { contacts };
    });
  }

  updateFilterState = filter => this.setState({ filter });

  onChangeLanguage = newLanguage => {
    selectLanguage(newLanguage);
    this.setState({ currentLanguage: newLanguage });
  }

  render() {
    const { contacts, filter, currentLanguage } = this.state;
    return (
      <div>
        <h1>{text.phoneBook}</h1>
        <ContactForm addContact={this.addContact} />
        
        <h2>{text.contacts}</h2>
        <Filter filter={filter} updateFilterState={this.updateFilterState} />
        <Contacts contacts={contacts} filter={filter} removeContact={this.removeContact} />
        <LanguageToggle
          languagesList={availableLanguages}
          currentLanguage={currentLanguage}
          changeStateLanguage={ this.onChangeLanguage }
        />
      </div>
    )
  };
}

