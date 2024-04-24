import {blur, Img, Line, Node, NodeProps, Rect, saturate, Txt, Video} from "@motion-canvas/2d";
import { PossibleColor } from "@motion-canvas/core";
import { Noise } from "./android/noise";
import {PRIMARY} from "../scenes/example.js";
import {ComponentChild} from "@motion-canvas/2d/src/lib/components/types.js";

interface ChatProps {
    name: string;
    message: string;
    line2?: string;
    author?: string;
    color: PossibleColor;
    hideBorder?: boolean;
    messages?: number;
    read?: boolean;
    feed?: boolean;
    background?: boolean;
    avatar: string | ComponentChild;
}

export class ChatList extends Node {
    constructor(props?: NodeProps & ChatProps) {
        super(props);
        this.add(<>
            <Rect alignItems="stretch" gap={5} marginTop={props.background ? 0 : 2} grow={1}
                       fill={props.background ? "#f6f6f6" : null}>
                {typeof props.avatar === "string" ? <Img margin={10} src={props.avatar} radius={50} width={90} /> : <>
                    {props.avatar}
                </>}

                <Rect direction="column" grow={1} justifyContent="space-between">
                    <Rect grow={1} alignItems="start">
                        <Rect direction="column" paddingTop={10} paddingBottom={10}>
                            <Rect direction="row" alignItems="start">
                                {props.feed ? <Img size={30} src="/bolt.svg"/> : <></>}
                                <Txt fontFamily="SF Pro" fill="black" fontSize={28} fontWeight={500} offsetX={-1}>
                                    {props.name}
                                </Txt>
                            </Rect>
                            <Rect direction="column" fontFamily="SF Pro" fontSize={25} fontWeight={400}>
                                {props.author ? <Txt fill="black">{props.author}</Txt> : <></>}

                                <Txt fill="#8E8E93">
                                    {props.line2 ? props.line2 : <></>}
                                </Txt>
                                <Txt fill="#8E8E93">
                                    {props.message}
                                </Txt>
                            </Rect>
                        </Rect>
                        <Rect grow={1} alignItems="end" alignSelf="center" paddingRight={15} direction="column" gap={20}>
                            <Rect direction="row">
                                {props.read ? <Img height={25} marginRight={4} src="/read.svg"/> : <></>}
                                <Txt fontFamily="SF Pro" fill="black" fontSize={22} fontWeight={400} offsetX={-1} opacity={0.6}>
                                    9:04
                                </Txt>
                            </Rect>
                            <Rect fill={PRIMARY} padding={6} radius={20}
                                  width={props.messages?.toString().length > 1 ? 45: 35}
                                  justifyContent="center" opacity={props.messages ? 1 : 0}>
                                <Txt fontFamily="Roboto" fill="white" fontSize={22} fontWeight={400} offsetX={-1} marginBottom={-5}>
                                    {props.messages ? props.messages.toString() : "0"}
                                </Txt>
                            </Rect>
                        </Rect>
                    </Rect>
                    <Rect height={1} fill={"black"} opacity={props.hideBorder || props.feed ? 0 : 0.3} />
                </Rect>
            </Rect>
        </>);
    }
}