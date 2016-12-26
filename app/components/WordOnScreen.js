import React, {Component} from "react";
import GameContainer from "./GameContainer";
import UserInfoContainer from "./UserInfoContainer";
import CharacterComponent from "./CharacterComponent";

export default class WordOnScreen extends Component {
    render() {
        let splitWord = "";
        return (
            <span>
            {
                this.props.word.split("").map((character, i) => {
                splitWord += character;
                return (
                    <span key={i} className={splitWord}>
                    <CharacterComponent word={this.props.word} splitWord={splitWord} character={character}/>
                    </span>
                )})
            }
            </span>
        )
    }
}
