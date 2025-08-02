---
Title: "What we really need is a CDN that deploys to ALL edge nodes"
Date: 2023-07-30
Tags: architecture, web-development
Excerpt: "If you are a CDN provider reading this, and want to blow the competition out of the water, please give us this functionality"
---

## How traditional CDNs work currently

CDNs ([Content Delivery Networks](https://en.wikipedia.org/wiki/Content_delivery_network)) help deliver a web resource better by storing a cached version of it closer to the user.

So if I ask for a web page from Australia, a CDN would first check to see if there's a cached version of that page in Australia – and if so – share that with me.

If it doesn't find one, depending on the CDN, it would:

1. Look for a copy of it on the way to the origin server – and if found – turn around with that copy, save it in Australia, and give me the page
2. Go to a CDN ["shield node"](https://docs.fastly.com/en/guides/shielding) and retrieve it
3. Go straight to the origin server and retrieve it

![Shut up and take my money!](/posts/shield-flow.webp)
_Image from Fastly’s shielding page_

## Static edge deployment

On the other hand, Statically Generated (SSG) Sites often get deployed directly to **all nodes on the edge**. For example with Vercel's [NextJS](https://nextjs.org/) and [Netlify](https://www.netlify.com/) to name a few.

So if I ask for a web page from Australia, it would:

1. Look for that page in Australia
2. If it doesn't find it, look for it somewhere else
3. If it still doesn't find it, give me a 404

So it never goes to any server, since it is a static site.

## Vercel's Incremental Static Regeneration ✨

With [Incremental Static Regeneration](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration) (ISR), one can set an expiry time on the pages. When the expiry time has been reached, it automagically goes to the server in the background and asks for the new page, whilst any users that are currently asking for the page will be served a **stale** page.

So the user is **always served a fast cached page** 🚀

## The CDN Holy Grail – or – what we actually need!

If you are a CDN provider reading this, and want to blow the competition out of the water, please give us the following functionality:

1. When a page is requested for the **first time**, **deploy it everywhere** – to all nodes – all over the world
2. Even better, allow a **sitemap** to the submitted with a list of all URLs to be crawled periodically
3. When the page **expires**, or when a **single purge** request is received – do a **soft purge** by default, and mark that resource as stale. Then, **automatically** ping the server for that resource without it being explicitly requested, while serving the stale resource temporarily. Once the new resource has been received – deploy it to all nodes all over the world
4. When a **mass purge** request is received – do the same as above, and allow the frequency and timeouts to be configurable
5. When a **delete** request is received – delete the resource from all nodes all over the world

![Shut up and take my money!](/posts/shut-up-and-take-my-money.webp) 
