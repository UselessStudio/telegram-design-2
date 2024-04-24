import {Icon, Img, Node, NodeProps, Rect, Txt} from "@motion-canvas/2d";
import {SCREEN_BORDER, SCREEN_WIDTH} from "../phone.js";

export class FeedHeader extends Node {
    constructor(props?: NodeProps) {
        super(props);

        this.add(<Rect paddingTop={80} fill={"#F6F6F6"}>
            <Img width={SCREEN_WIDTH - SCREEN_BORDER * 2} src="/feed-bar.svg"/>
        </Rect>)
    }
}