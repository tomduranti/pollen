export default function ErrorBanner({ errorMessageValidation, authMode }) {
    return (
        <>
            {(errorMessageValidation && authMode === 'signup') && <div className='error' aria-live='polite'>This email is already in use. Try to <NavLink to='/signin'>sign in</NavLink></div>}
            {(errorMessageValidation && authMode === 'signin') && <div className='error' aria-live='polite'>Invalid email or password</div>}
        </>
    )
}