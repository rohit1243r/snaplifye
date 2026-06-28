function SectionTitle({
  title,
  subtitle,
  center = false,
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="text-cyan-400 font-semibold mb-2">
        {subtitle}
      </p>

      <h2 className="text-4xl font-bold text-white">
        {title}
      </h2>
    </div>
  );
}

export default SectionTitle;