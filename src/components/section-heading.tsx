type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-5xl tracking-tight text-stone-950 md:text-7xl">
        {title}
      </h2>
      {copy ? <p className="mt-5 text-lg leading-8 text-stone-600">{copy}</p> : null}
    </div>
  );
}
