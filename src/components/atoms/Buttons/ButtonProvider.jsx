//react
import { useNavigate } from "react-router";

//functions
import { authWithGoogleProvider } from '@utils/index.js';

//svg
import googleLogo from '@assets/icon_google.svg';

export default function ButtonProvider({ provider }) {
    let src;
    let handler;
    let textToDisplay;
    const navigate = useNavigate();
    const handleClickGoogleProvider = authWithGoogleProvider(navigate);

    switch (provider) {
        case 'google':
            src = googleLogo;
            handler = handleClickGoogleProvider;
            textToDisplay = 'Continue with Google';
            break
    }

    return (
        <button type='button' onClick={handler} className='flex gap-1 cta button border-(--color-border) text-[0.938rem] font-semibold'>
            <img src={src} alt='' />
            {textToDisplay}
        </button>
    )
}