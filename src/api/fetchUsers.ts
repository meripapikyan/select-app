import { USERS_API_URL } from "../constants";
import { FetchUsersResponse } from "../types";

export async function fetchUsers(
  page: number,
  limit: number
): Promise<FetchUsersResponse> {
  const response = await fetch(`${USERS_API_URL}?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}
