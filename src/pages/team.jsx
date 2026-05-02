import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api"


export default function Team() {
    const {teamId} = useParams()
    const [team, setTeam] = useState(null)
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getTeam()
        getProjects()
    }, [teamId])

    const getTeam = async () => {
        try {
            const res = await api.get(`/teams/${teamId}`)
            setTeam(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const getProjects = async () => {
        try {
            const res = await api.get(`/teams/${teamId}/projects`)
            setProjects(res.data)
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <div>
            <h2>{team ? team.name : " "}</h2>

            {projects.map((p) => (
                <div key={p.id} onClick={() => navigate(`/projects/${p.id}`)} style={{ cursor: "pointer" }}>
                    {p.name}
                </div>
            ))}
        </div>
    )
    
}