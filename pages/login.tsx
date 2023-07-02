import { getSession, signIn } from "next-auth/react";
import type { GetServerSidePropsContext } from "next"
import { FaGoogle, FaGithub } from 'react-icons/fa'


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

function Login() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-1/2 mx-auto bg-primary flex flex-col items-center justify-center rounded-xl sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <img src="logo.png" alt="logo" className="h-32 mx-auto mb-5" />
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="p-5">
              <div className="flex flex-col gap-5">
                <button
                  type="button"
                  onClick={() => signIn("github")}
                  className="flex justify-center items-center transition duration-200 border border-gray-200 text-gray-700 w-full p-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                >
                  <FaGithub className="inline-block mr-2" />
                  Github
                </button>
                <button
                  type="button"
                  onClick={() => signIn("google")}
                  className="flex justify-center items-center transition duration-200 border border-gray-200 text-gray-700 w-full p-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                >
                  <FaGoogle className="inline-block mr-2" />
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

