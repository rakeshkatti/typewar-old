import React, {Component} from "react";
import GameContainer from "./GameContainer";
import UserInfoContainer from "./UserInfoContainer";

export default class MainContainer extends Component {
    render() {
        return (
            <div> MainContainer
                <UserInfoContainer/>
                <GameContainer />
            </div>
        )
    }
}
