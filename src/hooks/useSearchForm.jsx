import { useState, useRef } from "react";

export function useSearchForm ({idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter}) {
    const timeoutId = useRef(null)
    const [searchText, setSearchText] = useState("")
    
    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        if (event.target.name === idText) {
            return
        }

        const filters = {
            search: formData.get(idText),
            technology: formData.get(idTechnology),
            location: formData.get(idLocation),
            experienceLevel: formData.get(idExperienceLevel)
        }

        onSearch(filters)
    }

    const handleTextChange = (event) => {
        
        const text = event.target.value
        setSearchText(text)

        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }

        timeoutId.current = setTimeout(() => {
            onTextFilter(text)
        }, 500)
    }

    return {
        searchText,
        handleSubmit,
        handleTextChange
    }

}