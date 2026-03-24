export const metadata = {
  title: "CCB Content Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: "100vh" }}>
      {children}
    </div>
  );
}
