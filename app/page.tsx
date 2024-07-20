import Link from "next/link";
import { MdTimer, MdWeb, MdCompare } from "react-icons/md";

export default function Home() {
  const whyData = [
    {
      title: "Time Saving",
      description:
        "You don't have to watch videos and read articles to find the best product.",
      icon: <MdTimer />,
    },
    {
      title: "Friendly User Interface",
      description: "You can spot your product  by few clicks with a simple UI.",
      icon: <MdWeb />,
    },
    {
      icon: <MdCompare />,
      title: "Compare Products",
      description: "Find out wether are their any products that are better than your choice",
    },
  ];

  const WhyCard = ({
    item,
  }: {
    item: {
      icon: React.ReactNode;
      title: string;
      description: string;
    };
  }) => {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 w-min rounded-md bg-gradient-to-br from-secondary-color to-secondary-dark-color p-5 text-5xl text-primary-color">
          {item.icon}
        </div>
        <h2 className="text-2xl font-semibold">{item.title}</h2>
        <p className="mt-2 text-lg">{item.description}</p>
      </div>
    );
  };
  return (
    <main>
      <section className="mx-auto flex max-w-7xl flex-col items-center px-4 pt-20 md:pt-28">
        <h1 className="text-center text-5xl font-extrabold leading-[60px] bg-clip-text text-transparent bg-gradient-to-b from-secondary-dark-color to-secondary-color md:text-6xl md:leading-[85px] lg:text-7xl">
          Find The Perfect Product That Matches Your Requirements
        </h1>

        <h2 className="mt-12 flex justify-center space-x-[0.35rem] text-center text-2xl font-medium md:text-3xl text-secondary-dark-color">
          <p>Finding Products Made Easier</p>{" "}
        </h2>

        <p className="mt-12 w-[80%] text-center text-lg capitalize md:text-xl">
          Enter your requirements and find the best products that match with
          them within few minutes by few clicks. If you already have a product
          make sure it is the best.
        </p>

        <div className="group relative mt-14">
          <div className="absolute inset-0 scale-x-105 animate-pulse bg-gradient-to-r from-secondary-color to-secondary-dark-color blur-2xl transition-transform group-hover:scale-x-125" />
          <Link href="/products">
            <button className="relative z-10 rounded-md bg-secondary-dark-color py-[0.85rem] px-10 text-2xl text-white transition-transform group-hover:scale-110">
              SPOT IT 🎯
            </button>
          </Link>
        </div>
      </section>
      <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 md:pt-36">
        <h1 className="text-center text-3xl font-extrabold bg-clip-text text-secondary-color md:text-4xl lg:text-5xl">
          Why SpotIt ?
        </h1>

        <p className="mt-8 w-[80%] text-center text-lg capitalize md:text-xl text-secondary-dark-color">
          Why you should consider using spotit ?
        </p>

        <div className="mt-20 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-y-0 md:gap-x-10">
          {whyData.map((item, key) => (
            <WhyCard key={key} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
