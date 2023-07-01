import instance from "@/utils/axios";
export const fetchData = async () => {
  const result = await instance.get("", { params });
  console.log("result is fefetch", result);
  return result.json();
};
