import { useEffect, useState } from 'react'
import { useRouter } from './useRouter.jsx'


const RESULTS_PER_PAGE = 4

export function useFilters() {
    const [filters, setFilters] = useState(() => {
        const params = new URLSearchParams(window.location.search)
        return {
            technology: params.get('technology') || '',
            location: params.get('type') || '',
            experienceLevel: params.get('level') || ''
        }
    })
    const [textToFilter, setTextToFilter] = useState(() => {
        const params = new URLSearchParams(window.location.search)
        return params.get('text') || ''
    })
    const [currentPage, setCurrentPage] = useState(() => {
        const params = new URLSearchParams(window.location.search)
        const page = Number(params.get('page'))
        return Number.isNaN(page) ? page : 1
    })
    
    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    
    const { navigateTo } = useRouter()
    
    useEffect(() => {
        async function fetchJobs() {
            try {
                setLoading(true)

                const params = new URLSearchParams()
                if (textToFilter) params.append('text', textToFilter)
                if (filters.technology) params.append('technology', filters.technology)
                if (filters.location) params.append('type', filters.location)
                if (filters.experienceLevel) params.append('level', filters.experienceLevel)

                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append('limit', RESULTS_PER_PAGE)
                params.append('offset', offset)

                const queryParams = params.toString()

                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
                const json = await response.json()

                setJobs(json.data)
                setTotal(json.total)
            } catch (error) {
                console.error("Error fetching jobs: ", error)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [filters, textToFilter, currentPage])

    useEffect(() => {
        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experienceLevel) params.append('level', filters.experienceLevel)

        if (currentPage > 1) params.append('page', currentPage)
        
        const newUrl = params.toString()
            ? `${window.location.pathname}?${params.toString()}`
            : window.location.pathname

        navigateTo(newUrl)

    }, [filters, currentPage, textToFilter, navigateTo])

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
    }

    const handleTextFilter = (newTextToFilter) => {
        setTextToFilter(newTextToFilter)
        setCurrentPage(1)
    }

    return {
        loading,
        jobs,
        total,
        totalPages,
        currentPage,
        textToFilter,
        handlePageChange,
        handleSearch,
        handleTextFilter
    }
}