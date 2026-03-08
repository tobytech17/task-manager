import React from "react";
import Layout from "../Components/Layout";
import pic from "../assets/coverpage.png";
import { Link } from "react-router-dom";

export default function CoverPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <section className="flex flex-row items-center justify-between px-20 py-20">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-5">
              Manage your Tasks on
              <span className="text-purple-600"> TaskDuty</span>
            </h1>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              aspernatur fugiat consequatur quibusdam, debitis deleniti ipsum
              numquam esse! Repellat numquam quisquam, perspiciatis obcaecati id
              facere a rerum fugiat officiis fugit?
            </p>
            <Link to="/tasks">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition duration-300">
                Go to My Tasks
              </button>
            </Link>
          </div>

          <div className="mt-10 md:mt-0">
            <img src={pic} alt="" />
          </div>
        </section>
      </div>
    </Layout>
  );
}
