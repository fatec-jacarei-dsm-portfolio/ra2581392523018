import type { Repository } from '@/types/github';
import { ImageCarousel } from '@/components/ImageCarousel';



interface ProjetCardProps {
    project: Repository;
}

const languageIcons: { [key: string]: React.ReactNode } = {
    python: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 5.5H12V12H5.5V8.5H8.5V5.5H12M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 9.24 20.9 6.77 19.14 4.93C18.43 4.2 17.58 3.63 16.62 3.21L15.5 5.5M8.5 18.5H12V12H18.5V15.5H15.5V18.5H12M12 22C14.76 22 17.23 20.9 19.07 19.14C19.8 18.43 20.37 17.58 20.79 16.62L18.5 15.5V12H12V18.5Z" fill="#3776AB" /></svg>
    ),
    kotlin: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2H22L12 12L22 22H2L12 12L2 2Z" fill="url(#kotlin-gradient-card)" /><defs><linearGradient id="kotlin-gradient-card" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#7F52FF" /><stop offset="0.5" stopColor="#0094FF" /><stop offset="1" stopColor="#00E599" /></linearGradient></defs></svg>
    ),
    postgresql: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.5 16.5H13.5V18.5H11.5V16.5H9.5V14.5H11.5V12.5H9.5V10.5H11.5V8.5H9.5V6.5H13.5V10.5H15.5V12.5H13.5V14.5H15.5V16.5Z" fill="#336791" /><path d="M11.5 6.5V8.5H9.5V6.5H11.5Z" fill="white" /><path d="M11.5 8.5H13.5V10.5H11.5V8.5Z" fill="white" /><path d="M11.5 10.5H9.5V12.5H11.5V10.5Z" fill="white" /><path d="M11.5 12.5H13.5V14.5H11.5V12.5Z" fill="white" /><path d="M11.5 14.5H9.5V16.5H11.5V14.5Z" fill="white" /><path d="M13.5 14.5H15.5V16.5H13.5V14.5Z" fill="white" /></svg>
    ),
    typescript: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2H22V22H2V2Z" fill="#007ACC" /><path d="M8.5 7.5H15.5V9.5H12.5V16.5H10.5V9.5H8.5V7.5Z" fill="white" /></svg>
    ),
    javascript: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#F7DF1E" d="M0 0h32v32H0z" /><path d="M21.938 21.625c-.5.688-1.312 1.125-2.312 1.125-1.125 0-1.938-.5-2.438-1.25-.5-.813-.625-1.813-.625-3 .0-1.188.25-2.188.75-3 .5-.812 1.313-1.25 2.313-1.25 1 0 1.75.438 2.25 1.188.5.75.687 1.687.687 2.812h-2.438c0-.75-.125-1.375-.5-1.75-.313-.375-.75-.562-1.375-.562-.687 0-1.187.313-1.5 1.875-.312.562-.437 1.312-.437 2.187 0 .875.125 1.563.438 2.125.312.563.812.875 1.5.875.625 0 1.062-.187 1.375-.625.375-.438.5-1.125.5-2h2.438c0 1.187-.25 1.812-.625 2.312zM13.375 21.625c-.5.688-1.313 1.125-2.313 1.125-1.125 0-1.937-.5-2.437-1.25-.5-.813-.625-1.813-.625-3 0-1.188.25-2.188.75-3 .5-.812 1.312-1.25 2.312-1.25 1 0 1.75.438 2.25 1.188.5.75.688 1.687.688 2.812h-2.438c0-.75-.125-1.375-.5-1.75-.312-.375-.75-.562-1.375-.562-.688 0-1.188.313-1.5 1.875-.312.562-.438 1.312-.438 2.187 0 .875.125 1.563.438 2.125.312.563.812.875 1.5.875.625 0 1.062-.187 1.375-.625.375-.438.5-1.125.5-2h2.438c0 1.187-.25 1.812-.625 2.312z" /></svg>
    ),
    html: (
        <svg viewBox="0 0 24 24" fill="#E34F26" xmlns="http://www.w3.org/2000/svg"><path d="M1.61,21.39,3.33,2.61H20.67L18.95,21.38,12,23.39ZM5.1,4.3,6.4,19.68l5.6,1.55,5.6-1.55L18.9,4.3Z" /><path d="M12,6.1h6.5l-.5,5.2H12Zm0,6.2h5.8l-.4,4.2-3.4,1V16.3H12Z" /></svg>
    ),
    css: (
        <svg viewBox="0 0 24 24" fill="#1572B6" xmlns="http://www.w3.org/2000/svg"><path d="M1.61,21.39,3.33,2.61H20.67L18.95,21.38,12,23.39ZM5.1,4.3,6.4,19.68l5.6,1.55,5.6-1.55L18.9,4.3Z" /><path d="M12,6.1H18l-.4,5.2H12Zm0,6.2h5.4l-.4,4.2-3,1V16.3H12Z" /></svg>
    ),
};

export const ProjectCard = ({ project }: ProjetCardProps) => {

    return (
        <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <ImageCarousel
                projectName={project.name}
                userName="Williamm4x"
            />
            <div className='flex flex-col p-4 leading-normal'>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-heading">
                    {project.name.replace(/-/g, ' ')}
                </h5>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                    {project.languages && Object.keys(project.languages).length > 0 ? (
                        Object.keys(project.languages).map((lang) => (
                            <span key={lang} className="flex items-center gap-1.5 rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                                {languageIcons[lang.toLowerCase()] && <div className="h-3.5 w-3.5">{languageIcons[lang.toLowerCase()]}</div>}
                                {lang}
                            </span>
                        ))
                    ) : (
                        project.language && (
                            <span className="flex items-center gap-1.5 rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                                {languageIcons[project.language.toLowerCase()] && <div className="h-3.5 w-3.5">{languageIcons[project.language.toLowerCase()]}</div>}
                                {project.language}
                            </span>
                        )
                    )}
                </div>
                <p className="text-body mb-3">
                    {project.description || 'Sem descrição disponível no GitHub.'}
                </p>
            </div>

            <div className="mt-auto p-4 pt-0">
                <div className="mb-4 flex flex-wrap gap-2">
                    {project.topics.slice(0, 4).map((topic) => (
                        <span key={topic} className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            #{topic}
                        </span>
                    ))}
                </div>
                <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                > Ver no GitHub </a>
            </div>
        </div>

    );
};
