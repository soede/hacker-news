export interface IComment{
    commentId: number;
    title: string;
    author: string;
    ago: number;
    level: number;
    childrens: number[] | null
}
export interface IPost {
    by: string,
    descendants: number,
    id: number,
    kids: number[] | null,
    score: number,
    text: string,
    time: number,
    title: string,
    type: string,
    url: string
}
