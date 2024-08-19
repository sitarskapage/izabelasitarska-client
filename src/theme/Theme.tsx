export default function Theme({ children }: { children: React.ReactNode }) {
  const bodyStyle = {
    fontFamily: '"Times New Roman", Times, serif',
  };

  return <div style={bodyStyle}>{children}</div>;
}
