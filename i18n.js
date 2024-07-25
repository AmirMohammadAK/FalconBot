import i18next from "i18next";
import i18nextHttpMiddleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Determine current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

i18next
  .use(Backend)
  .use(i18nextHttpMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: `${__dirname}/locales/{{lng}}/translation.json`,
    },
    fallbackLng: "en",
    preload: ["en", "fa"],
    ns: ["translation"],
    defaultNS: "translation",
  });

export default i18next;
