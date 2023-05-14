import { University } from "./university.interface";

export interface Hostel {
    _id: string,
    name: string,
    address: string,
    coordinates: string[],
    university: University | null,
    pointColor: string,
    photos: any[],
    createdAt: Date,
    updatedAt: Date,
    __v: number
}
