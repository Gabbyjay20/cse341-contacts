const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");

const getAllContacts = async (req, res) => {
  try {
    const database = getDatabase();

    const contacts = await database
      .collection("contacts")
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve contacts"
    });
  }
};

const getSingleContact = async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({
        error: "Contact id is required"
      });
    }

    const database = getDatabase();

    const contact = await database
      .collection("contacts")
      .findOne({
        _id: new ObjectId(id)
      });

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found"
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve contact"
    });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact
};