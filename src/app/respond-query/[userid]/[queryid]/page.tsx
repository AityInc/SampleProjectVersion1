import { getQuery } from "@/lib/provider";
import { AnswerQueryComponent } from "@/components/AnswerQueryComponent";

const CreateCase = async ({
  params,
}: {
  params: { userid: string; queryid: string };
}) => {
  const query = await getQuery(params.queryid);
  return (
    <div className="mx-auto mt-8 max-w-md rounded-md bg-white p-4 shadow-md">
      <table className="w-full border">
        <tbody>
          <tr className="border-b">
            <td className="bg-gray border-r py-2 pr-2 font-semibold">
              Case Id:
            </td>
            <td className="bg-white py-2">{query?.case.id}</td>
          </tr>
          <tr className="border-b">
            <td className="bg-gray border-r py-2 pr-2 font-semibold">
              Case Title:
            </td>
            <td className="bg-white py-2">{query?.case.title}</td>
          </tr>
          <tr className="border-b">
            <td className="bg-gray border-r py-2 pr-2 font-semibold">
              Case CreatedAt:
            </td>
            <td className="bg-white py-2">
              {new Date(query.case.createdAt).toLocaleString()}
            </td>
          </tr>
          <tr className="border-b">
            <td className="bg-gray border-r py-2 pr-2 font-semibold">Query:</td>
            <td className="bg-white py-2">{query.content}</td>
          </tr>
          <tr className="border-b">
            <td className="bg-gray border-r py-2 pr-2 font-semibold">
              Query CreatedAt:
            </td>
            <td className="bg-white py-2">
              {new Date(query.createdAt).toLocaleString()}
            </td>
          </tr>

          <tr className="border-b">
            <td className="bg-gray border-r py-2 pr-2 font-semibold">
              Response:
            </td>
            <td>
              <AnswerQueryComponent
                queryid={query?.id}
                userid={params.userid}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default CreateCase;
