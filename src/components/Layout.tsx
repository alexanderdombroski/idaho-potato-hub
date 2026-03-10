import { Outlet } from "react-router-dom";
import StickyNav from "./StickyNav";

const Layout = () => {
  return (
    <div className="min-h-screen pb-14">
      <Outlet />
      <StickyNav />
      <footer className="bg-primary text-primary-foreground py-8 px-6 mb-14">
        <div className="max-w-4xl mx-auto text-center font-body text-sm space-y-2">
          <p className="uppercase tracking-wider">Powered by Idaho Potatoes</p>
          <p className="text-primary-foreground/60">
            Idaho Potato Hub &middot; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
