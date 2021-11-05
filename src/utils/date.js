import { format, formatDistance } from "date-fns";

export const formatDate = (date) => {
  const formattedDate = format(new Date(date.seconds * 1000), "dd/MM/yyyy");
  const elapsedTime = formatDistance(
    new Date(date.seconds * 1000),
    new Date(),
    {
      addSuffix: true,
    }
  );

  return { formattedDate, elapsedTime };
};
