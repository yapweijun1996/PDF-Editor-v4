// Minimal implementation of @fluent/bundle for offline use
export class FluentBundle {
  constructor(locales, options = {}) {
    this.locales = locales;
    this.options = options;
    this._messages = new Map();
  }

  addResource(resource) {
    if (typeof resource === 'string') {
      // Simple parsing of FTL-like strings
      const messages = this._parseFTLString(resource);
      for (const [id, message] of messages) {
        this._messages.set(id, message);
      }
    }
  }

  _parseFTLString(ftlString) {
    const messages = new Map();
    const lines = ftlString.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const match = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
      if (match) {
        const [, id, value] = match;
        messages.set(id, {
          value: value.replace(/[""]/g, '').trim(),
          attributes: new Map()
        });
      }
    }

    return messages;
  }

  getMessage(id) {
    return this._messages.get(id) || null;
  }

  formatPattern(pattern, args = {}) {
    let result = pattern.value || pattern;

    // Simple variable substitution
    for (const [key, value] of Object.entries(args)) {
      const placeholder = new RegExp(`\\$\\{${key}\\}`, 'g');
      result = result.replace(placeholder, value);
    }

    return result;
  }

  hasMessage(id) {
    return this._messages.has(id);
  }
}

export class FluentResource {
  constructor(source) {
    this.source = source;
  }
}

export function ftl(source) {
  return new FluentResource(source);
}