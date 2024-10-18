export const Chart = () => {
  const array = [1, 2, 3, 4, 5];
  return (
    <div className="w-full h-full flex items-end justify-between px-6 pt-6">
      {array.map(() => (
        <div className="flex flex-col items-center justify-between h-5/6 text-white text-xl">
          <p>Sunday</p>
          <div className="flex items-center">
            <p className="text-4xl">28°</p>
            <img
              src="../../public/assets/images/cloudy.png"
              alt=""
              className="w-8"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
