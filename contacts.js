const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (err) {
    throw err;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    return contact;
  } catch (err) {
    throw err;
  }
}

async function removeContact(contactId) {
  try {
    let contacts = await listContacts();
    contacts = contacts.filter((contact) => contact.id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  } catch (err) {
    throw err;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();

    contacts.push({
      id: shortid.generate(),
      name,
      email,
      phone,
    });

    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
