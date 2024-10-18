export const Right = () => {
  return (
    <div className="right bars w-4/12 flex flex-col gap-12 items-end">
      <div className="desc text-base text-white">
        <p>
          With real time data and advanced technology, we provide reliable
          forecasts for any location around the world.
        </p>
      </div>
      <div className="recently w-full flex flex-col gap-2">
        <div className="recentTop flex justify-between">
          <p className="text-white">Recently Searched</p>
          <div className="flex items-center text-white">
            <p>See All</p>
            <p>{">"}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="recent_card border border-white p-5 rounded-3xl bg-gray-700 w-full">
            <div className="flex justify-between items-center">
              <img
                src="../../public/assets/images/cloudy.png"
                className="w-8"
                alt=""
              />
              <p className="text-3xl text-white">16°</p>
            </div>
            <div className="flex flex-col pt-2">
              <p className="text-white text-lg">Liverpool,UK</p>
              <p className="text-gray-500 text-sm">Partly Cloudy</p>
            </div>
          </div>
          <div className="recent_card border border-white p-5 rounded-3xl bg-slate-700 w-full">
            <div className="flex justify-between items-center">
              <img
                src="../../public/assets/images/cloudy.png"
                className="w-8"
                alt=""
              />
              <p className="text-3xl text-white">16°</p>
            </div>
            <div className="flex flex-col pt-2">
              <p className="text-white text-lg">Liverpool,UK</p>
              <p className="text-gray-500 text-sm">Partly Cloudy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
