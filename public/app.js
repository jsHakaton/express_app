document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const buttonsContainer = event.target.closest("div");
    const originalContent = buttonsContainer.innerHTML;

    const title = event.target.closest("li").querySelector("span");
    const originalTitle = title.textContent;
    title.setAttribute("contenteditable", "true");

    const acceptButton = document.createElement("button");
    acceptButton.className = "btn btn-success";
    acceptButton.textContent = "Сохранить";

    const cancelButton = document.createElement("button");
    cancelButton.className = "btn btn-danger";
    cancelButton.textContent = "Отменить";

    buttonsContainer.replaceChildren(acceptButton, cancelButton);

    const id = event.target.dataset.id;
    title.contenteditable = "true";

    buttonsContainer.addEventListener("click", (event) => {
      if (event.target === acceptButton) {
        newTitle = title.textContent;

        if (newTitle !== originalTitle) {
          edit(id, newTitle);
        }

        title.setAttribute("contenteditable", "false");
        buttonsContainer.innerHTML = originalContent;
      } else if (event.target === cancelButton) {
        title.textContent = originalTitle;
        title.setAttribute("contenteditable", "false");
        buttonsContainer.innerHTML = originalContent;
      }
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      title: newTitle,
    }),
  });
}
