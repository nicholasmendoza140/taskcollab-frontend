import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api"

export default function Task() {
    const {taskId} = useParams()
    const [task, setTask] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getTask()
    }, [taskId])

    const getTask = async () => {
        try {
            const res = await api.get(`/tasks/${taskId}`)
            setTask(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h2>{task ? task.name : " "}</h2>

            <div>{task?.description}</div>
            <div>Status: {task?.status}</div>
            <div>Assignee: {task?.assignee ? `${task.assignee.firstName} ${task.assignee.lastName}` : "Unassigned" }</div>

            
        </div>
    )
}