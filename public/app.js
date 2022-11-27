document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", async event => {
        const toggleModus = id => {
            document.querySelector(`[data-fixedid="${id}"]`).classList.toggle("hidden");
            document.querySelector(`[data-editid="${id}"]`).classList.toggle("hidden");
            document.querySelector(`[data-fixedblockid="${id}"]`).classList.toggle("hidden");
            document.querySelector(`[data-editblockid="${id}"]`).classList.toggle("hidden");
        };

        switch (event.target.dataset.type) {
            case "remove": {
                await fetch(`/api/tasks/${event.target.dataset.id}`, { method: "delete" });
                event.target.closest("li").remove();
                break;
            }
            case "download": {
                await fetch("/download", { method: "get" });
                break;
            }
            case "edit": {
                toggleModus(event.target.dataset.id);
                break;
            }
            case "save": {
                await fetch(`/api/tasks/${event.target.dataset.id}`, { method: "put", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: event.target.dataset.id, content: document.querySelector(`[data-editid="${event.target.dataset.id}"]`).value }) });
                document.querySelector(`[data-fixedid="${event.target.dataset.id}"]`).innerHTML = document.querySelector(`[data-editid="${event.target.dataset.id}"]`).value;
                toggleModus(event.target.dataset.id);
                break;
            }
            case "back": {
                toggleModus(event.target.dataset.id);
                break;
            }
        }
    });
    document.forms[0].addEventListener("submit", async event => {
        try {
            event.preventDefault();
            await fetch("/api/tasks", { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ [event.target.task.name]: event.target.task.value }) });
        } catch (err) {
            console.log(err);
        } finally {
            window.location.reload();
        }
    });
}, false);
