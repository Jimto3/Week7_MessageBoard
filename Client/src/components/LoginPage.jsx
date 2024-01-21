import { useState } from "react";

export default function LoginPage({ getUser, user_id }) {
    const [login, setLogin] = useState(true);
    const [invalidLogin, setInvalidLogin] = useState(false);
    const [nameTaken, setNameTaken] = useState(false);
    return (
        <div>
            {user_id == 0 ? (
                <form onSubmit={login ? handleLogin : handleSignup}>
                    <h2>{login ? `Login: ` : `Sign Up: `}</h2>
                    <input name="username" required></input>
                    <input name="password" type="password" required></input>
                    <button>Submit</button>

                    {invalidLogin && login ? (
                        <h2 style={{ background: `red`, width: `fit-content` }}>
                            Incorrect Details!
                        </h2>
                    ) : null}

                    {nameTaken && !login ? (
                        <h2 style={{ background: `red`, width: `fit-content` }}>
                            Username Taken!
                        </h2>
                    ) : null}

                    <h3 onClick={() => setLogin(!login)} className="loginText">
                        {login
                            ? `Don't have an account?`
                            : `Already have an account?`}
                    </h3>
                </form>
            ) : (
                <>
                    {
                        <>
                            <h2>Already logged in!</h2>
                            <h3
                                onClick={() => getUser(0)}
                                className="loginText"
                            >
                                Logout
                            </h3>
                        </>
                    }
                </>
            )}
        </div>
    );
    async function handleLogin(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const data = await fetch(
            "https://messageboard-server.onrender.com/users",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            }
        );
        const user = await data.json();
        if (user[0]) {
            const user_id = user[0].id;
            getUser(user_id);
            setInvalidLogin(false);
        } else {
            setInvalidLogin(true);
        }
    }

    async function handleSignup(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const data = await fetch(
            "https://messageboard-server.onrender.com/add",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            }
        );
        const id = await data.json();
        console.log(id);
        if (id) {
            getUser(id);
            setNameTaken(false);
        } else {
            setNameTaken(true);
        }
    }
}
