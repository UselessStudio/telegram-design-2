import {Circle, Gradient, Img, Node, NodeProps} from "@motion-canvas/2d";
import {ChatList} from "./chat-list.js";
import {PRIMARY} from "../scenes/example.js";

export class FeedItem extends Node {
    constructor(props?: NodeProps & {background: boolean}) {
        super(props);

        const gradient = new Gradient({
            type: "linear",
            fromX: -25,
            fromY: -25,
            toX: 50,
            toY: 50,
            stops: [
                {offset: 0, color: "#ff1b82"},
                {offset: 1, color: "#ff1bd9"}
            ]
        });
        this.add(
            <ChatList background={props.background} feed={true} avatar={<Circle margin={10} fill={gradient} size={90}
                                                  justifyContent="center" alignItems="center">
                <Img src="/channel.svg" size={50}/>
            </Circle>} color={PRIMARY} name="Your feed" line2="Read recent messages from " message="channels you follow"/>
        );
    }
}