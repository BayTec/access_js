import { AccessInterface } from "../Access/AccessInterface";

export interface AccessRemoverInterface{
    remove(access: AccessInterface): void
}