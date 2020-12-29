const WEB_API_KEY = 'AIzaSyAuj5Hs-uG8wsTeJH6_eDNwpDWBuyBsE1Y';
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`;
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`;
let timer;

export default {
  async login(context, { email, password }) {
    return context.dispatch('auth', { email, password, mode: 'login' });
  },
  async signup(context, { email, password }) {
    return context.dispatch('auth', { email, password, mode: 'signup' });
  },
  async auth(context, { email, password, mode }) {
    let url = LOGIN_URL;
    if (mode === 'signup') {
      url = SIGNUP_URL;
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.error.message || '';
      throw new Error(errorMessage);
    }

    const { idToken: token, localId: userId, expiresIn } = responseData;

    const expiresInTime = +expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresInTime;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresInTime);

    context.commit('setUser', {
      token,
      userId,
    });
  },
  async tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', { token, userId, tokenExpiration: null });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
