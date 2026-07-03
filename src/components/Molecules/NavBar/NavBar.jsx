//react and components
import UserAvatar from '../../atoms/UserAvatar/UserAvatar.jsx';
import LocaleDropdownMenu from '../../atoms/LocaleDropdownMenu/LocaleDropdownMenu.jsx';
import Stack from '@mui/material/Stack';

export default function NavBar() {
    return(
        <section>
            <Stack direction="row" alignitems="center" spacing={2} sx={{ py: 1, px: 2 }}>
                <a href="/">Logo</a>
                <UserAvatar />
                <LocaleDropdownMenu />
            </Stack>
        </section>
    )
}