import { Component } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

import Form from '../Form';
import Contacts from '../Contacts';
import Filter from '../Filter';

import { Container, TitleMain, TitleSecond } from './App.styled';

const LS_KEY = 'contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    // checking name for matches
    const { contacts } = this.state;
    const normalizedName = data.name.toLowerCase();
    const isFoundName = contacts.some(
      contact => contact.name.toLowerCase() === normalizedName,
    );

    if (isFoundName) {
      toast.error(`${data.name} is already in contacts!`);
      return;
    }

    // add new contact
    const newData = { id: nanoid(5), ...data };
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newData],
      };
    });
    toast.success('Successfully added!');
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  // The number of entries in the Phonebook has changed!!!
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));

      if (this.state.contacts.length === 0) {
        toast.error('Phonebook is empty!');
      }
    }
  }

  // first render Phonebook
  componentDidMount() {
    const contacts = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(contacts);

    // if there are entries in the local storage, write them to the state
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  render() {
    // for filter
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );

    return (
      <Container>
        <Toaster
          toastOptions={{
            style: {
              border: '1px solid #713200',
              padding: '16px',
            },
          }}
        />
        <TitleMain>Phonebook</TitleMain>
        <Form onSubmit={this.formSubmitHandler} />
        <TitleSecond>Contacts</TitleSecond>
        <Filter value={filter} onChange={this.changeFilter} />
        <Contacts arr={filteredContacts} onDelContact={this.deleteContact} />
      </Container>
    );
  }
}

export default App;
