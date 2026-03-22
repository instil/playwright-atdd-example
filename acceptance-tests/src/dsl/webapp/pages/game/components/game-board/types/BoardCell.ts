export type BoardCell =
  | "Top Left"
  | "Top Center"
  | "Top Right"
  | "Middle Left"
  | "Center"
  | "Middle Right"
  | "Bottom Left"
  | "Bottom Center"
  | "Bottom Right";

export const cellIndex: Record<BoardCell, number> = {
  "Top Left": 0,
  "Top Center": 1,
  "Top Right": 2,
  "Middle Left": 3,
  Center: 4,
  "Middle Right": 5,
  "Bottom Left": 6,
  "Bottom Center": 7,
  "Bottom Right": 8,
};
