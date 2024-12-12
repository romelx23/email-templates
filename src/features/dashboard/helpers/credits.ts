import apiClient from "@/api/apiClient";

export const getCredits = async () => {
  const response = await apiClient.post(
    "/email/credits",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("x-token")}`,
      },
    }
  );
  const data = await response.data;
  console.log({ data });
  return data;
};
