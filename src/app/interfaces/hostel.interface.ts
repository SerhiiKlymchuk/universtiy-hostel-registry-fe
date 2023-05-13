export interface Hostel {
    _id: string,
    name: string,
    address: string,
    coordinates: string[],
    university: {
        _id: string,
        name: string
    } | null,
    pointColor: string,
    photos: any[],
    createdAt: Date,
    updatedAt: Date,
    __v: number
}
