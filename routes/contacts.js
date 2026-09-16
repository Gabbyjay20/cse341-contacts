const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

// GET all contacts
router.get("/", contactsController.getAllContacts);

// GET one contact
router.get("/single", contactsController.getSingleContact);

// POST - create contact
router.post("/", contactsController.createContact);

// PUT - update contact
router.put("/:id", contactsController.updateContact);

// DELETE - delete contact
router.delete("/:id", contactsController.deleteContact);

module.exports = router;