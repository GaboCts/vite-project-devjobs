import { useState, useRef } from "react";

let timeoutId = null

export function useSearchForm ({idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter}) {
    const counterRef = useRef(0)
    const [searchText, setSearchText] = useState("")

    console.log("Usado el ref tantas veces: ", counterRef.current)
    
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
        counterRef.current += 1
        
        const text = event.target.value
        setSearchText(text)

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            onTextFilter(text)
        }, 500)
    }

    return {
        searchText,
        handleSubmit,
        handleTextChange
    }

}