import { ReviewModel } from "./review.model"


export interface UserModel {
    firstName: string
    lastName: string
    email: string
    password: string
    address: string
    phone: string 
    review: ReviewModel[]
    favoriteCategory: string
}