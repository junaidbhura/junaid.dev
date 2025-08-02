---
Title: "ActivityPub: This ain't it, Chief"
Date: 2023-01-14
Tags: open-source, opinion, web-development
Excerpt: "A critical look at the ActivityPub protocol and its inefficiencies in federated social media."
---

Elon Musk's purchase of Twitter makes no difference to me, but I'm extremely stoked about its unintended side-effect: People considering alternate platforms, and better yet, their own websites to share their thoughts.

The W3C's official protocol for "federated" social media is called [ActivityPub](https://www.w3.org/TR/activitypub/). With the W3C's blessing, it is now an official web protocol, which means that it has widespread adoption.

This means that users on independent websites can now "talk" to each other by sending messages back and forth in a way that those websites can "understand". Hundreds and thousands of these inter-connected websites have now become what is called the [Fediverse](https://en.wikipedia.org/wiki/Fediverse).

Open source platforms like [Mastodon](https://joinmastodon.org/) and other services like [micro.blog](https://micro.blog/) with totally different users can now talk to each other! This sounds pretty awesome. Looks like we've solved social media!

Except we haven't!

The ActivityPub protocol sounds pretty cool, and me being me, I just had to try to come up with my own server built on it. A few sleepless nights later – it finally dawned on me:

**ActivityPub is extremely inefficient, and an invitation for spammers!**

Lets tackle these one by one:

## 1. ActivityPub is inefficient

Lets say you have a blog or a microblog or whatever, and you've decided to make it available to the Fediverse. You start to get popular, and you have a thousand people following you from hundreds of servers.

Its now your job to send every one of those followers an update every single time you write a post. That's right, your poor server has to notify a thousand people that you have made an update!

To make things even more inefficient, each sender has its own SSH key and each message to a receiving inbox has its own unique signature. So your server now has to not only send the message, but process its signature before doing so.

But worst of all is the message is sent to the receiver's inbox directly, not the host. So let's say that a big instance like mastodon.social has a thousand people following you. You make a simple status update like "I ate pie today" and your server has to send a thousand individual messages to mastodon.social's inbox.

This is incredibly inefficient! Each message has to be processed, signed, and sent individually. And this happens for every single post you make.

## 2. ActivityPub is an invitation for spammers

The second major issue is that ActivityPub makes it very easy for spammers to abuse the system. Since each server can send messages to any other server's inbox, spammers can easily create fake accounts and send spam to thousands of users across the Fediverse.

There's no centralized authority to prevent this, and each server has to implement its own spam prevention measures. This creates a massive attack surface for spammers.

## The solution?

I believe the solution lies in a more efficient, pull-based approach rather than the current push-based system. Instead of sending individual messages to each follower, servers should implement a more efficient notification system.

But that's a topic for another post. For now, I remain skeptical about ActivityPub's ability to scale effectively for a truly decentralized social web. 