export interface ReviewModel {
  toyId: number;
  name: string;
  rating: number;
  comment: string;
  userEmail?: string;
}