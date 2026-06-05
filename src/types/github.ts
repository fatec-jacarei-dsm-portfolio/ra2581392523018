interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  languages_url: string;
  fork: boolean;
  languages?: { [key: string]: number }; 
}

export type { Repository};