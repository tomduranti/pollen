//react libraries and components
import { MoonLoader } from "react-spinners";

export default function Loading() {
    const override = {
        display: "block",
        margin: "0 auto",
    };

    return <MoonLoader color={'#2E7D57'} cssOverride={override} size={30} aria-label="Loading Spinner" data-testid="loader" />
}