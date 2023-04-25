import React from "react";

export default function FullSubscribe() {
  return (
    <div className="bg-base300 p-6 text-center font-kanit">
      <h1 className="text-3xl text-white lg:text-4xl">
        Become smarter in just 5 minutes
      </h1>
      <p className="my-5 text-base text-white lg:text-lg">
        Get the daily email that makes reading the news actually enjoyable. Stay
        informed and entertained, for free.
      </p>
      <div className="mx-auto my-0 flex max-w-lg items-center gap-5">
        <input
          type="text"
          placeholder="Type here"
          className="input w-full lg:flex-1"
        />
        <button className="btn-primary btn">Subscribe</button>
      </div>
    </div>
  );
}
