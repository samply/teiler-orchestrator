import { start, registerApplication } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import { generateMicrofrontendLayout } from "./microfrontend-layout";

async function getTeilerDashboardSingleSpaLink() {
  return (await fetch(process.env.TEILER_BACKEND_URL + "/import-map")).json();
}

getTeilerDashboardSingleSpaLink().then((data) =>
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
