export function Types(type) {
  const name = type.tipo;
  const path = `src/assets/poketypes/tipo_${name}.png`;
  return (
    <div>
      <img src={path} alt="" className="crisp w-25" />
    </div>
  );
}
