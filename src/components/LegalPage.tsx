export function LegalPage({children}: {children: React.ReactNode} ) {
  return (
    <main
      className={`font-sans relative min-h-full flex flex-col items-center justify-start w-full`}
    >
      <section className="max-w-5xl mx-auto px-6 py-12 bg-white/20 dark:bg-slate-900/55  text-gray-900 dark:text-gray-100 font-serif text-justify leading-relaxed">
        {children}

        <footer className="pt-8 border-t mt-8 text-sm text-center text-gray-500">
          Prepared by: &copy; 2002-2025 LawDepot.com&reg;
        </footer>
      </section>
    </main>
  );
}