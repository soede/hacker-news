import {FC, useEffect, useState} from 'react';
import {
    Text, Card, Title,
} from '@vkontakte/vkui';
import axios from "axios";
import {IComment} from "../panels/PostInfo.tsx";
import {Icon28ChevronDownOutline} from "@vkontakte/icons";
import {CommentaryProps} from "../core/props.ts";



export const CommentaryBlock: FC<CommentaryProps> = ({
    commentId,
    level,
    comments,
    setComments,}) => {
    const [commentNow, setCommentNow] = useState<IComment|null>(null)
    const [openChild, setOpenChild] = useState(false)
    useEffect(() => {
        async function fetchData() {
            await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`).then((el)=>{
                const thisComment:IComment = {
                    commentId: el.data.id,
                    title: el.data.text,
                    author: el.data.by,
                    ago: el.data.time,
                    level: level,
                    childrens: el.data.kids? el.data.kids : null
                }
                setCommentNow(thisComment)

                setComments(prevArray => prevArray?[...prevArray, thisComment]: [thisComment])

            })

        }
        fetchData();
    }, []);
    return (
        <div>
            <Card style={{
                marginTop: 12,
                marginLeft: level * 24
            }} onClick={() => {
                setOpenChild(true)
            }}>
                <div>
                    {!openChild && commentNow?.childrens?.length> 0 && <div style={{float: "right", marginRight: 24, marginTop: 24}}>
                        <Icon28ChevronDownOutline/>
                    </div>}
                    <Title level="2" weight="2" style={{paddingTop: 12, paddingLeft: 12}}>{commentNow?.title}</Title>
                    <div className="discription" style={{paddingLeft: 12, marginTop: 3, paddingBottom: 12}}>
                        <Text weight="3" style={{
                            display: "inline-block",
                            marginRight: 10,
                            color: "#909499"
                        }}> {commentNow?.author}</Text>
                        <Text weight="3"
                              style={{display: "inline-block", color: "#909499"}}>{commentNow?.ago && new Date(commentNow?.ago * 1000).toLocaleString()}</Text>
                    </div>
                </div>
            </Card>

            {openChild && commentNow?.childrens?.map((el) => {
                return (
                    <CommentaryBlock commentId={el} level={commentNow?.level + 1} comments={comments}
                                     setComments={setComments}/>
                );
            })}
        </div>


    );
};
