{{
  class ST {
    in() {
      this.#stack.unshift(new Map);
    }
    out() {
      this.#stack.shift();
    }

    set(key, value) {
      this.#stack[0].set(key, value);
    }
    has(key) {
      for (const table of this.#stack)
        if (table.has(key)) return true;
      return false;
    }
    get(key) {
      for (const table of this.#stack)
        if (table.has(key)) return table.get(key);
      return undefined;
    }

    toString(indent) {
      return this.#stack.toReversed()
        .map((element, index) => Array.from(element.keys())
          .map(element => `${" ".repeat(indent * index)}${element}`)
          .join("\n")
        )
        .join("\n");
    }

    #stack = [new Map];
  }
}}

m_si // "scope in"
  = "" {scope.in()}
m_so // "scope out"
  = "" {scope.out()}
