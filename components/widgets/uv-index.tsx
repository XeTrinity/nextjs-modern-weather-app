export default function UvIndex() {
  return (
    <div>
      <div className="relative h-5 rounded-full overflow-hidden mt-20 mx-10">
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-lime-500 via-yellow-500 via-orange-500 via-red-500 to-purple-500" />
        <div className="absolute inset-0 rounded-full [border-image:linear-gradient(to_right,#83C59B,#FCF09A,red,purple,#71CAEE)_1]"/>

      </div>
    </div>
  );
}
