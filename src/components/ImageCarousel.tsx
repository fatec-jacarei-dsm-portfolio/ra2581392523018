import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { GracefulImage } from '@/components/GracefulImage';


interface Props {
  projectName: string;
  userName: string;
}

export const ImageCarousel = ({ projectName, userName }: Props) => {
  const [validImages, setValidImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateImages = async () => {
      setLoading(true);
      const foundImages: string[] = [];
      const branches = ['main', 'master'];
      const folders = ['imagens', 'imagem'];
      const extensions = ['png', 'jpeg', 'jpg'];
      let imageIndex = 1;
      let keepSearching = true;

      while (keepSearching) {
        let foundForIndex = false;
        // Gera todas as URLs possíveis para o índice atual (1, 2, 3...)
        const possibilitiesForIndex: string[] = [];
        for (const branch of branches) {
          for (const folder of folders) {
            for (const ext of extensions) {
              possibilitiesForIndex.push(`https://raw.githubusercontent.com/${userName}/${projectName}/${branch}/${folder}/${imageIndex}.${ext}`);
            }
          }
        }

        // Tenta encontrar a primeira URL válida para o índice atual
        for (const url of possibilitiesForIndex) {
          try {
            const response = await fetch(url, { method: 'HEAD' });
            if (response.ok) {
              foundImages.push(url);
              foundForIndex = true;
              break; // Para de procurar outras variações para este índice
            }
          } catch (error) { /* Ignora erros de rede */ }
        }

        if (foundForIndex) {
          imageIndex++; // Se encontrou, incrementa para procurar o próximo número
        } else {
          keepSearching = false; // Se não encontrou, para o loop principal
        }
      }

      setValidImages(foundImages);
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

  const MotionGracefulImage = motion(GracefulImage);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-slate-100 group">
      <AnimatePresence initial={false} mode="wait">
        <MotionGracefulImage
          key={validImages[index]}
          src={validImages[index]}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full object-cover"
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