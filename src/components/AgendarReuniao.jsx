import { useEffect } from "react";

const CAL_LINK = "evorise-group/30min";
const CAL_CONTAINER_ID = "cal-inline-evorise";
const CAL_ORIGIN = "https://app.cal.com";
const CAL_SCRIPT_SRC = `${CAL_ORIGIN}/embed/embed.js`;
const CAL_SCRIPT_ID = "cal-embed-script";

export default function AgendarReuniao() {
  useEffect(() => {
    const win = window;

    win.Cal =
      win.Cal ||
      function (...args) {
        (win.Cal.q = win.Cal.q || []).push(args);
      };

    const initCalEmbed = () => {
      if (!win.Cal) return;

      win.Cal("init", { origin: CAL_ORIGIN });

      win.Cal("inline", {
        elementOrSelector: `#${CAL_CONTAINER_ID}`,
        link: CAL_LINK,
        config: { theme: "dark", layout: "month_view" },
      });
    };

    let script = document.getElementById(CAL_SCRIPT_ID);

    if (!script) {
      script = document.createElement("script");
      script.id = CAL_SCRIPT_ID;
      script.src = CAL_SCRIPT_SRC;
      script.async = true;
      script.onload = () => {
        script?.setAttribute("data-cal-loaded", "true");
        initCalEmbed();
      };
      document.body.appendChild(script);
    } else if (script.getAttribute("data-cal-loaded") === "true") {
      initCalEmbed();
    } else {
      script.addEventListener("load", initCalEmbed);
    }

    return () => {
      script?.removeEventListener("load", initCalEmbed);
    };
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#0b0216] to-[#120228] py-20 px-4 text-center text-white">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4">
        Agende uma chamada com a Evorise
      </h2>
      <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
        Deixe que a automação faça o trabalho pesado enquanto você foca no
        crescimento. Fale com nossa equipe e leve seus resultados para o próximo
        nível.
      </p>

      <div
        id={CAL_CONTAINER_ID}
        className="calcom-embed mx-auto max-w-5xl rounded-2xl border border-purple-500/20 shadow-lg"
        style={{ width: "100%", height: "750px" }}
      ></div>
    </section>
  );
}
