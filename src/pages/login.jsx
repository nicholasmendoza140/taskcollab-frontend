import { useState } from "react"
import api from "../api"

export default function Login({ setLoggedIn }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/authenticate", { email, password })
            const token = res.data.token
            localStorage.setItem("token", token);
            setLoggedIn(true);
        } catch (err) {
            console.error(err)
            alert("Login failed")
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}