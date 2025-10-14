import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Route from "./route";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SidebarProvider>
      <Route>
        <SidebarTrigger />
      </Route>
    </SidebarProvider>
  </StrictMode>,
);
