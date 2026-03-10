import { useState } from "react";

const cities = [
  { rank: 1, city: "Idaho Falls", fact: "Major shipping hub for eastern Idaho's vast potato farms. Rail and truck routes converge here." },
  { rank: 2, city: "Twin Falls", fact: "Home to large potato processing plants including Lamb Weston and McCain Foods." },
  { rank: 3, city: "Rexburg", fact: "Agricultural center surrounded by fertile farmland in the upper Snake River Plain." },
  { rank: 4, city: "Blackfoot", fact: "Self-proclaimed \"Potato Capital of the World\" and home to the Idaho Potato Museum." },
  { rank: 5, city: "Pocatello", fact: "Key railroad junction that historically moved potatoes across the western United States." },
  { rank: 6, city: "Burley", fact: "Center of the Magic Valley's potato processing industry with multiple packing facilities." },
  { rank: 7, city: "American Falls", fact: "Named after the nearby waterfall, surrounded by irrigated potato fields." },
  { rank: 8, city: "Rupert", fact: "Small but mighty — Rupert punches above its weight in potato production." },
  { rank: 9, city: "Shelley", fact: "Hosts the annual Idaho Spud Day festival, celebrating all things potato since 1927." },
  { rank: 10, city: "Aberdeen", fact: "Home to the USDA's Aberdeen Research Station, developing new potato varieties." },
];

const Cities = () => {
  const [activeCity, setActiveCity] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-center mb-4">
          Top Idaho Cities for Potato Exports
        </h1>
        <p className="font-body text-sm text-center text-muted-foreground mb-12">
          The ten cities that keep America's potato supply flowing.
        </p>

        <div className="space-y-0">
          {cities.map((item) => (
            <button
              key={item.rank}
              onClick={() => setActiveCity(activeCity === item.rank ? null : item.rank)}
              className={`w-full text-left border-2 border-primary p-6 flex gap-6 items-start transition-colors ${
                activeCity === item.rank ? "bg-card" : "bg-background hover:bg-card"
              } ${item.rank > 1 ? "-mt-0.5" : ""}`}
            >
              <span className="font-display text-3xl font-bold shrink-0 w-12">
                {String(item.rank).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold uppercase">
                  {item.city}
                </h3>
                {activeCity === item.rank && (
                  <p className="font-body text-sm text-muted-foreground mt-2 animate-fade-in">
                    {item.fact}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cities;
