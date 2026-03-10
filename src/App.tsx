import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Facts from "./pages/Facts";
import Cities from "./pages/Cities";
import Recipes from "./pages/Recipes";
import Gallery from "./pages/Gallery";
import Playground from "./pages/Playground";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/idaho-potato-hub">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/facts" element={<Facts />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/playground" element={<Playground />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
