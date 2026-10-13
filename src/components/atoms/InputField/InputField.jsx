export default function InputField({ state, error, type, name }) {
    const { email, password } = error;
    const { setCredentials, field } = state;
    
    const handleChange = e => setCredentials(prev => ({ 
        ...prev, 
        [field]: e.target.value 
    }));

    return (
        <>
            <div>
                <label className='inline-block mbe-1.5 text-xs text-(--color-text-secondary) font-medium capitalize' htmlFor={name}>{name}</label>
                <input className='cta input-field max-h-12.5 px-5 border-(--color-border)' type={type} name={name}
                    required aria-describedby='' aria-invalid='false' onChange={handleChange} />
            </div>
            {name === 'email' && <span className='error' aria-live='polite'>{email}</span>}
            {name === 'password' && <span className='error' aria-live='polite'>{password}</span>}
        </>
    );
}