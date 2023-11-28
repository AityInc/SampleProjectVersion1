import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getCasesForUser, getUnAnsweredQueries } from "@/lib/provider";
import CreateCase from "@/components/CreateCase";

const Home = async ({ params }: { params: { userid: string } }) => {
  const session = await getServerSession(authOptions);
  const queries = await getUnAnsweredQueries();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-10xl">
          <h1 className="mb-4 text-left text-5xl font-bold">
            Unanswered Queries
          </h1>

          <div className="mb-4 flex items-center justify-between">
            <p className="text-left">
              You have {queries.length} Unanswered queries
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="table mt-4 w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-400 p-4 text-gray-100">
                    Id
                  </th>
                  <th className="border border-gray-400 p-4 text-gray-100">
                    Query Title
                  </th>
                  <th className="border border-gray-400 p-4 text-gray-100">
                    Case Title
                  </th>
                  <th className="border border-gray-400 p-4 text-gray-100">
                    Created At
                  </th>
                  <th className="border border-gray-400 p-4 text-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                {queries.map((queryItem, index) => (
                  <tr
                    key={queryItem.id}
                    className={index % 1 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 p-4">{index + 1}</td>
                    <td className="border border-gray-300 p-4">
                      {queryItem.content}
                    </td>
                    <td className="border border-gray-300 p-4">
                      {queryItem.case.title}
                    </td>
                    <td className="border border-gray-300 p-4">
                      {new Date(queryItem.createdAt).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 p-4">
                      <a
                        href={`/respond-query/${params.userid}/${queryItem.id}`}
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
