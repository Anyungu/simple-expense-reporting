"use server";

import { createCompany } from "@/db/db.util";

export async function createCompanyAction(
  companyFormData: CompanyFormData,
  userId: string
) {
  return createCompany(companyFormData, userId);
}
