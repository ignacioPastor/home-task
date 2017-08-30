import { User } from './../models/User'

export interface IResult {
    ok: boolean;
    error?: string;
    user?: User;
    identifyKey?: string;
}