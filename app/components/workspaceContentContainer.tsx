export function WorkspaceContentContainer({ children }: { children: any }) {
  return (
    <div className="container-primary-bg flex-1 overflow-y-auto">
      <div className="flex flex-col max-w-[700px] mx-auto my-4 px-4 gap-4">
        {children}
      </div>
    </div>
  );
}
