export function TopContainer({ children }: { children: any }) {
  return (
    <div className="flex overflow-hidden container-secondary-bg">
      {children}
    </div>
  );
}
