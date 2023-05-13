import { ROLES } from "../enums/roles.enum";

export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    email: string,
    password?: string | null,
    role: ROLES
}
