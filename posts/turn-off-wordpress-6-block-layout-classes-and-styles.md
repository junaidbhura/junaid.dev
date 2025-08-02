---
Title: "Turn off WordPress 6 block layout classes and styles"
Date: 2022-07-08
Tags: block-editor, gutenberg, wordpress
Excerpt: "I actually can't believe this feature was shipped in WordPress core. To be fair, it is marked as 'experimental'. But I've encountered problems on a couple of sites already."
---

I actually can't believe this feature was shipped in WordPress core. To be fair, it is marked as "experimental". But I've encountered problems on a couple of sites already.

Anyway, here's a suggestion for a much better implementation (in my opinion):

```php
<?php
// This returns the site back to normal.
remove_filter( 'render_block', 'wp_render_layout_support_flag' );

// Add alignment classes instead.
// Support the new layout features using classes.
add_filter( 'render_block', 'jb_add_alignment_classes', 10, 2 );

/**
 * Add alignment classes to blocks.
 *
 * @param string|null $block_content Original block content.
 * @param array       $block Block data.
 *
 * @return string|null
 */
function jb_add_alignment_classes( ?string $block_content = '', array $block = [] ): ?string {
    // Check for block name.
    if ( empty( $block['blockName'] ) ) {
        return $block_content;
    }

    // Build classes.
    $classes = [];
    if ( ! empty( $block['attrs']['layout']['type'] ) ) {
        $classes = [
            'wp-block--display-' . $block['attrs']['layout']['type'],
        ];

        if ( ! empty( $block['attrs']['layout']['justifyContent'] ) ) {
            $classes[] = 'wp-block--justify-content-' . $block['attrs']['layout']['justifyContent'];
        }

        if ( ! empty( $block['attrs']['layout']['verticalAlignment'] ) ) {
            $classes[] = 'wp-block--vertical-alignment-' . $block['attrs']['layout']['verticalAlignment'];
        }
    }

    // Check for classes.
    if ( empty( $classes ) ) {
        return $block_content;
    }

    // Add classes to block content.
    // You may have to update this to suit your needs.
    $block_content = str_replace(
        'class="wp-block-',
        sprintf(
            'class="%s wp-block-',
            implode( ' ', $classes ),
        ),
        $block_content
    );

    // Return updated content.
    return $block_content;
}
```

And the (S)CSS:

```scss
.wp-block--display-flex {
    display: flex;
}

.wp-block--justify-content {

    &-center {
        justify-content: center;
    }

    &-left {
        justify-content: start;
    }

    &-right {
        justify-content: flex-end;
    }
}

.wp-block--vertical-alignment {

    &-top {
        align-items: start;
    }

    &-middle {
        align-items: center;
    }

    &-bottom {
        align-items: flex-end;
    }
}
``` 
