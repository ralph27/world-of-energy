export default function Subscribe() {
  return (
    <div className="rounded-xl bg-base300 p-6 font-kanit">
      <h1 className="text-3xl text-white lg:text-4xl">
        Become smarter in just 5 minutes
      </h1>
      <p className="my-5 text-base text-white lg:text-lg">
        Get the daily email that makes reading the news actually enjoyable. Stay
        informed and entertained, for free.
      </p>
      <div className="lg:flex lg:items-center lg:gap-5">
        <input
          type="text"
          placeholder="Type here"
          className="input w-full lg:flex-1"
        />
        <button className="btn-primary btn mt-3 w-full lg:mt-0 lg:w-32 lg:flex-initial ">
          Button
        </button>
      </div>
    </div>
  );
}
