---
Title: "How to extend blocks in the Gutenberg editor on WordPress"
Date: 2019-08-17
Tags: block-editor, gutenberg, wordpress
Excerpt: "This post assumes that you already know how to work with JavaScript ES6 and have some experience in working with and setting up custom blocks on WordPress using Webpack."
---

#### **Important:**

This post assumes that you **already know** how to work with **JavaScript ES6** and have some experience in working with and setting up **custom blocks** on WordPress using **Webpack**.

## Gutenberg Blocks

With the introduction of **WordPress 5**, we now have a new powerful tool at our disposal: **Blocks**. Blocks let us build custom experiences in the WordPress editor, making it easier for content managers to write and maintain content on the website.

But there's one big caveat though: They're built using **JavaScript**. WordPress developers, who have strong PHP knowledge might find it a little difficult to transition if they are not familiar with JavaScript – and might reach out to tools like [ACF Blocks](https://www.advancedcustomfields.com/resources/blocks/). Although tools like this are useful in the **short-term**, you will pretty much **have to** learn things like **React**, if you really want deep control over the editor, and understand topics like the one discussed in this post.

My advice: **Bite the bullet, spend some time and learn JavaScript. **It's totally worth it.

## Block Filters

As with everything WordPress, blocks in JavaScript have filters too! We are going to be discussing them, **by example**, in this post:

## Example: How to use block filters to add "Open in a new tab" to core buttons

Let me first show you the full source code – and then break it down below:

### Explanation

#### 1. The `blocks.registerBlockType` filter

We use this filter to look for a `core/button` block and use the spread operator to add an attribute "target":

```json
target: {
 type: 'string',
 default: '',
 source: 'attribute',
 attribute: 'target',
 selector: 'a',
},
```

#### 2. The `editor.BlockEdit` filter

We then use this filter to add a new panel with a `ToggleControl` control to work with the attribute "target" defined above. So you have a nice little toggle control in the editor to turn it off or on. If it's on, we set the value "_blank" to the attribute, if not, we set an empty value.

#### 3. The `blocks.getSaveElement` filter

This filter allows us to control the markup of the element **before** it's saved. The markup, in turn, is controlled via a JavaScript object. We check if the attribute "target" has the value "_blank", and if so – we set that to the element.

Notice we also set the value `noreferrer noopener` to the "rel" attribute. We do this to avoid an error in the editor, which specifically looks for this value for all links which have a target value set to "_blank".

**Caveat:** Although the whole point of this filter is to modify the element, you... *can't modify it*... directly? Which is why we use the `cloneElement` function, which essentially allows you to clone the original object and modify *it* instead.

## Conclusion

I appreciate that this is a lot to take in if you're just starting off, so I'd recommend doing a bit more reading in order to fully get a grasp of this. You can also use this same method to extend not only any **core block**, but any **block at all**!

—

Happy coding! 🙂 