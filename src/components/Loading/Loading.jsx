//react libraries and components
import { MoonLoader } from "react-spinners";

export default function Loading() {
    const isLoading = true;
    const color = 'black';

    const override = {
        display: "block",
        marginInline: "auto",
    };

    return <MoonLoader color={color} loading={isLoading} cssOverride={override} size={30} aria-label="Loading Spinner" data-testid="loader" />
}