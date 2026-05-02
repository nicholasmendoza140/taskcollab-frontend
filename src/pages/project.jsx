import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api"

export default function Project() {
    const {projectId} = useParams()
    const [project, setProject] = useState(null)
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getProject()
        getTasks()
    }, [projectId])

    const getProject = async () => {
        try {
            const res = await api.get(`/projects/${projectId}`)
            setProject(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const getTasks = async () => {
        try {
            const res = await api.get(`/projects/${projectId}/tasks`)
            setTasks(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h2>{project ? project.name : " "}</h2>

            {tasks.map((t) => (
                <div key={t.id} onClick={() => navigate(`/tasks/${t.id}`)} style={{ cursor: "pointer" }}>
                    {t.name}
                </div>
            ))}
        </div>
    )
}