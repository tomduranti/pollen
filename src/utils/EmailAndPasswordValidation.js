import { z } from 'zod';

export function validateEmail(emailToValidate) {
    /**
     * Validates a textual input 
     *
     * @param {string} emailToValidate - Email input string to validate
     * @returns {boolean} True if the email is healthy, otherwise false.
     */
    return (
        z
            .string()
            .min(1, 'Please enter an email')
            .email('Please enter a valid email address')
            .safeParse(emailToValidate)
    )
}

export function validatePassword(passwordToValidate) {
    /**
     * Validates a textual input
     *
     * @param {string} passwordToValidate - Email input string to validate
     * @returns {boolean} True if the email is healthy, otherwise false.
     */
    return (
        z
            .string()
            .min(6, 'The password must have at least 6 characters')
            .regex(/[A-Z]/, 'The password must have at least one uppercase character')
            .regex(/[a-z]/, 'The password must have at least one lowercase character')
            .regex(/[0-9]/, 'The password must have at least one number')
            .safeParse(passwordToValidate)
    )
}

export function validateForm(email, password, arrayError, wrapperError) {
    /**
     * Returns errors, if any, from email and password validation. Otherwise, it return true, meaning that both email
     * password are valid.
     *
     * @param {string} email - Email input string to validate
     * @param {string} password - Password input string to validate
     * @param {Array} arrayError - Array containing error messages
     * @param {function(string)} wrapperError - Setter function to populate arrayError
     * @returns {boolean} True if both email and password are healthy.
     */
    const emailSchema = validateEmail(email);
    const passwordSchema = validatePassword(password);

    !emailSchema.success
        ? wrapperError({ ...arrayError, errorEmail: emailSchema.error.issues[0].message })
        : null;

    !passwordSchema.success
        ? wrapperError({ ...arrayError, errorPassword: passwordSchema.error.issues[0].message })
        : null;

    if (emailSchema.success && passwordSchema.success) return true;
}
