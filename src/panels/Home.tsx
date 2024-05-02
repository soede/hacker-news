import {FC, useEffect, useState} from 'react';
import {
    Panel,
    Header,
    Group,
    Div,
    CardGrid,
} from '@vkontakte/vkui';
import {NewsCard} from "../components/NewsCard.tsx";
import people from "../assets/people.png"
import axios from "axios";
import {HomeProps} from "../core/props.ts";
import {IPost} from "../core/interfaces.ts";




export const Home: FC<HomeProps> = ({id, setPopout, setPostNow}) => {

    const [bestPosts, setBestPosts] = useState<IPost[]>([])

    useEffect(() => {

    }, [bestPosts]);

    useEffect(() => {
        async function fetchData() {
            await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')
                .then((response) => {
                    const bestHundred: number[] = response.data.slice(0, 100);
                    bestHundred.map(async (el) => {
                        await axios.get(`https://hacker-news.firebaseio.com/v0/item/${el}.json`).then(async (el) => {
                            const thisPost: IPost = {
                                by: el.data?.by,
                                descendants: el.data.descendants,
                                id: el.data.id,
                                kids: el.data.kids,
                                score: el.data.score,
                                text: el.data.text,
                                time: el.data.time,
                                title: el.data.title,
                                type: el.data.type,
                                url: el.data.url
                            }


                            setBestPosts(prevState => [...prevState, thisPost])
                        })

                    })
                });
            setPopout(null);
        }

        fetchData();
    }, []);

    return (
        <Panel id={id}>
            <Group header={
                <div style={{marginLeft: 12}}>
                    <Header style={{display: "inline-block", marginRight: -12}} mode="secondary">
                        Hacker News
                    </Header>
                    <img style={{display: "inline-block", marginTop: -8}} width={24} height={24} src={people}/>
                </div>}>
                <Div>

                    <CardGrid size="l">
                        {
                            bestPosts.map((el, index) => {
                                return <NewsCard
                                    key={index}
                                    index={index + 1}
                                    ago={new Date(el.time * 1000).toLocaleString()}
                                    author={el.by}
                                    title={el.title}
                                    points={el.score}
                                    setPostNow={setPostNow}
                                    post={el}
                                ></NewsCard>;
                            })
                        }
                    </CardGrid>
                </Div>


            </Group>
        </Panel>
    );
};
