document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;

    if (id) {
      const newTitle = prompt("Введите новое название");
      if (newTitle) {
        edit(id, newTitle).then(() => {
          event.target.closest("li").querySelector("span").textContent =
            newTitle;
        });
      }
    }
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
