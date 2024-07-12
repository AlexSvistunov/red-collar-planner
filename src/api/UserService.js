import URL from "./url";

export default class UserService {
  static async userExist(email) {
    const response = await fetch(`${URL}/api/taken-emails/${email}`);
    if (response.ok && response.status !== 404) {
      return 'plus one'
    } else {
      return 'plus two'
    }
  }

  static async loginUser(email, password) {
    try {
        const response = await fetch(`${URL}/api/auth/local`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: email,
            password: password,
          }),
        });
  
        const data = await response.json();
        return data
      } catch (error) {
        console.log(error.message);
      }
  }
}
