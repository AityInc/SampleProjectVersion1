import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getCasesForUser } from "@/lib/provider";
import CreateCase from "@/components/CreateCase";

const Home = async ({ params }: { params: { userid: string } }) => {
  const session = await getServerSession(authOptions);
  const cases = await getCasesForUser(params.userid);
  const userName =
    session && session.user && session.user.name && session.user.name.length > 1
      ? session.user.name.toUpperCase()
      : "there";

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-10xl">
          <h1 className="mb-4 text-left text-5xl font-bold">
            <span className="mb-6 block text-gray-700">Dashboard</span>
          </h1>

          <div className="mb-4 flex items-center justify-between">
            <p className="text-left">You have {cases.length} cases</p>
            <div>
              <CreateCase userId={params.userid} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table mt-4 w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-400 p-4 text-gray-100">
                    Id
                  </th>
                  <th className="border border-gray-400 p-4 text-gray-100">
                    Title
                  </th>
                  <th className="border border-gray-400 p-4 text-gray-100">
                    Description
                  </th>
                  <th className="border border-gray-400 p-4 text-gray-100">
                    Created At
                  </th>
                  <th className="border border-gray-400 p-4 text-gray-100">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseItem, index) => (
                  <tr
                    key={caseItem.id}
                    className={index % 1 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 p-4">{index + 1}</td>
                    <td className="border border-gray-300 p-4">
                      {caseItem.title}
                    </td>
                    <td className="border border-gray-300 p-4">
                      {caseItem.description}
                    </td>
                    <td className="border border-gray-300 p-4">
                      {new Date(caseItem.createdAt).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 p-4">
                      <a
                        href={`/view/${params.userid}/${caseItem.id}`}
                        className="btn btn-link"
                      >
                        view
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
