const API_BASE_URL = "http://127.0.0.1:8000/";

const getAuthHeaders = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
    return {};
};

export const getCategories = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}categories/list/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { error: error.message, categories: [] };
    }
};

export const addCategory = async (name) => {
    try {
        const res = await fetch(`${API_BASE_URL}categories/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            credentials: "include",
            body: JSON.stringify({ name }),
        });

        if (!res.ok) {
            throw new Error(`Failed to add category: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error adding category:", error);
        return { error: error.message };
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const res = await fetch(`${API_BASE_URL}categories/${categoryId}/delete/`, {
            method: "DELETE",
            headers: {
                ...getAuthHeaders(),
            },
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`Failed to delete category: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error deleting category:", error);
        return { error: error.message };
    }
};
