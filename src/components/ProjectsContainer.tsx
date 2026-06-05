import { useEffect, useState } from 'react';
import type { Repository } from '@/types/github';
import { getRepositoriesWithLanguages } from '@/lib/github';
import { ProjectCard } from './ProjectCard';

export const ProjectsContainer = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Define uma função assíncrona dentro do useEffect para buscar os dados
        const loadData = async () => {
            setIsLoading(true);
            const repos = await getRepositoriesWithLanguages();
            setRepositories(repos);
            setIsLoading(false);
        };

        loadData();
    }, []); // O array de dependências vazio garante que isso rode apenas uma vez

    if (isLoading) {
        return <div className="text-center">Carregando projetos...</div>;
    }

    return (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {repositories.map((repo) => (
                <ProjectCard key={repo.id} project={repo} />
            ))}
        </section>
    );
};
