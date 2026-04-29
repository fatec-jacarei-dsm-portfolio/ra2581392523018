import {useEffect, useState} from 'react';
import axios from 'axios';
import {getRepositories} from '@/services/api';
import type {Repository}  from "@/types/github";

export const useProjects = ()=> {
    const [projects, setProjects] = useState<Repository[]>([]);
    const [entregas, setEntregas] = useState<Repository[]>([]);
    const [atividades, setAtividades] = useState<Repository[]>([]);
    const [projpessoais, setProjpessoais] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getProjetcts = async () =>{
            try{
                setLoading(true);
                const data = await getRepositories();
                if(Array.isArray(data)){
                    setProjects(data);

                    const projectsWithEntrega = data.filter(
                      (repo) => repo.topics?.includes("entrega"), 
                    );
                    const projectsWithAtividade = data.filter(
                      (repo) =>
                        repo.topics?.includes("atividades"), 
                    );
                    const projectsWithPessoal = data.filter(
                      (repo) =>
                        repo.topics?.includes("projetos-pessoais"), 
                    );

                    setEntregas(projectsWithEntrega);
                    setAtividades(projectsWithAtividade);
                    setProjpessoais(projectsWithPessoal);

                }else {
                    console.error("A API não retornou um array:", data);
                    setError("Formato de dados inválido recebido do GitHub.");
                }
                
            }catch (error){
                console.log(error);
                if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Erro na API do GitHub');
                } else {
                setError('Ocorreu um erro inesperado');
                }
            } finally {
                setLoading(false);
            }
        
        };
        getProjetcts();
    }, []);

    return { projects, entregas, atividades, projpessoais, loading, error };
};