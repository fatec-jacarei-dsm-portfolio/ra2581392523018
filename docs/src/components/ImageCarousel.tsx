import { useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface Props {
  projectName: string;
  userName: string;
}

export const ImageCarousel = ({ projectName, userName }: Props) => {
  const [validImages, setValidImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const possibilities = [
    `https://raw.githubusercontent.com/${userName}/${projectName}/main/imagens/1.png`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/main/imagens/1.jpeg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/main/imagens/1.jpg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/main/imagens/2.png`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/main/imagens/2.jpeg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/main/imagens/2.jpg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/main/imagem/1.png`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/main/imagem/1.jpeg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/main/imagem/1.jpg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/main/imagem/2.png`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/main/imagem/2.jpeg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/main/imagem/2.jpg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/master/imagens/1.png`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/master/imagens/1.jpeg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/master/imagens/1.jpg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/master/imagens/2.png`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/master/imagens/2.jpeg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/master/imagens/2.jpg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/master/imagem/1.png`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/master/imagem/1.jpeg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/master/imagem/1.jpg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/master/imagem/2.png`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/master/imagem/2.jpeg`,
    `https://raw.githubusercontent.com/${userName}/${projectName}/master/imagem/2.jpg`,
  ];

  useEffect(() => {
    const validateImages = async () => {
      setLoading(true);
      const confirmedImages: string[] = [];

      // Testamos cada possibilidade usando fetch 
      const checks = possibilities.map(async (url) => {
        try {
          // Fazemos uma requisição HEAD para verificar se o arquivo existe (status 200)
          const response = await fetch(url, { method: 'HEAD' });
          if (response.ok) {
            confirmedImages.push(url);
          }
        } catch (error) {
        }
      });

      await Promise.all(checks);
      confirmedImages.sort();
      setValidImages(confirmedImages);
      setLoading(false);
    };

    validateImages();
  }, [projectName, userName]);

  const next = () => setIndex((prev) => (prev + 1) % validImages.length);
  const prev = () => setIndex((prev) => (prev - 1 + validImages.length) % validImages.length);

  if (loading) {
    return (
      <div className="relative aspect-video w-full flex items-center justify-center bg-slate-100 text-slate-400">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  if (validImages.length === 0) {
    return (
      <div className="relative aspect-video w-full flex items-center justify-center bg-slate-100 text-slate-400 border border-slate-200 rounded-t-2xl">
        <span className="text-sm font-medium">Projeto em Desenvolvimento</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-slate-100 group">
      <AnimatePresence mode="wait">
        <motion.img
          key={validImages[index]}
          src={validImages[index]}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            if (index > 0) setIndex(0); 
            else target.src = 'https://placehold.co/600x400?text=Projeto+em+Desenvolvimento';
          }}
        />
      </AnimatePresence>

      {/* Botões de Navegação */}
      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={(e) => { e.preventDefault(); prev(); }} className="p-1 rounded-full bg-white/80 shadow hover:bg-white">
          <ChevronLeft size={20} />
        </button>
        <button onClick={(e) => { e.preventDefault(); next(); }} className="p-1 rounded-full bg-white/80 shadow hover:bg-white">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Pontinhos */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
        {validImages.map((_, i) => (
          <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all ${i === index ? 'bg-blue-600 w-3' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};