import { queryClient } from "@config/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "../config";

import { generateUrl } from "@cal/utils/urls";
import { App } from "./app";

const container = document.getElementById("calendar-app");
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter basename={generateUrl("/", false)}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route path="/app" element={<App />}>
          <Route path="calendars">
            <Route path=":calendarId/*" element={<div>test</div>} />
            <Route index element={<div>test index</div>} />
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>,
);
