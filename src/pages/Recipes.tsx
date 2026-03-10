import { useState } from "react";

const recipes = [
  {
    name: "Classic Mashed Potatoes",
    desc: "Creamy, buttery, and impossibly smooth.",
    ingredients: ["3 lbs Russet potatoes", "1/2 cup butter", "1 cup whole milk", "Salt & pepper"],
    instructions: "Boil peeled, cubed potatoes until fork-tender (about 20 min). Drain. Mash with butter and warm milk until smooth. Season generously.",
  },
  {
    name: "Crispy French Fries",
    desc: "Double-fried for maximum crunch.",
    ingredients: ["4 large Russet potatoes", "Vegetable oil", "Salt", "Optional: paprika, garlic powder"],
    instructions: "Cut into 1/4-inch sticks. Soak in cold water 30 min. Dry thoroughly. Fry at 325°F for 6 min, cool, then fry again at 375°F until golden. Salt immediately.",
  },
  {
    name: "Loaded Baked Potato",
    desc: "A meal unto itself.",
    ingredients: ["4 large Russet potatoes", "Butter", "Sour cream", "Cheddar cheese", "Chives", "Bacon bits"],
    instructions: "Bake at 400°F for 60 min. Split open, fluff with a fork. Load with butter, sour cream, cheese, bacon, and chives.",
  },
  {
    name: "Potato Soup",
    desc: "Thick, hearty, and warming.",
    ingredients: ["5 potatoes, cubed", "1 onion, diced", "4 cups chicken broth", "1 cup heavy cream", "Salt, pepper, chives"],
    instructions: "Sauté onion in butter. Add potatoes and broth. Simmer 20 min. Blend half, stir in cream. Season and garnish with chives.",
  },
  {
    name: "Hash Browns",
    desc: "Breakfast's crispiest companion.",
    ingredients: ["4 medium potatoes, peeled & grated", "1 onion, grated", "Salt & pepper", "Butter or oil"],
    instructions: "Squeeze moisture from grated potatoes. Mix with onion and seasoning. Press into a hot, buttered skillet. Cook 5 min per side until deeply golden.",
  },
  {
    name: "Potato Salad",
    desc: "Picnic-ready and crowd-tested.",
    ingredients: ["3 lbs Yukon Gold potatoes", "4 hard-boiled eggs", "1/2 cup mayo", "2 tbsp mustard", "Celery, pickles, paprika"],
    instructions: "Boil potatoes until just tender. Cool and cube. Mix with chopped eggs, mayo, mustard, celery, and pickles. Chill 2 hours. Dust with paprika.",
  },
  {
    name: "Loaded Potato Skins",
    desc: "The appetizer everyone finishes first.",
    ingredients: ["6 medium Russet potatoes", "Cheddar cheese", "Bacon", "Sour cream", "Chives"],
    instructions: "Bake potatoes, halve, and scoop out most flesh. Brush with oil, bake cut-side-up at 425°F for 10 min. Fill with cheese and bacon. Bake 5 more min.",
  },
  {
    name: "Scalloped Potatoes",
    desc: "Layers of tender potato in rich cream sauce.",
    ingredients: ["3 lbs Yukon Gold potatoes, thinly sliced", "2 cups heavy cream", "2 cups Gruyère cheese", "3 cloves garlic", "Thyme, salt, pepper"],
    instructions: "Layer sliced potatoes in a buttered baking dish. Pour garlic-infused cream over each layer. Top with cheese. Bake covered at 375°F for 45 min, then uncovered for 15 min.",
  },
];

const Recipes = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-center mb-4">
          Potato Recipes
        </h1>
        <p className="font-body text-sm text-center text-muted-foreground mb-12">
          Eight ways to honor the potato, from simple to sublime.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {recipes.map((recipe, i) => (
            <div key={i} className="bg-card border-2 border-primary">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full text-left p-6"
              >
                <h3 className="font-display text-lg font-bold uppercase mb-1">
                  {recipe.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground">{recipe.desc}</p>
              </button>

              {expanded === i && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="border-t-2 border-primary pt-4 space-y-4">
                    <div>
                      <h4 className="font-display text-sm font-bold uppercase mb-2">Ingredients</h4>
                      <ul className="font-body text-sm space-y-1">
                        {recipe.ingredients.map((ing, j) => (
                          <li key={j} className="before:content-['—_'] text-muted-foreground">
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold uppercase mb-2">Instructions</h4>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {recipe.instructions}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
