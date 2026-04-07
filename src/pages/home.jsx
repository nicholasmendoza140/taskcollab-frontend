import { useEffect, useState } from "react"
import api from "../api"

export default function Home() {
    
    const [teams, setTeams] = useState([])

    useEffect(() => {
        getTeams()
    }, [])
    const getTeams = async () => {
        try {
            const res = await api.get("/teams")
            setTeams(res.data)
        } catch (err) {
            console.error(err)
            alert("Failed to get teams")
        }

    }

    return (
        <div>
            <h2>Home</h2>
            {teams.map((t) => {
                return <div key={t.id}>{t.name}</div>
            })}
        </div>
    )
}