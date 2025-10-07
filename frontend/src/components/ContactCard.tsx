import { useState, type JSX } from "react";
import type { Contact } from "../pages/Contact";

interface ContactCardProps {
    contact: Contact;
    handleDelete: (id: string) => void;
}

export default function ContactCard({contact, handleDelete}: ContactCardProps): JSX.Element {

    const [update, setUpdate] = useState(false);
    const [editedContact, setEditedContact] = useState<Contact>(contact);
    const token = localStorage.getItem("token");


    const handleUpdate = () => {
        try {
            fetch(`${import.meta.env.VITE_API_URL}/contacts/${contact._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ firstName: editedContact.firstName, lastName: editedContact.lastName, phone: editedContact.phone }),
                credentials: "include",
            })
                .then(res => res.json())
                .then(data => {
                    setUpdate(false);
                    setEditedContact(data);
                });
        } catch (error) {
            console.error("Erreur lors de la mise à jour du contact :", error);
        }
    }

    return (
        <div className="contact-card">
            {update ?
                <>
                    <input type="text" value={editedContact.firstName} onChange={(e) => setEditedContact({...editedContact, firstName: e.target.value})} />
                    <input type="text" value={editedContact.lastName} onChange={(e) => setEditedContact({...editedContact, lastName: e.target.value})} />
                    <input type="text" value={editedContact.phone} onChange={(e) => setEditedContact({...editedContact, phone: e.target.value})} />
                    <button onClick={handleUpdate}>Enregistrer</button>
                </>
                : <>
                    <h3>{contact.firstName} {contact.lastName}</h3>
                    <p>Téléphone: {contact.phone}</p>
                    <button onClick={() => handleDelete(contact._id)}>Supprimer</button>
                    <button onClick={() => setUpdate(true)}>Modifier</button>
                </>
            }
        </div>
    );
}