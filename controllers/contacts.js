const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");

// GET ALL CONTACTS
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

// GET ONE CONTACT
const getSingleContact = async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({
        error: "Contact id is required"
      });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid contact id"
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

// POST - CREATE CONTACT
const createContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday
    ) {
      return res.status(400).json({
        error:
          "firstName, lastName, email, favoriteColor, and birthday are required"
      });
    }

    const database = getDatabase();

    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };

    const result = await database
      .collection("contacts")
      .insertOne(newContact);

    res.status(201).json({
      message: "Contact created successfully",
      id: result.insertedId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create contact"
    });
  }
};

// PUT - UPDATE CONTACT
const updateContact = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid contact id"
      });
    }

    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday
    ) {
      return res.status(400).json({
        error:
          "firstName, lastName, email, favoriteColor, and birthday are required"
      });
    }

    const database = getDatabase();

    const updatedContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };

    const result = await database
      .collection("contacts")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedContact }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Contact not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update contact"
    });
  }
};

// DELETE - DELETE CONTACT
const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid contact id"
      });
    }

    const database = getDatabase();

    const result = await database
      .collection("contacts")
      .deleteOne({
        _id: new ObjectId(id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Contact not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete contact"
    });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};