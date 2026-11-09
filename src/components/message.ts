import { html } from "htm/preact/standalone";

interface Props {
    message: string;
    secondaryMessage: string;
}

const MessageComponent = ({ message, secondaryMessage }: Props) => {
    return html`
    <div id="next_lesson" class="card m-2 card-bg-clr-4">
        <div class="card-body">
            <h5 id="next_lesson_title" class="card-title placeholder-glow">
                ${message}
            </h5>
            <h6 id="next_lesson_start" class="card-subtitle mb-2 text-body-secondary text-1">
                ${secondaryMessage}
            </h6>
        </div>
    </div>
    `;
};

export default MessageComponent;
