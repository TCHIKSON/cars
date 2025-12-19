const CarSpec = ({ car }) => {
  if (!car) return null;

  const specs = [
    { label: "Marque", value: car.brand?.name },
    { label: "Modèle", value: car.model },
    { label: "Année", value: car.year },
    { label: "Catégorie", value: car.category },
  ];

  return (
    <div className="audi-specs-list">
      {specs.map((spec, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <span
            style={{
              color: "#888",
              textTransform: "uppercase",
              fontSize: "12px",
              letterSpacing: "1px",
            }}
          >
            {spec.label}
          </span>
          <span style={{ fontWeight: "600" }}>{spec.value || "—"}</span>
        </div>
      ))}
    </div>
  );
};

export default CarSpec;
