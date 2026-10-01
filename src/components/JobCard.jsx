import { useState } from 'react'

export function JobCard({ job }) {
    const [isApplied, setIsApplied] = useState(false)

    const handleApplyClick = () => {
        setIsApplied(true)
    }

    const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'
    const buttonText = isApplied ? 'Aplicado' : 'Aplicar'
    const buttonDisabled = isApplied ? true : false

    return (
        <article
            className="job-listing-card"
            data-modalidad={job.data.modalidad}
            data-nivel={job.data.nivel}
            data-tecnology={job.data.tecnology}
        >
            <div>
                <h3>{job.titulo}</h3>
                <small>{job.empresa} | {job.ubicacion}</small>
                <p>{job.descripcion}</p>
            </div>
            <button disabled={buttonDisabled} className={buttonClasses} onClick={handleApplyClick}>
                {buttonText}
            </button>
        </article>
    )
}