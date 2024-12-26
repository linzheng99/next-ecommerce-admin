interface SetupLayoutProps {
  children: React.ReactNode
}

export default function SetupLayout({ children }: SetupLayoutProps) {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  )
};
