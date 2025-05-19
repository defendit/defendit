export  function PageContainer({children}: {children: React.ReactNode} ) {
  return (
     <main
      className={`font-sans relative h-full w-full flex flex-col items-center justify-start  -mt-10 `}
    >
      <section className="relative z-10 flex flex-col items-center justify-center gap-8">
     {children}

      </section>

    </main>
  );
}