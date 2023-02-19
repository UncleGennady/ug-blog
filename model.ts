export interface IPost {
    _id: string,
    title: string ,
    text: string,
    tags: string[],
    viewsCount: number,
    author: {
        _id: string,
        fullName: string,
        email: string,
        passwordHash: string,
        createdAt: string,
        updatedAt: string,
        __v: number,
        avatarUrl?: string
    },
    imageUrl?: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
}