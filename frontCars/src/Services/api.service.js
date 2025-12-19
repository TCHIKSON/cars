export class ApiService {
  constructor(baseUrl, accessToken) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
  }

  updateAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async post(endpoint, data = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const retValue = await response.json();

    if ([401, 403].includes(retValue.statusCode)) {
      this.accessToken = "";
      localStorage.removeItem("token");
    }

    return retValue;
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const retValue = await response.json();

    if ([401, 403].includes(retValue.statusCode)) {
      this.accessToken = "";
      localStorage.removeItem("token");
    }

    return retValue;
  }

  async patch(endpoint, data = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const retValue = await response.json();

    if ([401, 403].includes(retValue.statusCode)) {
      this.accessToken = "";
      localStorage.removeItem("token");
    }

    return retValue;
  }

  async put(endpoint, data = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const retValue = await response.json();

    if ([401, 403].includes(retValue.statusCode)) {
      this.accessToken = "";
      localStorage.removeItem("token");
    }

    return retValue;
  }

  async delete(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const retValue = await response.json();

    if ([401, 403].includes(retValue.statusCode)) {
      this.accessToken = "";
      localStorage.removeItem("token");
    }

    return retValue;
  }

  auth = {
    signUp: async ({ username, email, password }) => {
      return await this.post("/auth/sign-up", { username, email, password });
    },
    signIn: async ({ email, password }) => {
      return await this.post("/auth/sign-in", { email, password });
    },
  };

  car = {
    create: async (data) => {
      return await this.post("/cars/create", data);
    },
    getById: async (id) => {
      return await this.get(`/cars/${id}`);
    },
    getAll: async () => {
      return await this.get(`/cars`);
    },
    update: async (id, data) => {
      return await this.put(`/cars/update/${id}`, data);
    },
    delete: async (id) => {
      return await this.delete(`/cars/${id}`);
    },
  };
  brand = {
    create: async (data) => {
      return await this.post("/brands/create", data);
    },
    getById: async (id) => {
      return await this.get(`/brands/${id}`);
    },
    getAll: async () => {
      return await this.get(`/brands`);
    },
    update: async (id, data) => {
      return await this.put(`/brands/update/${id}`, data);
    },
    delete: async (id) => {
      return await this.delete(`/brands/${id}`);
    },
  };
  reservation = {
    create: async (data) => {
      return await this.post("/reservations/create", data);
    },
    getById: async (id) => {
      return await this.get(`/reservations/${id}`);
    },
    getAll: async () => {
      return await this.get(`/reservations`);
    },
    update: async (id, data) => {
      return await this.put(`/reservations/update/${id}`, data);
    },
    delete: async (id) => {
      return await this.delete(`/reservations/${id}`);
    },
  };
  category = {
    create: async ({ name, description }) => {
      return await this.post("/categories", { name, description });
    },
    getAll: async () => {
      return await this.get(`/categories`);
    },
  };
}
