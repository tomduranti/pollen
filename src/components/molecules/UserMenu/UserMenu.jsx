//react
import SignOutButton from '@atoms/Buttons/SignOutButton.jsx';


export default function UserMenu({ userName }) {
    return (
        <div className='flex gap-3 max-w-44 w-full items-center justify-end'>
            {userName
                ? <span className='capitalize truncate text-[.813rem] text-(--color-text-secondary) font-normal'>hi, {userName}</span>
                : null
            }
            <SignOutButton />
        </div>
    )
}