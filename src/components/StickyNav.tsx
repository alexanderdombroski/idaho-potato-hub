import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/game", label: "Guess" },
  { to: "/facts", label: "Facts" },
  { to: "/cities", label: "Cities" },
  { to: "/recipes", label: "Recipes" },
  { to: "/gallery", label: "Gallery" },
];

const StickyNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-primary">
      <div className="flex items-center justify-center gap-0">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-3 py-4 text-xs sm:text-sm font-body uppercase tracking-wider transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground hover:bg-accent hover:text-accent-foreground"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default StickyNav;
