import {useState} from "react";

// Хук для загрузки

export default function useLoading() {
    const [loading, setLoading] = useState(true)

    const endLoading = () => {
        setLoading(false)
    }

    return [
        loading, endLoading
    ]
}

