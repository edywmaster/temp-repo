import './styles.css'
import { Component } from "react";

export class Button extends Component {
    render() {

        const { text, click, disabled } = this.props;

        return (
            <button
                disabled={disabled}
                onClick={click}
                className="button-loadmore"
            >
                {text}
            </button>
        )
    }
}