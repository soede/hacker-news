import {FC, useEffect, useState} from 'react';
import {
    Panel,
    PanelHeader,
    Group, Title, Text, Div, PanelHeaderButton, Link
} from '@vkontakte/vkui';
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {CommentaryBlock} from "../components/CommentaryBlock.tsx";
import {Icon24ExternalLinkOutline, Icon28ArrowLeftOutline} from "@vkontakte/icons";
import {PostInfoProps} from "../core/props.ts";
import {IComment} from "../core/interfaces.ts";



export const PostInfo: FC<PostInfoProps> = ({ id,postNow }) => {
    const routeNavigator = useRouteNavigator();
    const [comments, setComments] = useState<IComment[]|null>(null)

    useEffect(() => {
        if(postNow == null){
            routeNavigator.back(1);
        }
    }, []);

    return (
        <Panel id={id}>
            <PanelHeader before={
                <PanelHeaderButton onClick={() => {
                    routeNavigator.back(1);
                }}>
                    <Icon28ArrowLeftOutline/>
                </PanelHeaderButton>
            }></PanelHeader>
            <Group>
                <Div>
                    <Title weight="1" level="1">{postNow?.title}</Title>
                    <div style={{marginTop: 6}}>
                        <Text style={{display: "inline-block", color: "#909499"}}>by {postNow?.by}</Text>
                        <Text style={{
                            display: "inline-block",
                            color: "#909499",
                            marginLeft: 10
                        }}>{postNow?.time && new Date(postNow?.time * 1000).toLocaleString()}</Text>
                        <Text style={{
                            display: "inline-block",
                            color: "#4CD964",
                            marginLeft: 10,
                        }}>{postNow?.score} points</Text>
                    </div>
                    <div style={{marginTop: 12}}>
                        <Link href={postNow?.url} target="_blank" style={{color: "#909499"}}>{postNow?.url}
                            <Icon24ExternalLinkOutline width={16} height={16}/></Link>
                    </div>
                    <Title style={{marginTop: 12}}>
                        💬 Comments
                    </Title>

                    {postNow?.kids?.map((el) => {
                        return (
                            <CommentaryBlock
                                commentId={el}
                                level={1}
                                comments={comments}
                                setComments={setComments}/>
                        )
                    })}

                    {!postNow?.kids && <Text style={{marginTop: 12}}>is Empty👀</Text>}

                </Div>

            </Group>
        </Panel>
    );
};
