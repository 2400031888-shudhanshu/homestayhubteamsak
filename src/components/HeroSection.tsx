import heroImage from "@/assets/hero-homestay.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[75vh] min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      
      {/* Content - left aligned */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Support Tourists with{" "}
            <span className="font-normal">Homestay Ideas and</span>{" "}
            <span className="font-bold">Nearby Tourism Places</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-lg">
            Connecting travelers with homestay options and tourist attractions seamlessly
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
