import {Rect, makeScene2D, Gradient, Txt, Img, Circle, Line} from '@motion-canvas/2d';
import {
  all,
  createRef, easeInOutCubic,
  easeOutExpo,
  map,
  tween,
  waitFor
} from '@motion-canvas/core';
import {PhoneScreen, SCREEN_BORDER, SCREEN_HEIGHT, SCREEN_WIDTH} from "../components/phone.js";
import {ChatList} from "../components/chat-list.js";
import { MainHeader } from '../components/ios/chats-header.js';
import { FeedItem } from '../components/FeedItem.js';
import {ClickMarker} from "../components/click.js";
import { FeedHeader } from '../components/ios/feed-header.js';

export const PRIMARY = "#037EE5";

export default makeScene2D(function* (view) {
  const gradient = new Gradient({
    type: "linear",
    fromX: -view.width()/2,
    fromY: -view.height()/2,
    toX: view.width(),
    toY: view.height(),
    stops: [
      {offset: 0, color: "#ff1b6b"},
      {offset: 1, color: "#45caff"}
    ]
  });
  view.add(<Rect x={0} y={0} width={view.width()} height={view.height()} fill={gradient}/>);
  const title = createRef<Txt>();
  view.add(<Txt ref={title} fill="white" fontFamily="SF Pro" fontWeight={700} fontSize={70}>Channels Feed</Txt>);
  const screen = createRef<PhoneScreen>();
  view.add(<PhoneScreen x={0} y={800} ref={screen}>
    <MainHeader/>
    <FeedItem background={true}/>
    <Rect stroke={"rgba(0,0,0,0.1)"} width={SCREEN_WIDTH - SCREEN_BORDER * 2} lineWidth={1}/>
    <ChatList avatar="/avatars/emil.jpg" color={PRIMARY} name="Emil Gusev" message="What's up, bro?" messages={1}/>
    <ChatList avatar="/avatars/durov.jpg" color={PRIMARY} name="Pavel Durov" message="Let's bring the wall back"/>
    <ChatList avatar="/avatars/daria.jpg" color={PRIMARY} name="Daria" message="Working on it!" read={true}/>
    <ChatList avatar="/avatars/avatar.jpg" color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо" messages={29}/>
    <ChatList avatar="/avatars/elon.jpg" color={PRIMARY} name="Elon" message="I prefer Twitter" read={true}/>
    <ChatList avatar="/avatars/sergey.jpg" color={PRIMARY} name="Sergey" message="See you soon!" read={true}/>
    <Rect height={800}/>
  </PhoneScreen>);
  yield* waitFor(0.5);

  yield* tween(0.8, value => {
    title().position.y(map(0, -425, easeOutExpo(value)));
    screen().position.y(map(800, 150, easeOutExpo(value)));
  });

  const zoom = createRef<Rect>();
  view.add(<Rect ref={zoom} width={SCREEN_WIDTH-SCREEN_BORDER*2}
                 height={119} layout fill="white" radius={30} y={-27}
                 clip={true}
                 stroke={"rgba(0,0,0,0.22)"}>
    <FeedItem background={false}/>
  </Rect>);
  zoom().opacity(0.4);
  yield* all(
      zoom().scale(1.4, 0.4, easeOutExpo),
      zoom().lineWidth(3, 0.4, easeOutExpo),
      zoom().opacity(1, 0.4, easeOutExpo),
  );
  yield* waitFor(0.7);
  yield* all(
      zoom().scale(1, 0.4, easeOutExpo),
      zoom().lineWidth(0, 0.4, easeOutExpo),
  );
  yield* zoom().opacity(0.1, 0.6, easeInOutCubic);
  zoom().remove();

  const click = createRef<ClickMarker>();
  view.add(<ClickMarker zIndex={10} ref={click}/>);
  yield* click().click(0, -20);
  yield* click().endClick();
  yield* all(
      title().position.y(-700, 0.5, easeInOutCubic),
      screen().position.y(0, 0.5, easeInOutCubic),
      screen().scale(0.8, 0.5, easeInOutCubic),
      screen().transitionTo(<Rect direction="column" fill="white" height={SCREEN_HEIGHT}>
        <FeedHeader/>
      </Rect>),
      waitFor(0.2)
  );
  yield* waitFor(2);
});
