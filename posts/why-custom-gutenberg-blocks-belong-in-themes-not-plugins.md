---
Title: "Why custom Gutenberg blocks belong in themes, not plugins"
Date: 2021-07-03
Tags: block-editor, opinion, wordpress
Excerpt: "Let me start off by prefacing that this blog post is specifically about custom blocks developed for completely custom designed websites."
---

Let me start off by prefacing that this blog post is specifically about *custom blocks* developed for completely *custom designed website*s. Not blocks built for general-purpose, third-party or off-the-shelf use, which obviously belong in plugins, since they can be distributed and consumed as such.

This post is aimed at developers who build custom block-based WordPress websites. I think there is a bit of confusion amongst developers who take the advice of placing blocks within plugins.

There are a few reasons why people advise placing blocks in plugins. Let's examine them one by one, and why they sound good in theory – but are generally ill advised in the context of *custom-built* websites.

**1. Blocks in plugins make the website future-proof**

The argument here is that if the websites changes themes at a certain point, the blocks would continue to work.

Although this sounds like a good idea, in practice though, it is often the case that if a website with a *custom-built* theme ever changes its theme, there is a very high probability it is because the *entire design has changed*. Since blocks contain markup, this means that the blocks would need to change too, and perhaps some sort of migration of data would occur. Especially for those really complicated blocks.

What's worse, blocks depend on CSS which often live in themes. So any refactoring becomes slightly more complicated.

**2. Blocks in plugins are more portable and can be shared between websites**

This is where things start to get funky. All WordPress core blocks have very minimal styling and totally expect to be overridden by themes. Blocks that come bundled in plugins should also ideally follow this pattern, where blocks come with very minimal styling with the intention to be changed.

However, if we're talking about custom blocks for a custom website, the only reasons it would make sense for blocks to be shared between websites is if:

1. We expect the block's markup to be exactly the same on all websites, since they cannot be changed
2. All the websites have similar designs, perhaps because they are part of a network of sites

**3. Building a block library to build sites faster**

This is sort of similar to the point above, but I thought this deserved its own elaboration. If you own a business, the prospect of having a block library to just put a site together for a client quickly with a bunch of pre-built blocks may sound great. And if done well, this is actually possible. However, all the websites that you build would look sort of similar. And it might actually be better for you to have a common parent theme, rather than a custom plugin in most cases.

And what happens when you update the plugin? It needs to be rolled out to several sites which may or may not be ready for the update.

A better approach would be to create boilerplates for blocks, which can be customised for each site that they are used on. And general-purpose components (shameless plug for [Gumponents](https://github.com/junaidbhura/gumponents)) that assist in building blocks faster, rather than fully-built blocks.

---

What do you think? Is there a good reason for placing custom Gutenberg blocks in plugins rather than in themes? 