---
Title: "Using Composer to manage WordPress dependencies"
Date: 2018-07-03
Tags: architecture, open-source, wordpress
Excerpt: "Package managers help managing dependencies in a project, and have become indispensable tools in modern web development."
---

Package managers help managing dependencies in a project, and have become indispensable tools in modern web development. Mature languages have their own package managers, and PHP is no exception with Composer.

Developers complain about how WordPress lags behind in this regard – with a lack of an official way of working with Composer. But what WordPress may lack in features – it makes up for in a super smart community.

Tools like [Bedrock](https://github.com/roots/bedrock) by Roots allow us to architect our sites and use any **public** WordPress plugin in the WordPress plugin repository using [WPackagist](https://wpackagist.org/).

However, support for Composer for "Pro" or **paid** plugins is still in its early days. Plugins like Yoast already support Composer, but everyone seems to have their own implementation.

To solve this problem, I have come up with a solution which works with the following plugins: [https://packagist.org/packages/junaidbhura/composer-wp-pro-plugins](https://packagist.org/packages/junaidbhura/composer-wp-pro-plugins)

This Composer plugin allows you to add license keys for the following plugins in your `.env` file or environment variable within your CI environment:

1. Advanced Custom Fields Pro
2. Polylang Pro
3. WP All Import Pro (and all add-ons)
4. WP All Export Pro (and all add-ons)
5. Gravity Forms

So no more committing plugin files within your repository! 🎉