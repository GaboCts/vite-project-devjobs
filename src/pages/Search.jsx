import { Pagination } from '../components/Pagination.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobsListings } from '../components/JobsListings.jsx'
import { useFilters } from '../hooks/useFilters.jsx'
import { LottieAnimation } from '../components/LottieAnimation.jsx'
import Loading from '../assets/loadingLottie.json'

export default function SearchPage() {
    const {
        loading,
        jobs,
        total,
        totalPages,
        currentPage,
        textToFilter,
        filters,
        handlePageChange,
        handleSearch,
        handleTextFilter
    } = useFilters()

    const title = loading
        ? "Cargando - DevJobs"
        : `Resultados: ${total}, Página ${currentPage} - DevJobs`

    return (
        <main>
            <title>{title}</title>
            <meta name="description" content="Explora miles de oportunidades laborales en el sector tecnológico. Encuentra tu próximo empleo en DevJobs" />
            <SearchFormSection
                initialText={textToFilter}
                technology={filters.technology}
                type={filters.location}
                level={filters.experienceLevel}
                onSearch={handleSearch}
                onTextFilter={handleTextFilter}
            />
            <section>
                <h2 className="jobs-listings-title">Resultados de búsqueda</h2>
                {
                    loading ? <LottieAnimation animation={Loading} width="320px" height="320px"/> : <JobsListings jobs={jobs} />
                }
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </section>
        </main>
    )
}