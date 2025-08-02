---
Title: Laravel Blade Components in WordPress
Date: 2024-09-07
Tags: php, wordpress
Excerpt: "Let's admit it: Templating in PHP sucks. And WordPress templates do not create enough of a separation of concerns between reusable components and back-end logic."
---

Let's admit it: Templating in PHP sucks. And WordPress templates do not create enough of a separation of concerns between reusable components and back-end logic.

This gives WordPress and PHP a bad reputation in the front-end community, even though these two technologies bring other advantages that are superior than their competitors.

There are many templating engines for PHP, but the one that comes closest to native web components, and indeed JSX, is [Laravel Blade](https://laravel.com/docs/10.x/blade#anonymous-components).

Now, our team at Travelopia have brought Laravel Blade to WordPress! [https://github.com/Travelopia/wordpress-blade](https://github.com/Travelopia/wordpress-blade) .

**Note:** There are other options like [Sage](https://roots.io/sage/docs/blade-templates/) but they bring over a lot of Laravel components that may not be relevant. We chose to go with the bare minimum for performance, and have a deeper integration with WordPress using hooks.

So we can now create components using XML-like syntax!

```html
<x-accordion>
    <x-accordion.handle>FAQ question?</x-accordion.handle>
    <x-accordion.content>
        <p>FAQ Answer.</p>
    </x-accordion.content>
</x-accordion>
```

This improves readability and also composability. Sub-components are a must-have for front-end development as it solves so many problems around variations of a component.

Consider this problem: You want to have an icon in the accordion handle above. This is perhaps how you would do it with PHP templating:

```php
<?php
my_component(
    'accordion',
    [
        'handle'        => 'FAQ Question?',
        'icon'          => 'plus',
        'icon_position' => 'left',
        'content'       => '<p>FAQ Answer.</p>',
    ]
);
```

With Blade, it's as easy as:

```html
<x-accordion>
    <x-accordion.handle>
        <x-accordion.icon type="plus" />
        FAQ question?
    </x-accordion.handle>
    <x-accordion.content>
        <p>FAQ Answer.</p>
    </x-accordion.content>
</x-accordion>
```

Notice the difference? We are composing the component by **placing a sub-component** where we need it (left or right). And if we don't need it, simply **remove the sub-component**. This is infinitely scalable. We can add any component inside the accordion handle!

Handling JavaScript
-------------------

Well okay, but what about JavaScript? How does that fit in here?

That's up to you! But I've found that Web Components work really well here. Not all components will require JavaScript. What some front-end frameworks call **"Islands of functionality"** or the **"Islands"** architecture.

So the Blade component becomes an abstraction of web components, wherever it is needed. And where it is not needed, it is simply not used. An example from our accordion component above, and shameless plug for our Travelopia [web components](https://github.com/Travelopia/web-components):

```html
<tp-accordion>
    {{ $slot }}
</tp-accordion>

<tp-accordion-handle>
    <button>{{ $slot }}</button>
</tp-accordion-handle>

<tp-accordion-content>
    {{ $slot }}
</tp-accordion-content>
```

Abstraction + Composability + Islands = 🚀
