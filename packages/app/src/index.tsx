import { App } from "@cal/app";
import { generateUrl } from "@cal/utils/urls";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Calendar } from "./pages/calendar/calendar";
import { type Config, ConfigProvider } from "./pages/calendar/context/config.context";

const container = document.getElementById("calendar-app") as HTMLElement;
const appRootContainer = container.querySelector("[data-root]") as HTMLDivElement;
const configurationTag = container.querySelector<HTMLScriptElement>("[data-config]");
const configuration = JSON.parse(configurationTag?.textContent || "{}") as Config;

const root = ReactDOM.createRoot(appRootContainer);

root.render(
  <ConfigProvider config={configuration}>
    <BrowserRouter basename={generateUrl("/", false)}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Calendar />} />
          <Route path=":year/:month/:day" element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ConfigProvider>,
);
