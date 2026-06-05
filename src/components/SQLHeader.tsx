
interface SQLHeaderProps {
  category: 'entrega' | 'pessoal' | 'atividade';
}

export const SQLHeader = ({ category }: SQLHeaderProps) => {
  const categoryLabels = {
    entrega: "'PROJETOS_FATEC'",
    pessoal: "'PROJETO_PESSOAL'",
    atividade: "'EXERCICIO_E_ATIVIDADE'",
  };

  return (
    <div className="mb-8 mt-8 inline-flex flex-wrap items-center gap-x-2 rounded-lg bg-slate-800 px-4 py-3 font-mono text-sm shadow-lg border-l-4 border-blue-500">
      <span className="text-pink-400 uppercase font-bold">SELECT</span>
      <span className="text-slate-200">*</span>
      <span className="text-pink-400 uppercase font-bold">FROM</span>
      <span className="text-blue-300">repositories</span>
      <span className="text-pink-400 uppercase font-bold">WHERE</span>
      <span className="text-blue-300">category</span>
      <span className="text-slate-200">=</span>
      <span className="text-orange-300">{categoryLabels[category]}</span>
      <span className="text-slate-400">;</span>
    </div>
  );
};