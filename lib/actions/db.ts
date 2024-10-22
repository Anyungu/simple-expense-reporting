"use server";

import { createCompany, verifyUser } from "@/db/db.util";

export async function createCompanyAction(
  companyFormData: CompanyFormData,
  userId: string
) {
  return createCompany(companyFormData, userId);
}

export async function verifyUserAction(email: string, password: string) {
  return await verifyUser(email, password);
}
