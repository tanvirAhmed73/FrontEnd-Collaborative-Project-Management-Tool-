
const CtaSection = () => {
    return (
        <section className="relative overflow-hidden bg-indigo-600 py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100">
              Join thousands of teams who are already using ProjectHub to manage their projects more effectively.
            </p>
            <div className="mt-10">
              <a
                href="/register"
                className="rounded-lg bg-white px-8 py-4 text-sm font-semibold text-indigo-600 hover:bg-gray-100"
              >
                Start your free trial
              </a>
            </div>
          </div>
        </div>
      </section>
    );
};

export default CtaSection;