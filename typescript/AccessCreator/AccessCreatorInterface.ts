import { AccessInterface } from "../Access/AccessInterface";

export interface AccessCreatorInterface{
    create(): AccessInterface;
}