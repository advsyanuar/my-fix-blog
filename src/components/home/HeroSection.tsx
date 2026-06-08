import DotGrid from "./DotGrid";

export function HeroSection() {
  return (
    <section className="bg-surface-container-low p-margin-lg max-md:p-margin-md flex flex-col justify-end relative group overflow-hidden h-full">
      <div className="absolute left-0 top-0" style={{ width: '100%', height: '100%' }}>
        <DotGrid
          dotSize={7}
          gap={23}
          baseColor="#2F293A"
          activeColor="#00eeff"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <div className="absolute top-margin-md right-margin-md font-label-sm text-on-surface-variant opacity-50">
        ID: SR-2024-X1
      </div>
      <div className="z-10">
        <p className="display-stray">decentralized visual engine</p>
        <h1 className="font-display-lg display-bitrate text-5xl md:text-8xl text-primary-container mb-margin-sm max-md:leading-12 md:leading-16 tracking-wider">
          DECENTRALIZED<br />VISUAL ENGINE
        </h1>
        <p className="font-body-lg text-body-lg max-md:text-body-md text-on-surface max-w-xl">
          High-fidelity interface design for industrial automation and cybernetic ecosystems.
          Merging brutalist structures with luminous data density.
        </p>
      </div>
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#00EEFF 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}
      />
    </section>
  );
}
