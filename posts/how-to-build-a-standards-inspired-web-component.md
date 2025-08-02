---
Title: "How to build a standards-inspired Web Component"
Date: 2023-03-26
Tags: javascript, web-components
Excerpt: "Web Components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps."
---

Now that we're all using Web Components in production 🚀

![We're all using Web Components in production, right?](/posts/7fun30.webp)

Let's talk about how we can build components that can harness their **full potential** by being true to their **conceptual philosophy**.

## More power to you

[The Web Components Specification](https://developer.mozilla.org/en-US/docs/Web/Web_Components) essentially exposes to us, the developers, the underlying APIs that power **native HTML components** that browsers have implemented.

In simpler words, there is a [HTML specification](https://html.spec.whatwg.org/) which outlines HTML tags. Browser vendors like Google Chrome, Apple Safari, Mozilla Firefox, etc. read this specification and implement what they think these tags should look like, and how they should work.

This is why input tags, date pickers, file uploads, select tags sort of work in a similar way across browsers, but they don't always look and function exactly the same. This is because the browser vendors have **interpreted the HTML specification** in their own way.

And now with the [Custom Elements Specification](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) – you now have the full control of not only coming up with your own HTML tags, but deciding how they should work!

## The philosophy

So now that we see that Custom Web Components are nothing but a custom HTML specification which we control, we can conclude that the design patterns that should guide us – should be the time-tested, battle-hardened and muscle-memory evoking patterns of the original HTML specification.

Or you could conclude something else, it's totally up to you! 😉

But we are going to conclude the former for this article. Let's look at the `SELECT` tag, since it will help us determine what nested components could look like: [https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element)

We can see that the specification outlines the following:

1. The tag
2. It's attributes
3. What a browser should do when the user interacts with it

But the big takeaway for this article is the way it handles children:

Looking at the specification, we can ascertain the following rules which can help guide what we build:

1. A web component is granular, and performs **a single purpose**
2. A web component **has attributes**, which maintains its variations, value and state
3. A web component may have **child web components**, who also have their own value, state and variations – and may influence the value of their parent
4. A web component is **self-contained** and exposes attributes, methods and events – which is the only way for the outside world to communicate with it
5. A web component **triggers events** when any of its attributes change, or as needed

## Let's build a custom "Toggle Buttons" Web Component

**TLDR:** You can see the final Gist here: [https://gist.github.com/junaidbhura/5e03947f68666417ab9930d6c7d49cb1](https://gist.github.com/junaidbhura/5e03947f68666417ab9930d6c7d49cb1)

Now that we have the rules above to guide us, let's build a simple "Toggle Buttons" component. I'll be leaving out code that is not relevant to this article like code related accessibility or design polish, for the sake of being on point. I'll also only be focusing on the Custom Elements specification, and be leaving out things like Shadow DOM.

### The markup

```html
<jb-toggle-buttons value="">
    <jb-toggle-button value="button-1"><button>Button 1</button></jb-toggle-button>
    <jb-toggle-button value="button-2"><button>Button 2</button></jb-toggle-button>
    <jb-toggle-button value="button-3"><button>Button 3</button></jb-toggle-button>
</jb-toggle-buttons>
```

### The JavaScript

Let's hook this up via JavaScript:

#### Attributes go first

It's important to start with attributes first, because we should be able **control our component via attributes** and properties alone!

```javascript
/**
 * ToggleButtons Class.
 */
class ToggleButtons extends HTMLElement {
    /**
     * Constructor.
     */
    constructor() {
        super();

        this.buttons = this.querySelectorAll( 'jb-toggle-button' );
    }

    /**
     * Observe Attributes.
     *
     * @return {string[]} Attributes to be observed.
     */
    static get observedAttributes() {
        return [ 'value' ];
    }

    /**
     * Get value.
     *
     * @return {string} Value.
     */
    get value() {
        return this.getAttribute( 'value' ) ?? '';
    }

    /**
     * Set value.
     *
     * @param {String} value Value.
     */
    set value( value ) {
        this.setAttribute( 'value', value );
    }

    /**
     * Attribute changed callback.
     *
     * @param {string} name     Attribute Name.
     * @param {string} oldValue Attribute's Old Value.
     * @param {string} newValue Attribute's New Value.
     */
    attributeChangedCallback( name, oldValue, newValue ) {
        if ( ! this.buttons ) {
            return;
        }

        this.buttons.forEach( ( button ) => button.removeAttribute( 'selected' ) );

        if ( '' !== newValue ) {
            this.buttons.forEach( ( button ) => {
                if ( newValue === button.getAttribute( 'value' ) ) {
                    button.setAttribute( 'selected', 'selected' );
                }
            } );
        }
    }
}

/**
 * Initialize.
 */
customElements.define( 'jb-toggle-buttons', ToggleButtons );
```

```javascript
/**
 * ToggleButton Class.
 */
class ToggleButton extends HTMLElement {
    /**
     * Constructor.
     */
    constructor() {
        super();

        // TODO: Add event listener.
    }
}

/**
 * Initialize.
 */
customElements.define( 'jb-toggle-button', ToggleButton );
```

Now we can actually control the component directly from our inspector, and we get reactivity for free! 💪

![Added click event to the web component](/posts/control-web-component.webp)

#### Events go last

The reason events go last is because we want to **control our component via attributes** and properties. Events must only manipulate attributes, inform the outside world, **and do nothing else**!

This is where a lot of developers get confused. Particularly React developers who are used to having event handlers outside the component. **This is not** how native web components work.

Let's update our individual toggle button to include the click event:

```javascript
/**
 * ToggleButton Class.
 */
class ToggleButton extends HTMLElement {
    /**
     * Constructor.
     */
    constructor() {
        super();

        this.button = this.querySelector( 'button' );
        if ( this.button ) {
            this.button.addEventListener( 'click', this.updateParentValue.bind( this ) );
        }
    }

    /**
     * Update parent value.
     */
    updateParentValue() {
        // Set parent's value to be this button's value.
        this.parentNode.value = this.getAttribute( 'value' );
    }
}

/**
 * Initialize.
 */
customElements.define( 'jb-toggle-button', ToggleButton );
```

We can now click the buttons, which literally just set the value of the parent container, exactly as we were doing directly in the inspector previously:

![Added click event to the web component](/posts/added-click-event.webp)

---

Web components provide us with a lot of power to build our own custom elements. Although this article tries to lay down some rules to help us make scalable user interfaces, there is no right or wrong way to work with web components – and it ultimately comes down to the problem you're trying to solve. 
