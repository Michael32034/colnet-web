import { html } from "htm/preact/standalone";
import { Replacement } from "../data";

const ReplacementComponent = (replacement: Replacement) => {
  let message;
  if (typeof replacement.content == "string") {
    console.log(88);
    message = html` <p>${replacement.content}</p> `;
  } else {
    console.log(57);
    message = html`
      <p class="w-100">1: ${replacement.content.old.name}</p>
      <p class="w-100">2: ${replacement.content.new.name}</p>
    `;
  }
  return html`
    <div class="replacement card m-2 card-bg-clr-4">
      <div class="card-body">
        <h5 class="card-title">
          Заміна ${replacement.lessons + " "}
          ${replacement.lessons.length == 1 ? "пари" : "пар"}
        </h5>
        <h6 class="card-subtitle mb-2 text-body-secondary text-1">
          ${replacement.date}
        </h6>
        <div class="d-flex">${message}</div>
      </div>
    </div>
  `;
};

export default ReplacementComponent;
