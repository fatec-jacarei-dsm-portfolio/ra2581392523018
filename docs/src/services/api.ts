import type {Repository}  from "@/types/github";
import axios from "axios";


const GITHUB_USERNAME = import.meta.env.VITE_USER_GIT as string;

export const getRepositories = async (): Promise<Repository[]> => {
    try{
        const {data} = await axios.get<Repository[]>(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
            params: {
            sort: 'updated',
            per_page: 100 }
        }); 
        //return data.filter(repo => !repo.fork);
        return data;

    } catch (error){
        console.log(error);
        return [];
    }
    
};
