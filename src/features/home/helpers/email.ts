import apiClient from "@/api/apiClient";

export const getEmails = async () => {
  const response = await apiClient("/email", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("x-token")}`,
    },
  });
  const data = await response.data;
  console.log({ data });
  return data;
};

export const getAutomation = async () => {
  const response = await apiClient("/automation", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("x-token")}`,
    },
  });
  const data = await response.data;
  console.log({ data });
  return data;
};
