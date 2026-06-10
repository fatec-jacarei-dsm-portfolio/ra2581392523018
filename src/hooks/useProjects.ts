import { useEffect, useState } from "react";
import axios from "axios";
import { getRepositoriesWithLanguages } from "@/lib/github";
import type { Repository } from "@/types/github";

export const useProjects = () => {
  const [entregas, setEntregas] = useState<Repository[]>([]);
  const [atividades, setAtividades] = useState<Repository[]>([]);
  const [projpessoais, setProjpessoais] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getRepositoriesWithLanguages();
        if (Array.isArray(data)) {
          const entregasArr: Repository[] = [];
          const atividadesArr: Repository[] = [];
          const projpessoaisArr: Repository[] = [];

          for (const repo of data) {
            // Exclui o repositório de perfil do usuário (ex: WilliamM4x/WilliamM4x)
            if (repo.name.toLowerCase() === "williamm4x") {
              continue;
            }

            const topics = repo.topics?.map((t) => t.toLowerCase()) || [];
            if (topics.includes("entrega")) {
              entregasArr.push(repo);
            } else if (topics.includes("atividades")) {
              atividadesArr.push(repo);
            } else if (topics.includes("projetos-pessoais")) {
              projpessoaisArr.push(repo);
            }
          }

          setEntregas(entregasArr);
          setAtividades(atividadesArr);
          setProjpessoais(projpessoaisArr);
        } else {
          console.error("A API não retornou um array:", data);
          setError("Formato de dados inválido recebido do GitHub.");
        }
      } 
      catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Erro na API do GitHub");
        console.error("Falha ao buscar os projetos:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocorreu um erro inesperado");
          setError("Ocorreu um erro inesperado ao buscar os projetos.");
        }
      } 
    }finally {
        setLoading(false);
      };
    }
    getProjects();
  }, []);

  return { entregas, atividades, projpessoais, loading, error };
};
