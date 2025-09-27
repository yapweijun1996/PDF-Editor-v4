// Minimal implementation of @fluent/dom for offline use
export class Localization {
  constructor(resourceIds, generateBundles) {
    this.resourceIds = resourceIds;
    this.generateBundles = generateBundles;
    this._bundles = new Map();
  }

  async addResourceIds(resourceIds) {
    this.resourceIds.push(...resourceIds);
    // Clear cache to reload bundles
    this._bundles.clear();
  }

  async getBundle(id) {
    if (!this._bundles.has(id)) {
      const bundles = await this.generateBundles(id);
      this._bundles.set(id, bundles);
    }
    return this._bundles.get(id);
  }

  async formatValue(id, args = {}) {
    const bundles = await this.getBundle();
    for (const bundle of bundles) {
      const message = bundle.getMessage(id);
      if (message && message.value) {
        return bundle.formatPattern(message, args);
      }
    }
    return id; // fallback
  }

  async formatMessages(patterns) {
    const bundles = await this.getBundle();
    const results = [];

    for (const pattern of patterns) {
      let value = pattern;
      if (typeof pattern === 'object' && pattern.id) {
        value = await this.formatValue(pattern.id, pattern.args);
      }
      results.push(value);
    }

    return results;
  }

  async translateFragment(element) {
    const elements = this._getElementsToLocalize(element);
    for (const el of elements) {
      await this._localizeElement(el);
    }
  }

  async _localizeElement(element) {
    const l10nId = element.getAttribute('data-l10n-id');
    const l10nArgs = element.getAttribute('data-l10n-args');

    if (l10nId) {
      let args = {};
      if (l10nArgs) {
        try {
          args = JSON.parse(l10nArgs);
        } catch (e) {
          console.warn('Failed to parse l10n args:', l10nArgs);
        }
      }

      const text = await this.formatValue(l10nId, args);
      element.textContent = text;
    }
  }

  _getElementsToLocalize(element) {
    const elements = [];
    const selector = '[data-l10n-id]';
    elements.push(...element.querySelectorAll(selector));
    if (element.matches && element.matches(selector)) {
      elements.push(element);
    }
    return elements;
  }

  connectRoot(element) {
    // Connect a root element for observation
    if (!this._roots) {
      this._roots = new Set();
    }
    this._roots.add(element);
  }

  disconnectRoot(element) {
    // Disconnect a root element from observation
    if (this._roots) {
      this._roots.delete(element);
    }
  }

  async translateRoots() {
    // Translate all connected root elements
    if (!this._roots) return;

    for (const root of this._roots) {
      await this.translateFragment(root);
    }
  }

  async translateElements(elements) {
    // Translate specific elements
    for (const element of elements) {
      await this._localizeElement(element);
    }
  }

  pauseObserving() {
    // Pause observation of DOM changes
    this._observing = false;
  }

  resumeObserving() {
    // Resume observation of DOM changes
    this._observing = true;
  }
}

export function localize(element, l10n) {
  if (l10n && typeof l10n.translateFragment === 'function') {
    return l10n.translateFragment(element);
  }
}

export function isLocalized(element) {
  return element.hasAttribute('data-l10n-id');
}

export class DOMLocalization {
  constructor(resourceIds, generateBundles) {
    this.resourceIds = resourceIds;
    this.generateBundles = generateBundles;
    this._bundles = new Map();
  }

  async addResourceIds(resourceIds) {
    this.resourceIds.push(...resourceIds);
    this._bundles.clear();
  }

  async getBundle(id) {
    if (!this._bundles.has(id)) {
      const bundles = await this.generateBundles(id);
      this._bundles.set(id, bundles);
    }
    return this._bundles.get(id);
  }

  async formatValue(id, args = {}) {
    const bundles = await this.getBundle();
    for (const bundle of bundles) {
      const message = bundle.getMessage(id);
      if (message && message.value) {
        return bundle.formatPattern(message, args);
      }
    }
    return id; // fallback
  }

  async formatMessages(patterns) {
    const bundles = await this.getBundle();
    const results = [];

    for (const pattern of patterns) {
      let value = pattern;
      if (typeof pattern === 'object' && pattern.id) {
        value = await this.formatValue(pattern.id, pattern.args);
      }
      results.push(value);
    }

    return results;
  }

  async translateFragment(element) {
    const elements = this._getElementsToLocalize(element);
    for (const el of elements) {
      await this._localizeElement(el);
    }
  }

  async _localizeElement(element) {
    const l10nId = element.getAttribute('data-l10n-id');
    const l10nArgs = element.getAttribute('data-l10n-args');

    if (l10nId) {
      let args = {};
      if (l10nArgs) {
        try {
          args = JSON.parse(l10nArgs);
        } catch (e) {
          console.warn('Failed to parse l10n args:', l10nArgs);
        }
      }

      const text = await this.formatValue(l10nId, args);
      element.textContent = text;
    }
  }

  _getElementsToLocalize(element) {
    const elements = [];
    const selector = '[data-l10n-id]';
    elements.push(...element.querySelectorAll(selector));
    if (element.matches && element.matches(selector)) {
      elements.push(element);
    }
    return elements;
  }

  connectRoot(element) {
    // Connect a root element for observation
    if (!this._roots) {
      this._roots = new Set();
    }
    this._roots.add(element);
  }

  disconnectRoot(element) {
    // Disconnect a root element from observation
    if (this._roots) {
      this._roots.delete(element);
    }
  }

  async translateRoots() {
    // Translate all connected root elements
    if (!this._roots) return;

    for (const root of this._roots) {
      await this.translateFragment(root);
    }
  }

  async translateElements(elements) {
    // Translate specific elements
    for (const element of elements) {
      await this._localizeElement(element);
    }
  }

  pauseObserving() {
    // Pause observation of DOM changes
    this._observing = false;
  }

  resumeObserving() {
    // Resume observation of DOM changes
    this._observing = true;
  }
}