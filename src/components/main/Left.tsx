export const Left = () => {
  return (
    <div className="left bars w-9/12 flex flex-col gap-12 items-start">
      <div className="location w-full flex items-center justify-start gap-4">
        <img src="../../assets/images/location.svg" alt="" className="w-6" />
        <p className="text-2xl text-white">
          Brooklyn,New York,Usa{" "}
          <span className="text-gray-600">(Friday,January 4)</span>
        </p>
      </div>
      <div className="degree flex items-center gap-4">
        <h1 className="text-7xl text-white">18°</h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6 bg-slate-700 px-5 py-1 rounded-full">
            <p className="text-gray-500">H</p>
            <p className="text-white">29°</p>
          </div>
          <div className="flex items-center gap-6 bg-slate-700 px-5 py-1 rounded-full">
            <p className="text-gray-500">L</p>
            <p className="text-white">12°</p>
          </div>
        </div>
      </div>
      <div className="weatherCond flex flex-col gap-2">
        <p className="text-6xl text-gray-600">Stormy</p>
        <p className="text-6xl text-gray-600">with partly cloudy</p>
      </div>
    </div>
  );
};
