import React, { Component } from 'react';
import ContactFrom from '../components/Contacts/Contact';
import ContactList from '../components/ListContact/List';
import Filter from '../components/Filter/Filter';
import { Container, Title, SubTitle, Wrapper } from '../components/App.styles';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const info = localStorage.getItem('contacts');

    if (info !== null) {
      this.setState({ contacts: JSON.parse(info) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
        filter: '',
      };
    });
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name, number }) =>
        name.toLowerCase() === contact.name.toLowerCase() ||
        contact.number === number
    );

    if (isInContacts) {
      alert(`${contact.name} or ${contact.number} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;
    return (
      <Container>
        <Title>Phonebook</Title>

        <ContactFrom onSubmit={this.addContact} />

        <SubTitle>Contacts</SubTitle>
        {this.state.contacts.length > 0 ? (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        ) : (
          <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
        )}
        {this.state.contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </Container>
    );
  }
}
