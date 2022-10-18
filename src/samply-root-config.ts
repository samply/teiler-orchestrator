import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import { generateMicrofrontendLayout } from "./microfrontend-layout";

/*
import microfrontendLayout from "./microfrontend-layout.html";
startSingleSpa(microfrontendLayout);
*/

async function getTeilerUiSingleSpaLink() {
  return (await fetch(process.env.TEILER_CORE_URL + "/import-map")).json();
}

getTeilerUiSingleSpaLink().then((data) =>
  startSingleSpa(generateMicrofrontendLayout(data))
);

function startSingleSpa(microfrontendLayout) {
  const routes = constructRoutes(microfrontendLayout);
  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      return System.import(name);
    },
  });
  const layoutEngine = constructLayoutEngine({ routes, applications });

  applications.forEach(registerApplication);
  layoutEngine.activate();
  start();
}
