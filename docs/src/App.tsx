import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/ProjectCard';
import { Header } from '@/components/Header';
import { motion } from 'framer-motion'; 
import { SQLHeader } from '@/components/SQLHeader';
import fotoPerfil from '@/assets/foto_perfil.jpeg';
import type { Variants } from 'framer-motion';


function App() {
  const { entregas, atividades, projpessoais, loading, error } = useProjects();

  // Variantes de animação do Framer Motion
  const cardVariants : Variants = {
    hiddenRight: { opacity: 0, x: 100 }, 
    hiddenLeft: { opacity: 0, x: -100 },  
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: 'easeOut' } 
    }
  };

  return (
    <>
      <Header /> {/* Adicionamos o Header aqui */}

      <main className="min-h-screen bg-slate-50 pt-24 px-6 pb-20"> 
        <div className="mx-auto max-w-7xl">
          
          {/* SEÇÃO: SOBRE MIM (No início) */}
          <section id="sobre" className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16">
            <div>
              <h1 className="mt-4 text-5xl font-black text-slate-950 md:text-6xl leading-tight">
                Olá, eu sou o <span className="text-blue-600">William</span>.
              </h1>
              <p className="mt-6 text-lg text-slate-600 max-w-xl">
                Minha trajetória profissional é movida pela curiosidade técnica e pela resolução de problemas complexos. Sempre fui fascinado por entender como as coisas funcionam, o que me levou à Física. Nessa área, aprendi a decifrar dados experimentais com Python, entendi a dinâmica da vida acadêmica e desenvolvi competências em hardware, trabalhando ainda em projetos simples, com microcontroladores para a automação da obtenção de dados e caracterização de materiais. Ao migrar para a tecnologia, percebi que meu diferencial está justamente na interseção entre o código e o mundo real.
                Hoje, essa jornada se traduz em projetos que vão desde o desenvolvimento mobile (Kotlin/Flutter) até utilizando dados geoespaciais. Tenho me dedicado profundamente ao estudo de dados espaciais, explorando o poder do PostgreSQL e do GeoPandas. Atualmente, consolido essa base técnica através de projetos na Fatec (graduação em curso) e na pesquisa que desenvolvo junto ao grupo Queimadas no INPE.
              </p>
            </div>
            
            {/* Espaço para sua foto ou uma ilustração */}
            <div className="relative group flex justify-center items-center">
            <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-tr from-pastel-blue/30 to-pastel-lavender/30 blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
            <img 
              src={fotoPerfil} 
              alt="William" 
              className="relative z-10 h-80 w-80 rounded-full object-cover border-4 border-white shadow-2xl transition-all duration-500 group-hover:rotate-2 group-hover:scale-105"
            />
      </div>
          </section>

          {/* SEÇÃO: PROJETOS */}
          <section id="projetos">
            <header className="mb-16">
              <h2 className="text-4xl font-extrabold text-slate-950">Meus <span className="text-blue-600">Projetos</span></h2>
              <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2 font-mono text-sm shadow-inner">
                <span className="text-pink-400">def</span>
                <span className="text-yellow-300">__init__</span>
                <span className="text-slate-300">(</span>
                <span className="text-orange-300">self</span>
                <span className="text-slate-300">,</span>
                <span className="text-blue-300">projects</span>
                <span className="text-slate-300">):</span>
              </div>
            </header>

          {/* SUBSEÇÃO: ENTREGAS (Filtro 'entrega') */}
              <div>
                <SQLHeader category="entrega" />
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                  {entregas.map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={cardVariants}
                      initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
                      whileInView="visible" 
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              </div>


          {/* SUBSEÇÃO: pessoal*/}
              <div>
                <SQLHeader category="pessoal" />
                {/* <h3 className="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-blue-600 pl-3">Projetos pessoais</h3> */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                  {projpessoais.map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={cardVariants}
                      initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
                      whileInView="visible" 
                      viewport={{ once: true, amount: 0.2 }} 
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              </div>

            {loading && <div className="text-center py-20 text-slate-500">Carregando do GitHub...</div>}
            {error && <div className="text-center py-20 text-red-600 bg-red-50 rounded-xl">Erro: {error}</div>}

            {!loading && !error && (
              <div className="space-y-24">
                

                {/* SUBSEÇÃO: ATIVIDADES */}
                <div>
                  <SQLHeader category="atividade" />
                  <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {atividades.map((project, index) => (
                      <motion.div
                        key={project.id}
                        variants={cardVariants}
                        // Inverte a lógica anterior para dar ritmo visual
                        initial={index % 2 !== 0 ? "hiddenLeft" : "hiddenRight"}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </section>

        </div>
      </main>
      
      {/* Rodapé simples (Opcional) */}
      <footer className="border-t border-slate-100 bg-white py-10 mt-20 text-center text-sm text-slate-500">
        © 2024 William. dev.
      </footer>
    </>
  );
}

export default App;