import React, {Component} from "react";

export default class UserInfoContainer extends Component {
    render() {
        const {store} = this.context;
        const state = store.getState();
        return (
            <div>
                {
                    state.users.map((user) => {
                        return (
                            <span>
                                {user} <br />
                                {state.words.typed[user]}
                                <br />
                            </span>
                        )
                    console.log();
                })}
            </div>
        )
    }
}

UserInfoContainer.contextTypes = {
    store: React.PropTypes.object
}
