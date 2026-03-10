const facts = [
  "Idaho produces about one-third of all potatoes grown in the United States.",
  "The state nickname is \"The Gem State,\" but it could easily be The Potato State.",
  "Idaho became the 43rd state admitted to the Union on July 3, 1890.",
  "Potatoes thrive in Idaho because of its rich volcanic soil and clean mountain water.",
  "The average Idaho potato farm is about 400 acres — roughly 300 football fields.",
  "Idaho grows over 30 different varieties of potatoes, from Russets to fingerlings.",
  "The Idaho potato industry generates over $4 billion in economic activity annually.",
  "Blackfoot, Idaho is officially known as the \"Potato Capital of the World.\"",
  "Idaho's Snake River Plain aquifer provides the irrigation water for most potato farms.",
  "A single acre of Idaho farmland can produce about 40,000 pounds of potatoes.",
  "The first potatoes were planted in Idaho by Presbyterian missionary Henry Spalding in 1836.",
  "Idaho potatoes are so iconic that the state puts them on its license plates.",
];

const Facts = () => {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-center mb-4">
          Fun Facts About Idaho
        </h1>
        <p className="font-body text-sm text-center text-muted-foreground mb-12">
          Twelve things you probably didn't know about The Gem State and its potatoes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((fact, i) => (
            <div
              key={i}
              className="bg-card border-2 border-primary p-6"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="font-display text-3xl font-bold text-accent block mb-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-body text-sm leading-relaxed">{fact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facts;
