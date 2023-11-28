import { Query } from "@prisma/client";

export const QueryDisplayComponent = (queries: { queries: Query[] } | null) => {
  if (!queries || queries.queries.length < 1)
    return <p>There are no queries</p>;
  else {
    return (
      <div className="min-w-max ">
        {queries.queries.map((x, id) => {
          return (
            <div key={id} className=" mx-2 my-5 ">
              <div className="flex">
                <div className="w-24 flex-none font-bold">Query:</div>{" "}
                <div className="grow">{x.content}</div>
              </div>
              <div className="flex">
                <div className="w-24 flex-none font-bold">Response:</div>{" "}
                <div className="grow">
                  {x.response ? x.response : "pending"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
