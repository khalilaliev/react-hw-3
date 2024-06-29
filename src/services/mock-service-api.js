const TODOS_API = "https://667abbbebd627f0dcc90425f.mockapi.io/todos";

const service = {
  get: async (id) => {
    try {
      const res = await fetch(id ? `${TODOS_API}/${id}` : TODOS_API);
      if (!res.ok) throw new Error("todos not found");
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e.message);
    }
  },
  put: async (id, obj) => {
    try {
      const res = await fetch(`${TODOS_API}/${id}`, {
        method: "PUT",
        body: JSON.stringify(obj),
      });
      if (!res.ok) throw new Error("todos not found");
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e.message);
    }
  },
  delete: async (id) => {
    try {
      const res = await fetch(`${TODOS_API}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("todos not found");
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e.message);
    }
  },
  post: async (obj) => {
    try {
      const res = await fetch(`${TODOS_API}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!res.ok) throw new Error("todos not found");
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e.message);
    }
  },
};

export default service;
