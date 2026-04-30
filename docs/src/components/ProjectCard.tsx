import type { Repository } from '@/types/github';
import { ImageCarousel } from '@/components/ImageCarousel';
// import { Github, ExternalLink } from 'lucide-react';

// const USUARIO = import.meta.env.VITE_GITHUB_USER as string;


interface ProjetCardProps {
    project: Repository;
}

export const ProjectCard = ({ project }: ProjetCardProps) => {
    // const previewUrl = `https://raw.githubusercontent.com/${USUARIO}/${project.name}/main/preview.png`;
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <ImageCarousel
                projectName={project.name}
                userName="Williamm4x"
            />
            {/* <img
                    className="object-cover w-full rounded-base h-64 md:h-auto md:w-48 mb-4 md:mb-0"
                    src={previewUrl}
                    alt={`Preview do projeto ${project.name}`}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Sem+Preview';
                    }}
                /> */}
            <div className='flex flex-col justify-between md:p-4 leading-normal'>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-heading">
                    {project.name.replace(/-/g, ' ')}
                </h5>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {project.language || 'Code'}
                </span>
                <p className="mb-6 text-body">
                    {project.description || 'Sem descrição disponível no GitHub.'}
                </p>
            </div>


            <div className="mt-4 flex flex-wrap gap-2">
                {project.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        #{topic}
                    </span>
                ))}
            </div>

            <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            > Ver no GitHub </a>
        </div>

    );
};
