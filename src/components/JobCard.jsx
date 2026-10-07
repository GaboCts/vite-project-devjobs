import { useState } from 'react'
import { Link } from './Link'
import { useFavoritesStore } from '../store/favoritesStore'
import styles from './JobCard.module.css'
import { useAuthStore } from '../store/authStore'

function JobCardFavoriteButton ({ jobId }) {
    const { toggleFavorite, isFavorite } = useFavoritesStore()
    const { isLoggedIn } = useAuthStore()

    return (
        <button disabled={!isLoggedIn} onClick={() => toggleFavorite(jobId)}>
            {isFavorite(jobId) ? '❤️' : '🤍'}
        </button>
    )
}

function JobCardApplyButton ({jobId}) {
    const [isApplied, setIsApplied] = useState(false)
    const { isLoggedIn } = useAuthStore()
    const handleApplyClick = () => {
        setIsApplied(true)
        console.log('Aplicando para: ', jobId)
    }

    const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'
    const buttonText = isApplied ? 'Aplicado' : 'Aplicar'
    const buttonDisabled = isApplied ? true : false

    return (
        <button disabled={!isLoggedIn || buttonDisabled} className={buttonClasses} onClick={handleApplyClick}>
            {buttonText}
        </button>
    )
}

export function JobCard({ job }) {

    return (
        <article
            className="job-listing-card"
            data-modalidad={job.data.modalidad}
            data-nivel={job.data.nivel}
            data-tecnology={job.data.tecnology}
        >
            <div>
                <h3>
                    <Link className={styles.title} href={`/jobs/${job.id}`}>
                        {job.titulo}
                    </Link>
                </h3>
                <small>{job.empresa} | {job.ubicacion}</small>
                <p>{job.descripcion}</p>
            </div>
            <div className={styles.actions}>
                <Link className={styles.details} href={`/jobs/${job.id}`}>
                    Ver detalles
                </Link>

                <JobCardApplyButton jobId={job.id} />
                <JobCardFavoriteButton jobId={job.id} />
            </div>
        </article>
    )
}