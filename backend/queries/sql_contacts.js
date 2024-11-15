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

module.exports = {
  createContactForUser,
};
