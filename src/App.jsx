import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import AgendarReuniao from "./components/AgendarReuniao.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Soluções" },
  { href: "#ferramentas", label: "Ferramentas" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

const services = [
  {
    title: "Automação Operacional",
    description:
      "Tornamos o dia a dia da sua operação mais ágil e organizado. Automatizamos tarefas repetitivas, conectamos ferramentas e criamos fluxos inteligentes que economizam tempo e reduzem erros.",
  },
  {
    title: "Integração Inteligente",
    description:
      "Fazemos suas plataformas e dados trabalharem juntos. Unificamos sistemas, otimizamos a comunicação entre equipes e garantimos uma operação fluida, sem retrabalho ou confusão.",
  },
  {
    title: "Sistemas Personalizados",
    description:
      "Desenvolvemos sistemas e painéis sob medida para o seu negócio. Cada solução reflete a identidade da sua marca e potencializa decisões com clareza, estética e inteligência.",
  },
];

const testimonials = [
  {
    name: "Ana Martins",
    role: "CEO, Vertex Labs",
    quote:
      "A Evorise redesenhou toda a nossa rotina de atendimento e gestão. Em poucas semanas, ganhamos organização e tempo pra focar no que realmente importa: crescer.",
  },
  {
    name: "Lucas Pereira",
    role: "Diretor de Operações, Novawave",
    quote:
      "A automação que eles criaram simplificou tudo. Hoje, nossa equipe trabalha com mais clareza, menos erros e muito mais velocidade.",
  },
  {
    name: "Beatriz Costa",
    role: "Fundadora, Nimbus Ventures",
    quote:
      "Foi além da tecnologia. A Evorise entendeu nosso negócio, o estilo da marca e entregou uma experiência completa — estética e eficiente.",
  },
];

const tools = [
  { src: "/icons/openai.svg", alt: "OpenAI" },
  { src: "/icons/n8n.svg", alt: "n8n" },
  { src: "/icons/notion.svg", alt: "Notion" },
  { src: "/icons/google-cloud.svg", alt: "Google Cloud" },
  { src: "/icons/google-gemini.svg", alt: "Google Gemini" },
];

function useHeroParticles(particleCount = 60) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
    };

    resize();

    particles.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.25 + 0.1,
    }));

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      context.clearRect(0, 0, width, height);
      particles.current.forEach((particle) => {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(124, 58, 237, ${particle.alpha})`;
        context.fill();

        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > width) {
          particle.dx *= -1;
        }

        if (particle.y < 0 || particle.y > height) {
          particle.dy *= -1;
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount]);

  return canvasRef;
}

export default function App() {
  const canvasRef = useHeroParticles(75);

  const socialLinks = useMemo(
    () => [
      { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
      { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
      { icon: FaWhatsapp, href: "https://wa.me/5581999999999", label: "WhatsApp" },
    ],
    []
  );

  return (
    <div className="bg-evoblack text-white font-inter overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.35),_transparent_65%)]" />

      <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-purple-700/20">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-5">
          <a href="#inicio" className="text-2xl font-semibold tracking-[0.3em] uppercase text-purple-400">
            Evorise
          </a>
          <div className="hidden items-center gap-16 md:flex">
            <nav className="flex items-center gap-8 text-sm uppercase tracking-[0.2em] text-gray-300">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition hover:text-purple-400">
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href="#contato"
              className="rounded-full border border-purple-500/60 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-purple-200 transition hover:bg-purple-600/20"
            >
              Agendar Reunião
            </a>
          </div>
          <a
            href="#contato"
            className="rounded-full border border-purple-500/60 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-purple-200 transition hover:bg-purple-600/20 md:hidden"
          >
            Agendar Reunião
          </a>
        </div>
      </header>

      <main id="inicio" className="relative">
        <section className="relative flex min-h-screen items-center justify-center px-6 pt-32">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-transparent to-black/80" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="relative z-10 max-w-4xl text-center"
          >
            <span className="inline-flex items-center rounded-full border border-purple-500/40 px-4 py-2 text-xs uppercase tracking-[0.35em] text-purple-200">
              excelência em automação
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-purple-200 md:text-6xl md:leading-[1.15]">
              Automação inteligente para negócios que querem crescer com estilo, eficiência e resultado.
            </h1>
            <p className="mt-6 text-base text-gray-300 md:text-lg">
              A Evorise transforma processos em experiências. Criamos ecossistemas digitais que organizam, encantam e
              elevam a performance da sua marca — do atendimento à operação.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#sobre"
                className="rounded-full bg-gradient-to-r from-purple-600 to-purple-400 px-10 py-3 text-sm font-medium uppercase tracking-[0.25em] text-black shadow-luxe transition hover:shadow-none"
              >
                Descubra a Experiência
              </a>
              <a
                href="#contato"
                className="rounded-full border border-purple-400/60 px-10 py-3 text-sm font-medium uppercase tracking-[0.25em] text-purple-200 transition hover:bg-purple-700/20"
              >
                Agendar Reunião
              </a>
            </div>
          </motion.div>
        </section>

        <section id="sobre" className="relative z-10 mx-auto grid max-w-6xl gap-16 px-6 py-32 md:grid-cols-2">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-purple-400">quem somos</span>
            <h2 className="text-4xl font-semibold text-purple-100">
              Integramos tecnologia, estética e propósito para negócios que valorizam performance e identidade.
            </h2>
            <p className="text-gray-300">
              A Evorise nasceu com o propósito de tornar a automação algo simples, inteligente e conectado à essência de
              cada marca. Acreditamos que tecnologia não é só eficiência — é experiência.
            </p>
            <p className="text-gray-400">
              Conduzimos cada projeto com olhar estratégico e sensibilidade estética, garantindo que operação e marca
              trabalhem em harmonia. Nosso compromisso é com a evolução real do seu negócio: mais organização, mais
              presença e mais impacto.
            </p>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-700/30 via-purple-500/10 to-transparent blur-3xl" />
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-purple-600/40 bg-gradient-to-br from-evoblack via-purple-950/40 to-evoblack shadow-luxe">
              <div className="absolute inset-0 opacity-80" style={{ backgroundImage: "url('https://images.pexels.com/photos/5989937/pexels-photo-5989937.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=800')" }} />
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/50 to-black/90" />
              <div className="absolute inset-0 flex items-center justify-center px-8">
                <div className="w-full rounded-2xl border border-purple-500/20 bg-black/40 px-6 py-8 text-center backdrop-blur-md">
                  <h3 className="text-lg font-medium uppercase tracking-[0.2em] text-purple-200">Manifesto</h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-300">
                    Cada entrega Evorise traduz um universo exclusivo. Nosso compromisso é esculpir experiências que
                    personificam a visão dos líderes que confiam em nós.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="servicos" className="relative bg-gradient-to-b from-black via-evoidgo to-black py-32">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-600/40 to-transparent" />
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-purple-300">nossas soluções</span>
              <h2 className="mt-4 text-4xl font-semibold text-purple-100">Soluções Evorise</h2>
              <p className="mt-4 text-gray-300">
                Orquestramos sistemas digitais que elevam o desempenho e a experiência da sua marca. Cada projeto é
                pensado para simplificar processos, integrar equipes e entregar resultados com estética e precisão.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.15 }}
                  className="group relative overflow-hidden rounded-3xl border border-purple-500/20 bg-black/50 px-8 py-12 shadow-[0_30px_80px_-50px_rgba(124,58,237,0.45)] transition-transform duration-500 hover:-translate-y-2 hover:border-purple-400/60"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl transition-all duration-500 group-hover:bg-purple-500/20" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  <h3 className="text-xl font-semibold text-purple-200">{service.title}</h3>
                  <p className="mt-4 text-sm text-gray-300">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="ferramentas"
          className="relative bg-gradient-to-b from-[#0b0216] to-[#120228] py-20 text-center"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-3xl px-6"
          >
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Tecnologias que potencializam nossos projetos
            </h2>
            <p className="mt-4 text-gray-400">
              Utilizamos ferramentas líderes de mercado para criar automações inteligentes, conectadas e escaláveis.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-10 px-6"
          >
            {tools.map((tool) => (
              <img
                key={tool.alt}
                src={tool.src}
                alt={tool.alt}
                className="h-12 opacity-80 transition duration-300 filter hue-rotate-[270deg] hover:opacity-100"
              />
            ))}
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="mt-10 px-6 text-sm text-gray-500 md:text-base"
          >
            E milhares de outras integrações que conectam seu negócio a um ecossistema digital completo.
          </motion.p>
        </section>

        <section id="depoimentos" className="relative mx-auto max-w-6xl px-6 py-32">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-purple-300">depoimentos</span>
            <h2 className="mt-4 text-4xl font-semibold text-purple-100">
              Resultados reais, contados por quem viveu a experiência.
            </h2>
            <p className="mt-4 text-gray-400">
              Parcerias que transformaram operações, melhoraram a gestão e elevaram a imagem de cada negócio com
              automação e estratégia.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.15 }}
                className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-black/60 p-10 text-left shadow-[0_25px_80px_-60px_rgba(124,58,237,0.55)]"
              >
                <div className="absolute -left-10 top-0 h-24 w-24 rounded-full bg-purple-400/10 blur-2xl" />
                <p className="text-sm italic text-gray-300">“{testimonial.quote}”</p>
                <div className="mt-8">
                  <p className="text-sm font-semibold text-purple-200">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{testimonial.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contato" className="relative bg-gradient-to-b from-black via-purple-950/30 to-black py-32">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-10 text-center text-4xl font-semibold text-purple-100 md:text-5xl">
              Agende sua Reunião com a Evorise
            </h2>
            <AgendarReuniao />
          </div>
        </section>
      </main>

      <footer className="border-t border-purple-700/20 bg-black/80 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple-300">Evorise</p>
            <p className="mt-2 max-w-sm text-xs text-gray-400">
              Automatizamos experiências de alto padrão com precisão tecnológica e estética impecável.
            </p>
          </div>
          <div className="flex items-center gap-6 text-xl text-purple-300">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" aria-label={label} className="transition hover:text-purple-200">
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center text-[0.7rem] uppercase tracking-[0.35em] text-gray-600">
          © {new Date().getFullYear()} Evorise. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
