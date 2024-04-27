import {Rect, makeScene2D, Gradient, Txt, Img} from '@motion-canvas/2d';
import {
  all,
  createRef, createSignal, easeInOutCubic, easeInOutQuad,
  easeOutExpo, linear,
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
  const w = SCREEN_WIDTH-SCREEN_BORDER*2;
  const h = 112;
  const signal = createSignal(0);
  const zoomGrad = new Gradient({
    type: "linear",
    fromX: -w/2-10,
    fromY: -h/2,
    toX: w-10,
    toY: h,
    stops: [
      {offset: createSignal(() => Math.max(0, signal()-0.2)), color: "rgba(255,255,255,0)"},
      {offset: signal, color: "rgba(69,202,255,0.4)"},
      {offset: createSignal(() => Math.min(1, signal()+0.2)), color: "rgba(255,255,255,0)"}
    ]
  });
  const highlight = createRef<Rect>();
  view.add(<Rect ref={zoom} width={w}
                 height={h} layout fill="white" radius={30} y={-29}
                 clip={true}>
    <Rect ref={highlight} layout={false} width={w} height={h} fill={zoomGrad}></Rect>
    <FeedItem background={false}/>
  </Rect>);
  zoom().opacity(0.4);
  yield* all(
      zoom().scale(1.4, 0.4, easeOutExpo),
      zoom().lineWidth(3, 0.4, easeOutExpo),
      zoom().opacity(1, 0.4, easeOutExpo),
  );
  yield* all(
      signal(1, 1, linear),
      highlight().opacity(1, 0.1, easeInOutCubic)
  );
  yield* all(
      zoom().scale(1, 0.4, easeOutExpo),
      zoom().lineWidth(0, 0.4, easeOutExpo),
  );
  yield* zoom().opacity(0.1, 0.2, easeInOutCubic);
  zoom().remove();

  const click = createRef<ClickMarker>();
  view.add(<ClickMarker zIndex={10} ref={click}/>);
  yield* click().click(0, -20);
  yield* click().endClick();
  const messages = createRef<Img>();
  yield* all(
      title().position.y(-700, 0.5, easeInOutCubic),
      screen().position.y(0, 0.5, easeInOutCubic),
      screen().scale(0.8, 0.5, easeInOutCubic),
      screen().transitionTo(<Rect direction="column" fill="white" height={SCREEN_HEIGHT} clip={true}>
        <FeedHeader/>
        <Img width={SCREEN_WIDTH} src="/background.svg" zIndex={-3}/>
        <Img ref={messages} width={SCREEN_WIDTH - SCREEN_BORDER * 2} x={-SCREEN_WIDTH /2} y={-SCREEN_HEIGHT/2 + 170}
             src="/messages.png" offsetX={-1} offsetY={-1} layout={false} zIndex={-2}/>
        <Img layout={false} y={SCREEN_HEIGHT/2-SCREEN_BORDER*2}
             offsetY={1}
             width={SCREEN_WIDTH-SCREEN_BORDER*2}
             x={-SCREEN_BORDER} src="/feed-bottom.svg" zIndex={2}/>
      </Rect>),
      waitFor(0.2)
  );

  for (let i = 0; i < 5; i++) {
    yield* click().scroll(100, 300);
    yield* all(
        messages().y(messages().y() -850, 1, easeInOutQuad),
        click().endScroll(100, -300)
    );
  }


  yield* waitFor(0.5);

  yield* tween(0.8, value => {
    title().position.y(map(-425, 0, easeOutExpo(value)));
    screen().position.y(map(150, 800, easeOutExpo(value)));
  });
});
