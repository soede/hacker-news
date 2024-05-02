import {FC} from 'react';
import {
    Text, Card, Title,
} from '@vkontakte/vkui';
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import * as React from "react";
import {IPost} from "../panels/Home.tsx";
import {NewsCardProps} from "../core/props.ts";



export const NewsCard: FC<NewsCardProps> = ({index, title, author,ago, points, setPostNow, post}) => {
    const routeNavigator = useRouteNavigator();

    return (
        <Card onClick={()=>{
            setPostNow(post)
            routeNavigator.push("postInfo")
        }}>
            <div>
                <Title level="2" weight="2" style={{paddingTop: 12, paddingLeft: 12}}>#{index} {title}</Title>
                <div className="discription" style={{paddingLeft: 12, marginTop: 3, paddingBottom: 12}}>
                    <Text weight="3" style={{display: "inline-block", marginRight: 10, color: "#909499" }}>by {author} </Text>
                    <Text weight="3" style={{display: "inline-block", color: "#909499"}}>{ago}</Text>
                </div>
                <Text style={{float: "right", paddingRight: 12, paddingBottom: 12, color: "#4CD964"}}>{points} points</Text>
            </div>
        </Card>
    );
};
