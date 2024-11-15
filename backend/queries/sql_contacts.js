const { Contact, User } = require('../models');

async function createContactForUser(username, contactData) {
  try {
    const user = await User.findOne({ where: { Username: username } });

    if (!user) {
      throw new Error(`User with username "${username}" not found.`);
    }

    const newContact = await Contact.create({
      FirstName: contactData.firstName,
      LastName: contactData.lastName,
      Email: contactData.email,
      Phone_Number: contactData.phoneNumber,
      Company: contactData.company,
      Job_Title: contactData.jobTitle,
      Username: username,
    });

    console.log('Contact created successfully:', newContact.toJSON());
    return newContact;
  } catch (error) {
    console.error('Error creating contact:', error.message);
    throw error;
  }
}

async function getContactsForUser(username) {
  try {
    const user = await User.findOne({ where: { Username: username } });

    if (!user) {
      throw new Error(`User with username "${username}" not found.`);
    }

    const contacts = await Contact.findAll({ where: { Username: username } });

    console.log('Contacts retrieved successfully:', contacts.map(contact => contact.toJSON()));
    return contacts;
  } catch (error) {
    console.error('Error retrieving contacts:', error.message);
    throw error;
  }
}

async function DeleteOneContact(id) {
  try {
    const contact = await Contact.findOne({ where: { id } });

    if (!contact) {
      throw new Error(`Contact with id "${id}" not found.`);
    }

    await contact.destroy();

    console.log('Contact deleted successfully:', contact.toJSON());
    return contact;
  } catch (error) {
    console.error('Error deleting contact:', error.message);
    throw error;
  }
}

async function updateContact(id, updatedContact) {
  try {
    const contact = await Contact.findOne({ where: { id } });

    if (!contact) {
      throw new Error(`Contact with id "${id}" not found.`);
    }

    contact.FirstName = updatedContact.firstName;
    contact.LastName = updatedContact.lastName;
    contact.Email = updatedContact.email;
    contact.Phone_Number = updatedContact.phoneNumber;
    contact.Company = updatedContact.company;
    contact.Job_Title = updatedContact.jobTitle;

    await contact.save();

    console.log('Contact updated successfully:', contact.toJSON());
    return contact;
  } catch (error) {
    console.error('Error updating contact:', error.message);
    throw error;
  }
}

module.exports = {
  createContactForUser,
  getContactsForUser,
  DeleteOneContact,
  updateContact
};
