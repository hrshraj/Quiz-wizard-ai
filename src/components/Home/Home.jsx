import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                        <h2 className="text-4xl font-bold sm:text-5xl">
                            QuizWizard.ai🧙‍♂️
                            <span className="hidden sm:block text-4xl">Generate Questions with a snap(coz you got the spell 🪄)</span>
                        </h2>

                        <Link
                            to="/dashboard"
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-purple-700 rounded-lg hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            <svg
                                fill="white"
                                width="20"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            >
                                <path d="Quiz Wizard logo with purple and white theme.png" />
                            </svg>
                            &nbsp; Let the magic begin!
                        </Link>
                    </div>
                </div>

                <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
                    <img className="w-96 rounded-full" src="Quiz Wizard logo with purple and white theme.png" alt="image1" />
                </div>
            </aside>

            <div className="grid place-items-center sm:mt-20">
                <img className="sm:w-100 w-100" src="doodles art of questions.png" alt="image2" />
            </div>

            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Excited? <u>Experience the Wizard Now!!</u> </h1>
        </div>
    );
}
