import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const convertMsToDays = (ms: number): number => {
  const msInOneSecond = 1000;
  const secondsInOneMinute = 60;
  const minutesInOneHour = 60;
  const hoursInOneDay = 24;

  const minutesInOneDay = hoursInOneDay * minutesInOneHour;
  const secondsInOneDay = secondsInOneMinute * minutesInOneDay;
  const msInOneDay = msInOneSecond * secondsInOneDay;

  return Math.ceil(ms / msInOneDay);
};

export const getDaysBetweenDates = (dateOne: Date, dateTwo: Date): number => {
  let differenceInMs = dateTwo.getTime() - dateOne.getTime();

  if (differenceInMs < 0) {
    differenceInMs = dateOne.getTime() - dateTwo.getTime();
  }

  return convertMsToDays(differenceInMs);
};

const dateOne = new Date("01/01/2021"); // MM/DD/YYYY
const dateTwo = new Date("01/11/2021"); // MM/DD/YYYY

const daysBetweenDates = getDaysBetweenDates(dateOne, dateTwo);
console.log(daysBetweenDates); // 10
