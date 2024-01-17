  type SquareObject = {
    id: number
    date: Date,
    completed: boolean
    val: number
  }

  type Habit = {
    name: string,
    type: HabitType
  }

  export enum HabitType {
    NUMBER = 'NUMBER',
    CHECKBOX = 'CHECKBOX'
  }

  export type { SquareObject, Habit}