import joi from 'joi';

// Schéma de validation pour l'ajout d'un contact
export const addContactSchema = joi.object({
    firstname: joi.string().min(3).max(50).required(),
    lastname: joi.string().min(3).max(50).required(),
    phone: joi.string().pattern(/^[0-9+\-\s()]*$/).min(10).max(20).required(),
    userId: joi.string().hex().length(24).required(), 
});

// Schéma de validation pour la mise à jour d'un contact
export const updateContactSchema = joi.object({
    firstname: joi.string().min(3).max(50).optional(),
    lastname: joi.string().min(3).max(50).optional(),
    phone: joi.string().pattern(/^[0-9+\-\s()]*$/).min(10).max(20).optional(),
}).or('firstname', 'lastname', 'phone');

// Schéma de validation pour l'ajout d'un user
export const registerUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{12,}$/).required(),
});

// Schéma de validation pour la connexion d'un user
export const loginUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{12,}$/).required(),
});