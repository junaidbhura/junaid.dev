---
Title: "WordPress Plugin authors: Please use the platform's patterns"
Date: 2024-04-07
Tags: architecture, open-source, wordpress
Excerpt: "An appeal to WordPress plugin authors to use platform patterns and avoid passing on their complexity on to their consumers."
---

As a plugin author contributing to an Open Source plugin, one needs to take care of the following:

1. Making their code easy to understand and contribute to, even by new engineers. This means not over-engineering your own code
2. Providing a layer of abstraction away from their code so their plugin can be consumed easily
3. Using the platform's patterns (in this case WordPress) to provide a consistent experience for the plugin's consumers

One of the things that makes WordPress an accessible (and I would argue scalable) platform for engineers of all skill levels is the consistency in patterns, and overall dead-simple (sometimes overly so) code.

---

## Problem 1: Plugin authors forcing patterns on to consumers

Every engineering team has their own way of working, and patterns that they use. Some teams are large, some may prefer to use Object Oriented Programming, some may prefer to use functional programming, some are novice programmers who just want to chuck some code into good old `functions.php`

Here's an example from one of my favourite plugins: [Stream](https://wordpress.org/plugins/stream/)

In order to create a custom log within Stream, you would need to create a "connector", something like so:

```php
/**
 * Class Connector_My_Post.
 */
class Connector_My_Post extends Connector {

    /**
     * Connector slug.
     *
     * @var string Connector slug.
     */
    public $name = 'my_connector_name';

    /**
     * Actions registered for this connector.
     *
     * @var array List of WordPress actions.
     */
    public $actions = [
        'save_post',
    ];

    /**
     * Connector label.
     *
     * @return string
     */
    public function get_label(): string {
        return esc_html__( 'My Post', 'ex' );
    }

    /**
     * Get connector action labels.
     *
     * @return array
     */
    public function get_action_labels(): array {
        return [
            'save_my_meta_fail' => 'Failed to Save My Meta',
        ];
    }

    /**
     * Get connector context labels.
     *
     * @return array
     */
    public function get_context_labels(): array {
        return [];
    }

    /**
     * Add action links to Stream drop row in admin list screen.
     *
     * @param array  $links  Previous links registered.
     * @param object $record Stream record.
     *
     * @filter wp_stream_action_links_{connector}
     *
     * @return array
     */
    public function action_links( $links, $record ): array {
        $post = get_post( $record->object_id );

        if ( ! $post instanceof WP_Post ) {
            return $links;
        }

        if ( 'save_my_meta_fail' === $record->action ) {
            $links[ esc_html__( 'Edit', 'ex' ) ]   = get_edit_post_link( $post->ID );
        }

        return $links;
    }

    /**
     * Log post data changes.
     *
     * @param int    $post_id Post ID.
     * @param string $message Message.
     *
     * @return void
     */
    public function callback_update_meta_failed( int $post_id = 0, string $message = '' ): void {
        $this->log( $message, [], $post_id, null, 'save_my_meta_fail' );
    }
}
```

### Why is this bad?

1. The plugin author is passing on the complexity of their own code on to consumers (engineers)
2. Using a class in this case may create complexity in the consumers code, which may or may not exist on the plugin author's code
3. This is the only way to interface with the plugin

### How can this be done using WordPress patterns?

```php
// Register connector.
stream_register_connector(
    [
        'name'           => 'my_connector_name',
        'action_labels'  => array(
            'save_my_meta_fail' => 'Failed to Save My Meta',
        ),
        'context_labels' => array(
            'fail' => 'Failed',
        ),
    ]
);

// Create a new function - so the consumer can use it whenever, wherever!
stream_log( 'save_my_meta_fail', $post, [ 'additional' => 'context' ] );
```

That's it! Now the consumer is free to use this however they like!

1. `stream_register_connector` is like `register_post_type` and other similar WordPress functions
2. Notice how the consumer is not tied to any hook, and can freely use a new `stream_log` function wherever they please.
   - Don't have a custom hook, or don't want to create one for a reason unknown to the plugin author? No worries!

## Problem 2: Plugins don't have enough hooks

When plugin authors rely on OOP-first (Object Oriented Programming) rather than a Hooks-first approach, **hooks become an afterthought**, and can therefore be forgotten, or sometimes not possible.

Here are some potential ways plugin authors can help mitigate this problem:

1. Think about hooks (and therefore your consumers) **first**
2. Create the hooks first, and make your plugin work **only via these hooks** – so that your plugin becomes the best consumer of these hooks
3. Once the hooks are in place, you and your organisation are free to use any pattern you like behind the scenes in your own code – and your consumers are free to do the same

This way, you are not forcing consumers to inherit your complexity – and in fact – can take more risks in your code and change patterns in your own code more safely in the future – as long as the hooks remain the same. 
