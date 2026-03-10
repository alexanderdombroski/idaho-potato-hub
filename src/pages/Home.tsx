import heroFields from "@/assets/hero-fields.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero - full bleed */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={heroFields}
          alt="Idaho potato fields stretching to the horizon at golden hour"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-primary-foreground mb-6 uppercase tracking-wider">
            Idaho Potato Hub
          </h1>
          <p className="font-body text-primary-foreground/80 max-w-xl text-sm sm:text-base leading-relaxed">
            One-third of America's potatoes come from Idaho's rich volcanic soil.
            This is their story — told through facts, games, recipes, and the cities
            that ship them to the world.
          </p>
        </div>
      </section>

      {/* Navigation cards */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-display font-bold mb-10 text-center">
          Explore the Hub
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { to: "/game", title: "Guess the Potato", desc: "Test your luck — pick the right potato each round." },
            { to: "/facts", title: "Idaho Facts", desc: "Ten things you probably didn't know about The Gem State." },
            { to: "/cities", title: "Export Cities", desc: "The top 10 cities that ship Idaho potatoes worldwide." },
            { to: "/recipes", title: "Potato Recipes", desc: "From mashed to loaded skins — eight ways to eat a potato." },
            { to: "/gallery", title: "Potato Gallery", desc: "A visual catalog of Idaho's finest potato varieties." },
            { to: "/playground", title: "Potato Playground", desc: "Throw potatoes around. Because you can." },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block bg-card p-6 border-2 border-primary hover:bg-accent hover:text-accent-foreground transition-colors group"
            >
              <h3 className="font-display text-lg font-bold uppercase mb-2 group-hover:underline">
                {item.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground group-hover:text-accent-foreground">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Idaho intro */}
      <section className="bg-primary text-primary-foreground py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center">
            Why Idaho?
          </h2>
          <p className="font-body text-sm leading-relaxed text-primary-foreground/80">
            Idaho's unique combination of rich volcanic soil, clean mountain water,
            and warm days followed by cool nights creates the perfect growing
            conditions for potatoes. The state has been synonymous with the humble
            spud since the 1800s, producing roughly 13 billion pounds annually.
            From the Snake River Plain to the high desert plateaus, potato farming
            isn't just an industry here — it's a way of life.
          </p>
          <p className="font-body text-sm leading-relaxed text-primary-foreground/80">
            Whether they're Russets headed for a fast-food fryer, Yukon Golds
            destined for a holiday dinner table, or fingerlings bound for a
            fine-dining kitchen, Idaho potatoes feed the nation and beyond.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
