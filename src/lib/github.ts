import type { Repository } from "@/types/github";

const USER = "Williamm4x";
const API_URL = `https://api.github.com/users/${USER}/repos?sort=updated&direction=desc`;

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
};

type LanguagesResponse = { [key: string]: number };

/**
 * Busca repositórios e seus detalhes de linguagem da API do GitHub.
 */
export const getRepositoriesWithLanguages = async (): Promise<Repository[]> => {
  try {
    // 1. Busca a lista inicial de repositórios
    const reposResponse = await fetch(API_URL, { headers });
    if (!reposResponse.ok) {
      const errorBody = await reposResponse.json().catch(() => null);
      console.error(
        "Falha ao buscar repositórios:",
        reposResponse.status,
        reposResponse.statusText,
      );
      if (errorBody?.message?.includes("API rate limit exceeded")) {
        console.warn(
          `Você atingiu o limite de requisições da API do GitHub. Os dados podem não ser carregados. Limite: ${reposResponse.headers.get(
            "X-RateLimit-Limit",
          )}, Usado: ${reposResponse.headers.get("X-RateLimit-Used")}`,
        );
      }
      return [];
    }
    const repos: Repository[] = await reposResponse.json();

    // 2. Cria um array de promises para buscar as linguagens
    const languagePromises = repos.map((repo) =>
      fetch(repo.languages_url, { headers })
        .then((response) => {
          if (response.ok) {
            return response.json() as Promise<LanguagesResponse>;
          }
          console.warn(
            `Falha ao buscar linguagens para o repositório '${repo.name}'. Status: ${response.status}. Usando fallback.`,
          );
          // Se a busca de uma linguagem específica falhar, retorna um objeto vazio para não quebrar todo o processo
          return {};
        })
        .catch((error) => {
          console.error(`Falha ao buscar linguagens para ${repo.name}:`, error);
          return {};
        }),
    );

    // 3. Aguarda a conclusão de todas as requisições de linguagens
    const languages = await Promise.all(languagePromises);

    // 4. Combina os dados originais do repositório com as linguagens buscadas
    const reposWithLanguages = repos.map((repo, index) => {
      const repoLanguages = languages[index];
      // Adiciona um log para diagnosticar repositórios que retornam uma lista de linguagens vazia.
      // A API do GitHub faz isso para repositórios sem código ou onde a análise de linguagem ainda não ocorreu.
      if (Object.keys(repoLanguages).length === 0 && repo.language) {
        console.log(
          `[INFO] Nenhuma linguagem detalhada encontrada para '${repo.name}'. O card usará a linguagem principal: '${repo.language}'.`,
        );
      }
      return { ...repo, languages: repoLanguages };
    });

    return reposWithLanguages;
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os dados do GitHub:", error);
    return []; // Retorna um array vazio em caso de erro crítico
  }
};
