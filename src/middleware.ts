export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/view-cases/:userid/",
    "/contactus",
    "/create-case/:userid",
    "/create-query/:userid/:caseid",
    "/file-upload/:userid/:caseid/",
    "/respond-query/:userid/:queryid",
    "/api",
    "/view-case/:userid/:caseid",
  ],
};
