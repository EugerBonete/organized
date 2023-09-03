export enum GoalTypes {
  daily = "bg-gradient-to-r from-red-500 to-orange-500",
  monthly = "bg-gradient-to-r from-rose-400 to-red-500",
  yearly = "bg-gradient-to-r from-violet-500 to-purple-500",
}

export type GoalColor = keyof typeof GoalTypes;
