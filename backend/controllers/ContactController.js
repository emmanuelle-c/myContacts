import Contact from "../models/Contact.js";

class ContactController {

    async getAllContacts(req, res) {
        try {
            const userId = req.userId;
            const contacts = await Contact.find({ userId });
            res.json(contacts);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération des contacts" });
            console.error("Get all contacts error:", error);
        }
    }

    async getContactById(req, res) {
        try {
            const userId = req.userId;
            const contactId = req.params.id;
            const contact = await Contact.findOne({ _id: contactId, userId });
            if (!contact) {
                return res.status(404).json({ error: "Contact non trouvé" });
            }
            res.json(contact);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération du contact" });
            console.error("Get contact by ID error:", error);
        }
    }

    async createContact(req, res) {
        try {
            const userId = req.userId;
            const { name, email, phone } = req.body;

            const newContact = new Contact({ userId, name, email, phone });
            await newContact.save();
            res.status(201).json(newContact);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la création du contact" });
            console.error("Create contact error:", error);
        }
    }

    async updateContact(req, res) {
        try {
            const userId = req.userId;
            const contactId = req.params.id;
            const { name, email, phone } = req.body;

            const updatedContact = await Contact.findOneAndUpdate(
                { _id: contactId, userId },
                { name, email, phone },
                { new: true }
            );

            if (!updatedContact) {
                return res.status(404).json({ error: "Contact non trouvé" });
            }

            res.json(updatedContact);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la mise à jour du contact" });
            console.error("Update contact error:", error);
        }
    }
    
    async deleteContact(req, res) {
        try {
            const userId = req.userId;
            const contactId = req.params.id;
            const deletedContact = await Contact.findOneAndDelete({ _id: contactId, userId });
            if (!deletedContact) {
                return res.status(404).json({ error: "Contact non trouvé" });
            }
            res.json({ message: "Contact supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la suppression du contact" });
            console.error("Delete contact error:", error);
        }
    }
}

export default ContactController;