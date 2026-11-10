async function changedSettingsPage() {
    let settingsFormSubmit = document.getElementById(
        "settings_form_submit",
    ) as HTMLButtonElement;
    settingsFormSubmit.classList.add("btn-success");
    settingsFormSubmit.classList.remove("btn-outline-success");
    settingsFormSubmit.disabled = false;
}

export default changedSettingsPage;
