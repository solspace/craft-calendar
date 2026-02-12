import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "../config";

import { App } from "@cal/app";
import { generateUrl } from "@cal/utils/urls";
import { Calendar } from "./pages/calendar/calendar";

const container = document.getElementById("calendar-app");
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter basename={generateUrl("/", false)}>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Calendar />} />
        <Route path=":year/:month/:day" element={<Calendar />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
