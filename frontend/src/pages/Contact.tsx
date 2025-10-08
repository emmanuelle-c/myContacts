import { useEffect, useState, type JSX } from "react";
import ContactCard from "../components/ContactCard";
import { useAuth } from "../context/useAuth";

export interface Contact {
    firstName: string;
    lastName: string;
    phone: string;
    _id: string;
}

export default function Contact(): JSX.Element {

    const [contacts, setContacts] = useState<Contact[]>([]);
    const { auth } = useAuth();
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts`, {
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${auth.token}`,
                    },
                });
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des contacts :", error);
            }
        };
        fetchContacts();
    }, [contacts.length, auth.token]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const phone = formData.get("phone") as string;

        try {
            fetch(`${import.meta.env.VITE_API_URL}/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`,
                },
                body: JSON.stringify({ firstname: firstName, lastname: lastName, phone: phone }),
                credentials: "include",
            })
                .then(res => res.json())
                .then(data => setContacts([...contacts, data]));

        } catch (error) {
            console.error("Erreur lors de l'ajout du contact :", error);
        } finally {
            e.currentTarget.reset();
        }
    };

    const handleDelete = (id: string) => {
        try {
            fetch(`${import.meta.env.VITE_API_URL}/contacts/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${auth.token}`,
                },
                credentials: "include",
            })
                .then(res => res.json())
                .then(() => {
                    setContacts(contacts.filter(c => c._id !== id));
                });
        } catch (error) {
            console.error("Erreur lors de la suppression du contact :", error);
        }
    }

    return (
        <div className="Contact">
            <h1>Bonjour {auth.email}</h1>
            <section>
                <h2>Voici la liste de vos contacts :</h2>
                {Array.isArray(contacts) && contacts.map((contact: Contact, id: number) => (
                    <ContactCard key={id} contact={contact} handleDelete={handleDelete} setContacts={setContacts} />
                ))}
            </section>
            <section>
                <h2>Ajouter un contact :</h2>
                <form className="add-contact-form" onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="Prénom" required />
                    <input type="text" name="lastName" placeholder="Nom" required />
                    <input type="text" name="phone" placeholder="Téléphone" required />
                    <button type="submit">Ajouter</button>
                </form>
            </section>
        </div>
    );
}