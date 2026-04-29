import { motion } from 'framer-motion';
interface LogoProps {
  showText?: boolean;
}

export const Logo = ({ showText = true }: LogoProps) => {
  return (
   <div className="flex items-center gap-3.5 group">
      {/* Símbolo WM Soft (SVG) */}
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white p-1.5 shadow-sm border border-slate-100 transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
        
        {/* Fundo com Gradiente Pastel Suave */}
        <div className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,_var(--color-pastel-blue)_0%,_var(--color-pastel-lavender)_100%)] opacity-20 transition-opacity group-hover:opacity-30"></div>
        
        {/* SVG da Escrita Soft WM */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full relative z-10"
        >
          {/* Definição do Gradiente Pastel para o Traço */}
          <defs>
            <linearGradient id="wm-soft-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-pastel-blue)" />
              <stop offset="100%" stopColor="var(--color-pastel-lavender)" />
            </linearGradient>
          </defs>
          
          {/* Caminho da Escrita Fluida WM */}
          {/* Este traço desenha um 'W' que flui diretamente para um 'M' */}
          <motion.path
            d="M15 40C20 35 25 35 30 40C35 45 35 60 30 65C25 70 20 70 15 65M15 65C10 60 10 45 15 40M30 40C35 35 40 35 45 40C50 45 50 60 45 65C40 70 35 70 30 65M45 40C50 35 55 35 60 40C65 45 65 60 60 65C55 70 50 70 45 65M60 40C65 35 70 35 75 40C80 45 80 60 75 65C70 70 65 70 60 65"
            stroke="url(#wm-soft-gradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300 group-hover:stroke-pastel-blue"
            
            // Animação sutil de desenho ao carregar (opcional, requer framer-motion)
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Texto da Logo Suave */}
      {showText && (
        <span className="text-xl font-semibold text-pastel-text tracking-tight">
          William<span className="font-light text-slate-400">.dev</span>
        </span>
      )}
    </div>
  );
};