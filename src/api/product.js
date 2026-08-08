const API = "http://localhost:3000";

export async function getProducts() {
  const res = await fetch(`${API}/products`);
  return res.json();
}

export async function createProduct(data) {
  return fetch(`${API}/products`, {
    method: "POST",
    body: data,
  });
}

export async function updateProduct(id, data) {
  return fetch(`${API}/products/${id}`, {
    method: "PUT",
    body: data,
  });
}

export async function deleteProduct(id) {
  return fetch(`${API}/products/${id}`, {
    method: "DELETE",
  });
}