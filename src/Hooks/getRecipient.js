import { useEffect, useState } from "react";
import { getData } from "../service/api";

export const useGetRecipientData = ({ user, chat }) => {
  const [recipientData, setRecipientData] = useState(null);
  const recipientId = chat?.members.find((userId) => userId !== user._id);

  useEffect(() => {
    const getRecipientUser = async () => {
      if (!recipientId) return null;
      console.log("Fetching data for recipientId:", recipientId);
      const response = await getData(`user/find/${recipientId}`);
      if (response?.data) {
        console.log("Recipient data:", response.data);
        setRecipientData(response.data);
      } else {
        console.log("Failed to fetch recipient data:", response);
      }
    };
    getRecipientUser();
  }, [recipientId]);

  return { recipientData };
};
