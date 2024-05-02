import {NavIdProps} from "@vkontakte/vkui";
import {IPost} from "../panels/Home.tsx";
import {UserInfo} from "@vkontakte/vk-bridge";
import * as React from "react";
import {ReactNode} from "react";
import {IComment} from "./interfaces.ts";

export interface PostInfoProps extends NavIdProps {
    id: string;
    postNow: IPost | null
}
export interface HomeProps extends NavIdProps {
    fetchedUser?: UserInfo;
    setPopout: React.Dispatch<React.SetStateAction<ReactNode>>;
    setPostNow:  React.Dispatch<React.SetStateAction<IPost|null>>;
}
export interface NewsCardProps {
    index: number;
    title: string;
    author: string;
    ago: string;
    points: number;
    setPostNow:  React.Dispatch<React.SetStateAction<IPost|null>>;
    post: IPost
}

export interface CommentaryProps {
    commentId: number;
    level: number;
    comments: IComment,
    setComments:  React.Dispatch<React.SetStateAction<IComment[]|null>>;
}
