type ID = string

interface IDate {
    createdAt: string,
    updatedAt: string,
}

export type JSXElement = JSX.Element

export type toogleForPostList = {
    new:string,
    popular: string,
}

export interface  IAuthMeResponse {
    success: boolean,
    _id: string,
    fullName: string,
    email: string,
    passwordHash: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    avatarUrl?: string,
}

export interface  ISignIn {
    email: string,
    password: string,
}

export interface  ISignInResponse extends  IAuthMeResponse{
    token: string,
}

export interface ISignUp extends  ISignIn {
    fullName: string,
    avatarUrl?: string
}

export  interface  ISignUpResponse extends  ISignInResponse{
    success: boolean,
}

export interface ISet<T> {
    add(value: T): this;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    readonly size: number;
}

export interface IAuthor extends IDate {
    _id: ID,
    fullName: string,
    email: string,
    passwordHash: string,
    __v: number,
    avatarUrl?: string
}

export interface IPost extends IDate{
    _id: ID,
    title: string ,
    text: string,
    tags: string[],
    viewsCount: number,
    author: IAuthor,
    imageUrl?: string,
    __v: number,
}

export interface IComment extends IDate{
    _id: ID,
    text: string,
    author: IAuthor,
    postId: ID,
    __v: number,
}
export interface ICreatedPost {
    imageUrl?: string,
    tags?: string[],
    text: string,
    title:string
}

export interface IUpdatedPost extends ICreatedPost{
    id: string,
}

export interface IDeletePost {
    id: string,
}

export interface ICreatedPostResponse {
    success: boolean,
    post:IPost
}

export interface IUpdatedPostResponse {
    success: boolean,
}

export interface IDeletePostResponse {
    success: boolean,
}

