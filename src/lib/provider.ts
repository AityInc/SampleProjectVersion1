import prisma from "./prisma";
import { User, Case, File, Query } from "@prisma/client";

export const getUser = async ({
  email,
}: {
  email: string | null | undefined;
}): Promise<User | undefined> => {
  if (email === null || email === undefined) return undefined;
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) return undefined;
  else return user;
};

// User CRUD Operations
export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  return prisma.user.create({ data: userData });
};

export const updateUser = async (
  userId: string,
  userData: Partial<User>
): Promise<User> => {
  return prisma.user.update({ where: { id: userId }, data: userData });
};

export const deleteUser = async (userId: string): Promise<User> => {
  return prisma.user.delete({ where: { id: userId } });
};

// Case CRUD Operations
export const createCase = async (caseData: Omit<Case, "id">): Promise<Case> => {
  return prisma.case.create({ data: caseData });
};

export const getCase = async (caseId: string) => {
  return prisma.case.findUnique({
    where: { id: caseId },
    select: {
      files: true,
      Query: true,
      user: true,
      createdAt: true,
      description: true,
      title: true,
      updatedAt: true,
      id: true,
    },
  });
};

export const updateCase = async (
  caseId: string,
  caseData: Partial<Case>
): Promise<Case> => {
  return prisma.case.update({ where: { id: caseId }, data: caseData });
};

export const deleteCase = async (caseId: string): Promise<Case> => {
  return prisma.case.delete({ where: { id: caseId } });
};

// File CRUD Operations
export const createFile = async (fileData: Omit<File, "id">): Promise<File> => {
  return prisma.file.create({ data: fileData });
};

export const getFile = async (fileId: string): Promise<File | null> => {
  return prisma.file.findUnique({ where: { id: fileId } });
};

export const updateFile = async (
  fileId: string,
  fileData: Partial<File>
): Promise<File> => {
  return prisma.file.update({ where: { id: fileId }, data: fileData });
};

export const deleteFile = async (fileId: string): Promise<File> => {
  return prisma.file.delete({ where: { id: fileId } });
};

// Query CRUD Operations
export const createQuery = async (
  queryData: Omit<Query, "id" | "response">
): Promise<Query> => {
  return prisma.query.create({ data: queryData });
};

export const getQuery = async (queryId: string): Promise<Query | null> => {
  return prisma.query.findUnique({ where: { id: queryId }, include:{
    case: true
  }});
};

export const updateQuery = async (
  queryId: string,
  queryData: Partial<Query>
): Promise<Query> => {
  return prisma.query.update({ where: { id: queryId }, data: queryData });
};

export const deleteQuery = async (queryId: string): Promise<Query> => {
  return prisma.query.delete({ where: { id: queryId } });
};

export async function getCasesForUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        cases: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.cases;
  } catch (error) {
    console.error(`Error fetching cases for user: ${error}`);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUnAnsweredQueries(){
  const queries = await prisma.query.findMany({
    where: {
      response: null
    },
    include:{
      case: true
    }
  })
  return queries
}