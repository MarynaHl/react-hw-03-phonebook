import PropTypes from 'prop-types';
import {
  ContactsList,
  ContactsListItem,
  UserName,
  DeleteBtn,
} from './Contacts.styled';

export default function Contacts({ arr, onDelContact }) {
  return (
    <ContactsList>
      {arr.map(({ name, number, id }) => (
        <ContactsListItem key={id}>
          <p>
            <UserName>{name}: </UserName>
            {number}
          </p>
          <DeleteBtn onClick={() => onDelContact(id)}>delete</DeleteBtn>
        </ContactsListItem>
      ))}
    </ContactsList>
  );
}

Contacts.propTypes = {
  arr: PropTypes.array.isRequired,
};
