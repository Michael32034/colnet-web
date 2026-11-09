import { html } from "htm/preact/standalone";

interface Props {
    lesson: string;
    lessonDesc: string;
    lessonStart: string;
    lessonLink: string;
    isLinkDisabled: boolean;
}

const LessonComponent = ({
    lesson,
    lessonDesc,
    lessonLink,
    lessonStart,
    isLinkDisabled,
}: Props) => {
    return html`
    <div id="next_lesson" class="card m-2 card-bg-clr-4">
        <div class="card-body">
            <h5 id="next_lesson_title" class="card-title placeholder-glow">
                ${lessonDesc}: ${lesson}
            </h5>
            <h6 id="next_lesson_start" class="card-subtitle mb-2 text-body-secondary text-1">
                Початок: ${lessonStart}
            </h6>
            <!-- <p id="next_lesson_message" style="display: none"></p> -->
            <a id="next_lesson_link" href="${lessonLink}" class="card-link text-1 ${isLinkDisabled ? "disabled" : ""}">Посилання на урок</a>
            <a href="https://htcolledge.sumdu.edu.ua/dystantsiyne-navchannia/" class="card-link text-1">
                Офіційний сайт
            </a>
        </div>
    </div>
    `;
};

export default LessonComponent;
