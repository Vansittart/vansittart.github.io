---
title: Moments Test
published: 2024-04-01
updated: 2024-11-30
description: "Complete guide covering all features and Markdown support in the Fuwari blog template"
image: ""
tags: []
category: moments
draft: false
---

This blog template is built with [Astro](https://astro.build/). For the things that are not mentioned in this guide, you may find the answers in the [Astro Docs](https://docs.astro.build/).

## Front-matter of Posts

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
```

| Attribute     | Description                                                                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`       | The title of the post.                                                                                                                                                                                      |
| `published`   | The date the post was published.                                                                                                                                                                            |
| `updated`     | The date the post was last updated.                                                                                                                                                                         |
| `description` | A short description of the post. Displayed on index page.                                                                                                                                                   |
| `image`       | The cover image path of the post.<br/>1. Start with `http://` or `https://`: Use web image<br/>2. Start with `/`: For image in `public` dir<br/>3. With none of the prefixes: Relative to the markdown file |
| `tags`        | The tags of the post.                                                                                                                                                                                       |
| `category`    | The category of the post.                                                                                                                                                                                   |
| `draft`       | If this post is still a draft, which won't be displayed.                                                                                                                                                     |

## Where to Place the Post Files

Your post files should be placed in `src/content/posts/` directory. You can also create sub-directories to better organize your posts and assets.

```
src/content/posts/
├── post-1.md
└── post-2/
    ├── cover.png
    └── index.md
```

## Basic Markdown Syntax

### Headers

# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header

### Text Formatting

- *Italic text*
- **Bold text**
- ***Bold and italic text***
- ~~Strikethrough~~
- `Inline code`
- [Link to example](https://example.com)
- `![Image alt text](/path/to/image.jpg)` (Example image path)

### Lists

Unordered list:
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

Ordered list:
1. First item
2. Second item
   1. Subitem 1
   2. Subitem 2

### Blockquotes

> This is a blockquote.
> 
> It can span multiple lines.

### Code Blocks

```rust
// This is a code block with syntax highlighting
#[instrument(skip_all, name = "trace_start_server")]
fn main() -> Result<(), ServerError> {
    let rt = match compio::runtime::Runtime::new() {
        Ok(rt) => rt,
        Err(e) => {
            match e.kind() {
                std::io::ErrorKind::OutOfMemory => print_locked_memory_limit_info(),
                std::io::ErrorKind::PermissionDenied => print_io_uring_permission_info(),
                _ => {}
            }
            panic!("Cannot create runtime: {e}");
        }
    };
}
```

```
// Code block without syntax highlighting
console.log("Hello, world!");
```

### Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

### Horizontal Rule

---

### Footnotes

This is a footnote reference[^1].

[^1]: This is the footnote content.

## Extended Markdown Features

### GitHub Repository Cards

You can add dynamic cards that link to GitHub repositories. On page load, the repository information is pulled from the GitHub API.

::github{repo="saicaca/fuwari"}

Create a GitHub repository card with the code `::github{repo="<owner>/<repository>"}`.

### Admonitions

Following types of admonitions are supported: `note` `tip` `important` `warning` `caution`

:::note
Highlights information that users should take into account, even when skimming.
:::

:::tip
Optional information to help a user be more successful.
:::

:::important
Crucial information necessary for users to succeed.
:::

:::warning
Critical content demanding immediate user attention due to potential risks.
:::

:::caution
Negative potential consequences of an action.
:::

#### Custom Titles

The title of the admonition can be customized.

:::note[MY CUSTOM TITLE]
This is a note with a custom title.
:::

Basic syntax:
```markdown
:::note
Highlights information that users should take into account, even when skimming.
:::

:::tip[Custom Title]
This is a tip with a custom title.
:::
```

#### GitHub Syntax

> [!NOTE]
> [The GitHub syntax](https://github.com/orgs/community/discussions/16925) is also supported.

```
> [!NOTE]
> The GitHub syntax is also supported.

> [!TIP]
> The GitHub syntax is also supported.
```

### Spoilers

You can add spoilers to your text. The text also supports **Markdown** syntax.

The content :spoiler[is hidden **ayyy**]!

```markdown
The content :spoiler[is hidden **ayyy**]!
```

## Embedding Media

### Videos

You can embed videos from various platforms like YouTube or Bilibili by copying and pasting the embed code:

#### YouTube

<iframe width="100%" height="468" src="https://www.youtube.com/embed/5gIf0_xpFPI?si=N1WTorLKL0uwLsU_" title="YouTube video player" frameborder="0" allowfullscreen></iframe>

## Draft Posts

You can mark posts as drafts by setting `draft: true` in the frontmatter. Draft posts will not be visible to visitors but can be previewed during development.

When the article is ready for publication, update the "draft" field to "false" in the Frontmatter:

```markdown
---
title: Draft Example
published: 2024-01-11T04:40:26.381Z
tags: [Markdown, Blogging, Demo]
category: Examples
draft: false
---
```