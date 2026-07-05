import { NavLink } from "react-router";

export default function SignIn() {
    return (
        <>
            <button type='button'>SignIn with Google</button>

            <div>OR</div>

            <form novalidate>
                <label for="email">Email address</label>
                <input type="email" name="mail"
                    required aria-describedby="" aria-invalid="false" />
                <label for="password">Password</label>
                <input type="password" name="password"
                    required aria-describedby="" aria-invalid="false" />
                <button type="submit" id="submit">SignIn</button>
            </form>

            <span>Don't have an account? <NavLink to='/signup'>SignUp</NavLink></span>
        </>
    )
}