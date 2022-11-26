document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", async event => {
        if (event.target.dataset.type === "remove") {
            await fetch(`/${event.target.dataset.id}`, { method: "delete" });
            event.target.closest("li").remove();
        }
    });
}, false);
