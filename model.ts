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


