import { Mutation } from "./Mutation";
import { Query } from "./Query";
import * as Input from './inputs' ;
import * as Model from './models' ;

export const resolvers = {
    Mutation,
    Query,
    ...Input,
    ...Model
}