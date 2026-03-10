import potatoRusset from "@/assets/potato-russet.jpg";
import potatoYukon from "@/assets/potato-yukon.jpg";
import potatoRed from "@/assets/potato-red.jpg";
import potatoPurple from "@/assets/potato-purple.jpg";
import potatoFingerling from "@/assets/potato-fingerling.jpg";
import potatoWhite from "@/assets/potato-white.jpg";

const varieties = [
  { name: "Russet Burbank", img: potatoRusset, origin: "Idaho's signature potato. Starchy, fluffy, and perfect for baking and frying." },
  { name: "Yukon Gold", img: potatoYukon, origin: "Buttery yellow flesh with a naturally rich flavor. Ideal for mashing and roasting." },
  { name: "Red Potato", img: potatoRed, origin: "Thin red skin, waxy texture. Holds its shape in soups, salads, and stews." },
  { name: "Purple Majesty", img: potatoPurple, origin: "Deep purple inside and out. High in antioxidants, stunning on any plate." },
  { name: "Fingerling", img: potatoFingerling, origin: "Small, elongated, and nutty. A favorite of chefs for roasting whole." },
  { name: "White Rose", img: potatoWhite, origin: "Smooth white skin, creamy flesh. Versatile and mild — a true all-rounder." },
];

const Gallery = () => {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-center mb-4">
          Potato Gallery
        </h1>
        <p className="font-body text-sm text-center text-muted-foreground mb-12">
          Six varieties grown in Idaho's volcanic soil.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {varieties.map((v) => (
            <div key={v.name} className="border-2 border-primary overflow-hidden group">
              <div className="aspect-square overflow-hidden">
                <img
                  src={v.img}
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-card">
                <h3 className="font-display text-lg font-bold uppercase mb-2">{v.name}</h3>
                <p className="font-body text-sm text-muted-foreground">{v.origin}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
