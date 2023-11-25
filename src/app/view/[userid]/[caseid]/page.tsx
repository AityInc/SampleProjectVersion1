import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getCase } from "@/lib/provider";
import { IoIosCreate } from "react-icons/io";
import { QueryDisplayComponent } from "@/components/QueryDisplayComponent";
import { FileComponent } from "../../../../components/FileComponent";
const Home = async ({
  params,
}: {
  params: { caseid: string; userid: string };
}) => {
  const session = await getServerSession(authOptions);
  const selectedCase = await getCase(params.caseid);
  const baseurl = process.env.NEXTAUTH_URL!;
  const userName =
    session && session.user && session.user.name && session.user.name.length > 1
      ? session.user.name.toUpperCase()
      : "there";
  //const selectedCase = cases.find((caseItem) => caseItem.id === params.caseid);

  return (
    <div className=" bg-base-200 p-4">
      <h1 className="mb-10 text-2xl font-bold"></h1>
      <h1 className="mb-10 text-2xl font-bold">Case Details</h1>
      <table className="w-full border">
        <tbody>
          <tr className="border-b">
            <td className="bg-gray border-r py-2 pr-2 font-semibold">
              Case Id:
            </td>
            <td className="bg-white py-2">{params.caseid}</td>
          </tr>

          {selectedCase && (
            <>
              <tr className="border-b">
                <td className="bg-gray border-r py-2 pr-2 font-semibold">
                  Title:
                </td>
                <td className="bg-white py-2">{selectedCase.title}</td>
              </tr>
              <tr className="border-b">
                <td className="bg-gray border-r py-2 pr-2 font-semibold">
                  Description:
                </td>
                <td className="bg-white py-2">{selectedCase.description}</td>
              </tr>
              <tr className="border-b">
                <td className="bg-gray border-r py-2 pr-2 font-semibold">
                  Queries:
                </td>
                <td className="flex justify-between bg-white py-2">
                  <div className=" align-middle min-w-[80%]">
                    <QueryDisplayComponent queries={selectedCase.Query} />
                  </div>
                  <div
                    className="tooltip tooltip-left"
                    data-tip="click to create case"
                  >
                    <a
                      className="btn btn-ghost btn-neutral btn-md"
                      href={`/create-query/${params.userid}/${selectedCase.id}`}
                    >
                      <IoIosCreate />
                    </a>
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <td className="bg-gray border-r py-2 pr-2 font-semibold">
                  File:
                </td>
                <td className="flex justify-between bg-white py-2">
                  <div className=" align-middle">
                    
                    <FileComponent files={selectedCase.files}/>
                  </div>
                  <div
                    className="tooltip tooltip-left"
                    data-tip="click to create case"
                  >
                    <a
                      href={`/file-upload/${params.userid}/${selectedCase.id}`}
                      className="btn btn-ghost btn-md"
                    >
                      <IoIosCreate />
                    </a>
                  </div>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

