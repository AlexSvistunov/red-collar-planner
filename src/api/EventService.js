import URL from "./url";

export default class EventService {
  static async getEventsForPublic() {
    const response = await fetch(
      `${URL}/api/events?populate=*&filters[dateStart][$gte]=2022-10-14T14:00:00.000Z&filters[dateStart][$lte]=2024-10-14T14:00:00.000Z`
    );

    const data = await response.json();
    return data;
  }

  static async createEvent(token, obj) {
    const response = await fetch(`${URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(obj),
    });

    const data = await response.json();
    return data;
  }

  static async leaveEvent(id, token) {
    const response = await fetch(`${URL}/api/events/${id}/leave`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }

  static async joinEvent(id, token) {
    const response = await fetch(`${URL}/api/events/${id}/join`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data
  }
}
