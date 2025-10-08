import { useState, type JSX } from "react";
import type { Contact } from "../pages/Contact";
import { useAuth } from "../context/useAuth";

interface ContactCardProps {
    contact: Contact;
    handleDelete: (id: string) => void;
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export default function ContactCard({ contact, handleDelete, setContacts }: ContactCardProps): JSX.Element {

    const [update, setUpdate] = useState(false);
    const [editedContact, setEditedContact] = useState<Contact>(contact);
    const { auth } = useAuth();

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts/${contact._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`,
                },
                body: JSON.stringify({ firstName: editedContact.firstName, lastName: editedContact.lastName, phone: editedContact.phone }),
                credentials: "include",
            });
            const data = await response.json();
            setUpdate(false);
            setEditedContact(data);
            setContacts((prevContacts) => prevContacts.map((c) => (c._id === data._id ? data : c)));
        } catch (error) {
            console.error("Erreur lors de la mise à jour du contact :", error);
        }
    }

    return (
        <div className="contact-card">
            {update ?
                <>
                <form>
                    <input
                        onChange={(event) =>  setEditedContact({...editedContact, firstName: event.target.value})}
                        type="text"
                        value={editedContact.firstName}
                    />
                    <input
                        onChange={(event) => setEditedContact({...editedContact, lastName: event.target.value})}
                        type="text"
                        value={editedContact.lastName}
                    />
                    <input
                        onChange={(event) => setEditedContact({...editedContact, phone: event.target.value})}
                        type="text"
                        value={editedContact.phone}
                    />
                    <button type="button" onClick={handleUpdate}>Enregistrer</button>
                </form>
                    <button onClick={() => setUpdate(false)}>Annuler</button>
                </> :
                <>
                    <h3>{contact.firstName} {contact.lastName}</h3>
                    <p>Téléphone: {contact.phone}</p>
                    <button onClick={() => handleDelete(contact._id)}>Supprimer</button>
                    <button onClick={() => setUpdate(true)}>Modifier</button>
                </>
            }
        </div>
    );
}