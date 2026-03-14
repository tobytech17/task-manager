import React from "react";
import Layout from "../Components/Layout";
import pic from "../assets/coverpage.png";
import { Link } from "react-router-dom";

export default function CoverPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <section className="flex flex-col-reverse sm:flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 py-10 sm:py-12 md:py-16 lg:py-20 sm:gap-8 md:gap-6 lg:gap-12 gap-10">
          <div className="w-full sm:w-3/4 md:w-1/2  lg:max-w-lg text-center md:text-left mx-auto md:mx-0">
            <h1 className="text-2xl sm:text-3xl  md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-5 leading-tight">
              Manage your Tasks on
              <span className="text-purple-600"> TaskDuty</span>
            </h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-sm md:text-base lg:text-base leading leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              aspernatur fugiat consequatur quibusdam, debitis deleniti ipsum
              numquam esse! Repellat numquam quisquam, perspiciatis obcaecati id
              facere a rerum fugiat officiis fugit?
            </p>
            <Link to="/tasks">
              <button className="bg-purple-600 text-white px-5 sm:px-5 md:px-6 lg:px-8 py-2.5 sm:py-2.5 md:py-3 text-sm sm:text-sm md:text-base rounded-md hover:bg-purple-700 active:scale-95 transition duration-300 w-full sm:w-auto">
                Go to My Tasks
              </button>
            </Link>
          </div>

          <div className="w-full sm:w-2/3 md:w-1/2 flex justify-center md:justify-end">
            <img
              src={pic}
              alt=""
              className="w-48 sm:w-64 md:w-full md:w-max-w-xs lg:max-w-sm xl:max-w-md object-contain"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}
