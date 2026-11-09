import { html } from "htm/preact/standalone";
import { DayOfWeek } from "../data";

interface Props {
    dayOfWeek: DayOfWeek;
    monthDay: string;
    month: string;
}

const HomeHeaderComponent = ({ dayOfWeek, monthDay, month }: Props) => {
    return html`
    <div class="card m-2 card-bg-clr-4">
        <div class="card-body d-inline-flex justify-content-between card-bg-clr-4">
            <span id="date" class="text-1">${monthDay}.${month.length > 1 ? month : "0" + month}</span>
            <span id="dayofweek" class="text-1">${dayOfWeek}</span>
        </div>
    </div>
    `;
};

export default HomeHeaderComponent;
