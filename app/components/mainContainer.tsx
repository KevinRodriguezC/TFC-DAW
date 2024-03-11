export function MainContainer({ children }: { children: any }) {
  return (
    <div className="container-primary-bg dark:text-white min-h-screen flex flex-col">
      {/* style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }} */}
      {children}
    </div>
  );
}
