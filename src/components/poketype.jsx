export function Types(type) {
  const name = type.tipo;
  const path = `/PokeInfo/poketypes/tipo_${name}.png`;
  return (
    <div>
      <img src={path} alt={`tipo_${name}`} className="crisp w-25" />
    </div>
  );
}
