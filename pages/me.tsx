import { useSession } from "next-auth/react";
import Layout from "../components/layout";

export default function MePage() {
  const { data: session, status } = useSession();

  return (
    <Layout>
      <a className="mt-4 ml-11 mb-4 p-2 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="p-2 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={session?.user?.image ?? ""}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {session?.user?.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {session?.user?.email}
          </p>
        </div>
      </a>
      <div className="mb-4 ml-11">
        <input id="search" className="mb-4 border-gray-300 border-2 rounded-md" placeholder="Pesquise por pessoas..."></input>
        <button className="ml-2 bg-primary text-white p-1 rounded-md hover:bg-primaryLight" type="submit">Pesquisar</button>
        <h1 className="mb-2">Seguidores</h1>
        <div className="flex gap-4">
          <div>
            <div
              id="tooltip-jese"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              Jese Leos
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <img
              data-tooltip-target="tooltip-jese"
              className="w-10 h-10 rounded"
              src={session?.user?.image ?? ""}
              alt="Medium avatar"/>
          </div>
          <div>
            <div
              id="tooltip-roberta"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              Roberta Casas
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <img
              data-tooltip-target="tooltip-roberta"
              className="w-10 h-10 rounded"
              src={session?.user?.image ?? ""}
              alt="Medium avatar"/>
          </div>
          <div>
            <div
              id="tooltip-bonnie"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Bonnie Green
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <img
              data-tooltip-target="tooltip-bonnie"
              className="w-10 h-10 rounded"
              src={session?.user?.image ?? ""}
              alt="Medium avatar"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
