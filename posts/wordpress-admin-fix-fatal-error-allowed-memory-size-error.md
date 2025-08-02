---
Title: "WordPress Admin: How to Fix the 'Fatal Error: Allowed Memory Size...' Error"
Date: 2016-09-23
Tags: wordpress
Excerpt: "If you've been working on a complex WordPress site with a lot of custom fields, perhaps with the Advanced Custom Fields (ACF) plugin – chances are you've come across this error."
---

### The Problem

If you've been working on a complex WordPress site with a lot of custom fields, perhaps with the **Advanced Custom Fields (ACF)** plugin – chances are you've come across this error when you try to access your post type in the WordPress admin:

`"Fatal error: Allowed memory size of xxx bytes exhausted (tried to allocate 64 bytes) in /xxx/wp-includes/wp-db.php on line xxx"`

### The Cause

The cause of this problem is that WordPress tries to **preload the posts' meta** saved in the **postmeta** table for all the posts which are currently being displayed in the admin.

This helps improve performance for smaller sites or sites which don't use a lot of custom post meta / fields. But this is disastrous for sites which heavily rely on custom fields.

### The Solution

Fortunately, WordPress provides a hook which lets us control this. **Just add this into your functions.php file** and watch your troubles go away!

```php
/**
 * Disable Posts' meta from being preloaded.
 * This fixes memory problems in the WordPress Admin.
 */
function jb_pre_get_posts( WP_Query $wp_query ) {
    if ( in_array( $wp_query->get( 'post_type' ), array( 'my_post_type_1', 'my_post_type_2' ) ) ) {
        $wp_query->set( 'update_post_meta_cache', false );
    }
}

// Only do this for admin.
if ( is_admin() ) {
    add_action( 'pre_get_posts', 'jb_pre_get_posts' );
}
```

### Explanation

This is what the code above does:

1. It checks if it is the WordPress admin – If you want this to also happen on the front-end, you can go ahead and remove that condition
2. It hooks on to the WordPress **pre_get_posts** action
3. We only do this for certain post types. If you want this to happen for all post types, you can go ahead and remove that condition
4. We set the **update_post_meta_cache** property to false, which forces WordPress to **not load the post meta** – which is what saves us all that memory!

—

Hope this was helpful! 🙂 