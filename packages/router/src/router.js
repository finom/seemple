const {
  calc, on, onDebounce, trigger, set
} = require('seemple');

function handleHashChange(router) {
  set(router, 'hashPath', window.location.hash, {
    hashEvent: true
  });
}

function handlePopStateChange(router) {
  set(router, 'path', window.location.pathname, {
    popEvent: true
  });
}

class Router {
    parts = [];

    path = '/';

    hashPath = '#!/';

    constructor(type) {
      // singletone pattern for history and hash router
      if (type in Router) {
        return Router[type];
      }

      this.type = type;

      return this;
    }


    init() {
      if (this.initialized) {
        return this;
      }

      const { type } = this;

      calc(this, {
        parts: {
          source: 'path',
          handler(path) {
            const fixed = path.replace(/\/\//g, '/')
              .replace(/^\/|\/$/g, '');

            return fixed ? fixed.split('/') : [];
          }
        },
        path: {
          source: 'parts',
          handler(parts) {
            const nonEmptyParts = [];

            for (let i = 0; i < parts.length; i++) {
              if (parts[i]) {
                nonEmptyParts.push(parts[i]);
              } else {
                break;
              }
            }

            return nonEmptyParts.length ? (`/${nonEmptyParts.join('/')}/`) : '/';
          }
        }
      }, { debounceCalc: false });

      calc(this, {
        hashPath: {
          source: 'path',
          handler(path) {
            return path && path !== '/' ? `#!${path}` : '';
          }
        },
        path: {
          source: 'hashPath',
          handler(hashPath) {
            return hashPath ? hashPath.replace(/^#!/, '') : '';
          }
        }
      }, { debounceCalc: false });

      on(this, 'change:parts', (evt) => {
        const { value, previousValue } = evt;
        let equals = value.length === previousValue.length;

        if (equals) {
          for (let i = 0; i < value.length; i++) {
            if (value[i] !== previousValue[i]) {
              equals = false;
              break;
            }
          }
        }

        if (!equals) {
          trigger(this, 'pathchange');
        }
      });

      if (typeof window !== 'undefined') {
        const { history, location } = window;

        if (type === 'hash') {
          handleHashChange(this);

          window.addEventListener('hashchange', () => handleHashChange(this));

          onDebounce(this, 'change:hashPath', (evt) => {
            if (!evt || !evt.hashEvent) {
              location.hash = this.hashPath;
            }
          }, true);
        } else if (type === 'history') {
          handlePopStateChange(this);

          window.addEventListener('popstate', (evt) => {
            if (evt.state && evt.state.validPush) {
              handlePopStateChange(this);
            }
          });

          onDebounce(this, 'change:path', (evt) => {
            if (!evt || !evt.popEvent) {
              history.pushState({
                validPush: true
              }, '', this.path + location.hash);
            }
          }, true);
        }
      }

      this.initialized = true;

      return this;
    }

    subscribe(obj, route) {
      const keys = route.replace(/\/\//g, '/').replace(/^\/|\/$/g, '').split('/');
      const changeEvents = [];
      const filteredKeys = keys.filter((key) => key !== '*');
      const parts = [];

      this.init();

      for (let i = 0; i < filteredKeys.length; i++) {
        const key = filteredKeys[i];
        changeEvents.push(`change:${key}`);
      }

      on(obj, changeEvents, (evt) => {
        if (evt && evt.routeSilent) {
          return;
        }

        const values = [];

        for (let i = 0; i < keys.length; i++) {
          const value = keys[i] === '*' ? this.parts[i] : obj[keys[i]];

          if (value) {
            values.push(value);
          } else {
            break;
          }
        }

        this.parts = values;
      });

      for (let i = 0; i < keys.length; i++) {
        parts.push(obj[keys[i]] === '*' ? this.parts[i] : obj[keys[i]] || this.parts[i]);
      }

      for (let i = 0; i < keys.length; i++) {
        if (typeof obj[keys[i]] === 'undefined' && this.parts[i] && keys[i] !== '*') {
          set(obj, keys[i], this.parts[i], {
            routeSilent: true
          });
        }
      }

      on(this, 'pathchange', () => {
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] !== '*') {
            set(obj, keys[i], this.parts[i] || null, {
              routeSilent: true
            });
          }
        }
      });

      this.parts = parts;

      return this;
    }
}

Router.history = new Router('history');
Router.hash = new Router('hash');

module.exports = Router;
