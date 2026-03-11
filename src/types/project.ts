export type ProjectType =
  | "architecture"
  | "interior"
  | "hospitality"
  | "residential";

export interface Project {
  id: string;
  title: string;
  titleIt: string;
  location: string;
  year: number;
  type: ProjectType;
  material: string;
  image: string;
  featured?: boolean;
}
