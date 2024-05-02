import {useState, ReactNode, createContext} from 'react';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { PostInfo } from "./panels/PostInfo.tsx";
import {IPost} from "./panels/Home.tsx";

export const PostContext = createContext({});

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

  const [postNow, setPostNow] = useState<IPost|null>(null)

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" setPopout={setPopout} setPostNow={setPostNow}/>
          <PostInfo id="postInfo" postNow={postNow}/>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
