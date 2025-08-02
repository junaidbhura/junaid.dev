---
Title: "WordPress: How to create image sizes dynamically on the fly"
Date: 2015-10-01
Tags: open-source, wordpress
Excerpt: "WordPress is awesome. But like any system, it's not great at everything. One of those things is media image size management, where it just doesn't work well."
---

WordPress is awesome. But like any system, it's not great at everything. One of those things is media image size management, where it just doesn't work well.

### The Problems:

WordPress uses something called "Thumbnail Image Sizes" to maintain different versions of your images in different image sizes. You define these image sizes under *Settings -> Media* and some custom ones in your theme, as needed.

When you upload an image in your WordPress admin, WordPress automatically generates the thumbnails as soon as the image is uploaded. This causes the following issues:

1. The image sizes are created forever when you upload an image. In your development process, if you realize that you want to change an image size after thousands of images have been uploaded, the default way is to upload all those images all over again. Fortunately, there are plugins which automatically regenerate thumbnails, but it's still a hassle.
2. If you have 20 custom image sizes (maybe 2x, 3x for responsive images), and upload an image in the WordPress admin, it creates 20 thumbnail versions based on the sizes you defined in `add_image_size()`, even though you might only need one. That means 19 thumbnails in this example would go for a waste. Imagine if you have thousands of images where 19 image thumbnails are created as a waste! This increases the size of the media library unnecessarily.

### Solutions:

The solution for changing image sizes as mentioned above, would be to use a plugin to automatically regenerate thumbnails either individually or for all your images. The [Regenerate Thumbnails](https://wordpress.org/plugins/regenerate-thumbnails/) plugin does a great job of this. But this has to be manually done, and isn't the optimal solution.

Unfortunately, there is no solution for the fact that there will be additional unnecessary images created with the `add_image_size()` method.

### Using the Fly Dynamic Image Resizer:

I was so frustrated with this problem, that I decided to build my **own plugin**. Introducing: [Fly Dynamic Image Resizer](https://wordpress.org/plugins/fly-dynamic-image-resizer/) for WordPress! If you want to contribute to this plugin, you can do so on [Github](https://github.com/junaidbhura/fly-dynamic-image-resizer).

#### How this plugin works:

- You can define image sizes in your theme, or just directly add the image sizes in your code
- When a user visits a page for the **first time** and comes across a dynamic image, the dynamic image thumbnail is created and stored under /wp-content/uploads/fly-images/{image_id}/{image_size}
- When users visit the page the **next time onwards**, they are served the newly created image
- If you want to delete all the cached / stored image sizes, you can do so under Tools -> Fly Images
- If you want to delete only a single image's cached / stored image sizes, you can do so in the media library

#### **Defining dynamic image sizes in your theme**

You can add as many image sizes in your theme's functions.php file like so:

```php
if ( function_exists( 'fly_add_image_size' ) ) {
    fly_add_image_size( 'home_page_square', 500, 500, true );
    fly_add_image_size( 'home_page_square_2x', 1000, 1000, true );
}
```

Explanation of parameters:

1. The first is the name of the size
2. The width
3. The height
4. Whether you want to crop this image from the center

#### Method 1: Using pre-defined image sizes

If you've defined image sizes using the method above, you get an image like so:

`fly_get_attachment_image( $attachment_id, 'your_image_size' );`

So, using the example of image sizes declared above, your code would look like:

```php
echo fly_get_attachment_image( get_post_thumbnail_id(), 'home_page_square' );
```

This would return a HTML image string. If you want the image as an array, you can use:

```php
$image = fly_get_attachment_image_src( get_post_thumbnail_id(), 'home_page_square' );
```

#### Method 2: Using explicit image sizes

If you don't want to declare any image sizes, and just want a dynamically generated image size, you can directly enter the image dimensions in the code like so:

`fly_get_attachment_image( $attachment_id, array( $width, $height ), $crop );`

So, if you want to get an image size of your own dimensions, your code would look like:

```php
echo fly_get_attachment_image( get_post_thumbnail_id(), array( 500, 500 ), true );
```

This would return a HTML image string. If you want the image as an array, you can use:

```php
$image = fly_get_attachment_image_src( get_post_thumbnail_id(), array( 500, 500 ), true );
```

#### Using custom image attributes

The image HTML that this plugin returns uses the attributes like "alt" from the media library. If you want to use your own, you can do it like so:

```php
echo fly_get_attachment_image( get_post_thumbnail_id(), 'home_page_square', null, array( 'alt' => 'My custom alt value!' ) );
```

I hope this helps you in building your theme optimally 🙂 