import { z } from 'zod';

export function validateEmail(emailToValidate) {
    return (
        z
            .string()
            .min(1, 'Please enter an email')
            .email('Please enter a valid email address')
            .safeParse(emailToValidate)
    )
}

export function validatePassword(passwordToValidate) {
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