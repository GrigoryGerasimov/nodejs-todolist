document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", async event => {
        switch (event.target.dataset.type) {
            case "remove": {
                await fetch(`/${event.target.dataset.id}`, { method: "delete" });
                event.target.closest("li").remove();
                break;
            }
            case "download": {
                await fetch("/download", { method: "get" });
                break;
            }
        }
    });
}, false);
