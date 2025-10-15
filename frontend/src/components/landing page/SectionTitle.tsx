type props = {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
};

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
}: props) {
  return (
    <div className="title" style={{ textAlign: align }}>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
