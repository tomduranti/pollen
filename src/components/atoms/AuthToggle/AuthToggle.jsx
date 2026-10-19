//react
import { NavLink } from 'react-router';

export default function AuthToggle({ authMode }) {
  return (
    <>
      {authMode === 'signin' ? (
        <div className='text-[0.813rem] text-(--color-text-secondary) font-normal'>
          Don't have an account?{' '}
          <NavLink to='/signup' tabIndex={0} className='safari font-bold'>
            Sign up
          </NavLink>
        </div>
      ) : (
        <div className='text-[0.813rem] text-(--color-text-secondary) font-normal'>
          Already have an account?{' '}
          <NavLink to='/signin' tabIndex={0} className='safari font-bold'>
            Sign in
          </NavLink>
        </div>
      )}
    </>
  );
}
