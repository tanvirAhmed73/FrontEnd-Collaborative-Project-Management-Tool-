import {  RiArrowRightLine } from 'react-icons/ri';


const HeroSection = () => {
    return (
        <section className="ml-0 items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
              Organize Your Projects,{' '}
              <span className="relative whitespace-nowrap text-indigo-600">
                <span className="relative">Achieve Your Goals</span>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
              A modern project management platform that helps teams collaborate, track progress, and deliver results efficiently.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <a
                href="/register"
                className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Get Started
                <RiArrowRightLine className="ml-2 inline-block" />
              </a>
              <a
                href="#features"
               className="rounded-lg bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    );
};

export default HeroSection;