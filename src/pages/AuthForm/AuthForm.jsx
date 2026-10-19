//react and components
import ButtonProvider from '@atoms/Buttons/ButtonProvider.jsx';
import Separator from '@atoms/Separator/Separator.jsx';
import FormToSignUpOrIn from '@organisms/FormToSignUpOrIn/FormToSignUpOrIn.jsx';

export default function AuthForm({ authMode }) {
  return (
    <section className='flex flex-col gap-5 md:mx-auto md:max-w-sm md:w-full md:border md:border-solid md:rounded-2xl md:border-transparent md:px-8 md:py-5 md:shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]'>
      <h2 className='text-[1.375rem] font-semibold'>
        {authMode === 'signup' ? 'Create' : 'Sign in to'} {'your account'}
      </h2>
      <ButtonProvider provider='google' />
      <Separator />
      <FormToSignUpOrIn authMode={authMode} />
    </section>
  );
}
