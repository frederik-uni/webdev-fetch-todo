function generate(obj, users) {
  const container = document.createElement("div");
  const checked = document.createElement("input");
  const label = document.createElement("p");
  container.setAttribute("id", obj.id);
  container.classList = "todo-container";
  checked.checked = obj.completed;
  checked.type = "checkbox";
  label.innerText = obj.title;
  const user = users.find((user) => user.id === obj.userId);
  container.appendChild(checked);
  container.appendChild(label);
  if (user !== undefined) {
    const by = document.createElement("p");
    by.style = "margin-left: 3px; color: grey";
    by.innerText = `by ${user.username}`;
    container.appendChild(by);
  }
  return container;
}

window.onload = () => {
  const container = document.querySelector("#container");
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then(async (json) => {
      const users = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      ).then((resp) => resp.json());
      container.innerHTML = "";
      // biome-ignore lint:
      json.forEach((obj) => container.appendChild(generate(obj, users)));
    })
    .catch((err) => {
      container.innerHTML = `Failed to load: ${err}`;
    });
};
