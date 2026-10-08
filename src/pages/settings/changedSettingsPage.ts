async function changedSettingsPage() {
    let settings_form_submit = document.getElementById(
        "settings_form_submit",
    ) as HTMLButtonElement;
    settings_form_submit.classList.add("btn-success");
    settings_form_submit.classList.remove("btn-outline-success");
    settings_form_submit.disabled = false;
}

export default changedSettingsPage;
