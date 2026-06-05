export const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo / Nome */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-600"></div> 
          {/* <button onClick={() => scrollToSection('sobre')} className="focus:outline-none">
          <Logo />
          </button> */}
          <span className="text-xl font-bold text-slate-950">Self.<span className="font-light text-slate-500">William</span></span>
        </div>

        {/* Navegação */}
        <nav className="flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('sobre')} 
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            Sobre Mim
          </button>
          
          <button 
            onClick={() => scrollToSection('projetos')} 
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            Projetos
          </button>
          
          {/* Contato botão */}
          <a 
            href="https://www.linkedin.com/in/william-max-7b8036140/"
            target="_blank"
            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition"
          >
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
};