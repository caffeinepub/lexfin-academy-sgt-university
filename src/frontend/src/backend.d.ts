import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Registration {
    name: string;
    role: Role;
    email: string;
    department: string;
}
export enum Role {
    faculty = "faculty",
    student = "student"
}
export interface backendInterface {
    getAllRegistrations(): Promise<Array<Registration>>;
    getRegistration(user: Principal): Promise<Registration>;
    isRegistered(): Promise<boolean>;
    register(name: string, email: string, department: string, role: Role): Promise<void>;
}
