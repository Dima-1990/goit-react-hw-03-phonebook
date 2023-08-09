import React, { Component } from 'react';
import { Form, Label, Input, Button } from '../Contacts/Contact.styled';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class ContactFrom extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  telInputId = nanoid();

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeNumber = event => {
    const input = event.target.value;
    const numbersOnly = input.replace(/\D/g, '');
    let formattedNumber = '';

    if (numbersOnly.length >= 3) {
      formattedNumber = numbersOnly.slice(0, 3);
    } else {
      formattedNumber = numbersOnly;
    }

    if (numbersOnly.length >= 5) {
      formattedNumber += '-' + numbersOnly.slice(3, 5);
    } else if (numbersOnly.length > 3) {
      formattedNumber += '-' + numbersOnly.slice(3);
    }

    if (numbersOnly.length >= 7) {
      formattedNumber += '-' + numbersOnly.slice(5, 7);
    } else if (numbersOnly.length > 5) {
      formattedNumber += '-' + numbersOnly.slice(5);
    }

    this.setState({
      number: formattedNumber,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit({
      name: this.state.name,
      number: this.state.number,
    });
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor={this.nameInput}>
          Name
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label htmlFor={this.telInput}>
          Number
          <Input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChangeNumber} // Додано метод форматування номеру телефону
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactFrom;
