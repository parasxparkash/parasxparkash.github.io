# Paras Parkash - Portfolio Website

A modern, responsive portfolio website built with Jekyll and GitHub Pages, featuring a blog system and mathematical notes with LaTeX support.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Blog System**: Write and publish blog posts in Markdown
- **Notes System**: Mathematical notes with LaTeX rendering via MathJax
- **Dynamic Content**: Automatically generated from Jekyll collections
- **Mobile Navigation**: Hamburger menu with touch gestures
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **GitHub Pages Ready**: Deploy automatically with GitHub Pages

## 🛠️ Tech Stack

- **Jekyll**: Static site generator
- **Tailwind CSS**: Utility-first CSS framework
- **MathJax**: LaTeX rendering for mathematical content
- **GitHub Pages**: Free hosting and automatic deployment
- **Liquid**: Templating language for dynamic content

## 📁 Project Structure

```
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page layouts
│   ├── default.html     # Base layout
│   ├── post.html        # Blog post layout
│   └── note.html        # Mathematical notes layout
├── _includes/           # Reusable components
│   ├── head-custom.html # Custom head content
│   └── scripts.html     # JavaScript
├── _posts/             # Blog posts
├── _notes/             # Mathematical notes
├── assets/             # Static assets
├── index.html          # Homepage
├── Gemfile             # Ruby dependencies
└── README.md           # This file
```

## 🏃‍♂️ Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/parasparkash/parasparkash.github.io.git
   cd parasparkash.github.io
   ```

2. **Install Ruby and Bundler** (if not already installed)
   ```bash
   # On macOS with Homebrew
   brew install ruby
   gem install bundler
   
   # On Ubuntu/Debian
   sudo apt-get install ruby-full build-essential zlib1g-dev
   gem install bundler
   ```

3. **Install dependencies**
   ```bash
   bundle install
   ```

4. **Run the development server**
   ```bash
   bundle exec jekyll serve
   ```

5. **Open your browser** to `http://localhost:4000`

### GitHub Pages Deployment

1. **Create a GitHub repository** named `username.github.io` (replace `username` with your GitHub username)

2. **Push your code**
   ```bash
   git add .
   git commit -m "Initial Jekyll setup"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select source: "Deploy from a branch"
   - Choose branch: `main`
   - Click Save

4. **Access your site** at `https://username.github.io`

## ✍️ Content Management

### Adding Blog Posts

Create a new file in `_posts/` with the format `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "Your Blog Post Title"
date: 2024-01-15
categories: [blog, development]
tags: [react, javascript, tutorial]
author: Paras Parkash
reading_time: 5
description: "A brief description of your post"
---

Your blog content here in Markdown...
```

### Adding Mathematical Notes

Create a new file in `_notes/` with any name ending in `.md`:

```markdown
---
layout: note
title: "Linear Algebra"
tags: [mathematics, linear-algebra, vectors]
category: mathematics
mathjax: true
---

# Linear Algebra

Vector spaces and linear transformations...

## Definitions

A **vector space** $V$ over field $F$ satisfies:
$$\forall u, v \in V, \alpha \in F: \alpha(u + v) = \alpha u + \alpha v$$

More content with LaTeX formulas...
```

### Customizing Content

1. **Update site information** in `_config.yml`
2. **Modify social links** in `index.html`
3. **Add your profile image** by updating the image URL in `index.html`
4. **Customize colors and styling** in `_includes/head-custom.html`

## 🎨 Customization

### Changing Colors

Edit the CSS custom properties in `_includes/head-custom.html`:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### Adding New Sections

1. Create a new tab button in `index.html`
2. Add corresponding tab content div
3. Update the JavaScript `showTab()` function if needed

### Custom Layouts

Create new layouts in `_layouts/` directory following Jekyll conventions.

## 📱 Mobile Features

- **Hamburger Menu**: Tap to open/close sidebar
- **Touch Gestures**: Swipe right to open, swipe left to close menu
- **Responsive Design**: Adapts to all screen sizes
- **Touch-Friendly**: 44px minimum touch targets

## 🔧 Configuration

Key configuration options in `_config.yml`:

```yaml
title: Your Name
email: your.email@example.com
description: Your description
url: "https://username.github.io"

author:
  name: Your Name
  email: your.email@example.com
  location: Your City, Country
  github: username
  linkedin: username
  twitter: username

mathjax: true  # Enable LaTeX rendering
```

## 📚 Adding Content

### Blog Categories
- `blog`: General blog posts
- `development`: Technical development posts
- `tutorial`: Step-by-step guides

### Note Categories
- `mathematics`: Mathematical content
- `finance`: Financial mathematics
- `computer-science`: CS topics

### Tags
Use relevant tags to organize content and enable filtering.

## 🚀 Performance

- **Static Generation**: Fast loading times
- **Optimized Images**: Responsive image loading
- **Minimal JavaScript**: Only essential functionality
- **CDN Delivery**: Served via GitHub's CDN

## 🔒 SEO Features

- Meta tags for social sharing
- Structured data markup
- XML sitemap generation
- Semantic HTML structure
- Fast loading performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [GitHub Issues](https://github.com/parasparkash/parasparkash.github.io/issues)
2. Review the [Jekyll Documentation](https://jekyllrb.com/docs/)
3. Check [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 🙏 Acknowledgments

- **Jekyll** for the static site generator
- **Tailwind CSS** for the utility-first CSS framework
- **MathJax** for LaTeX rendering
- **GitHub Pages** for free hosting

---

Made with ❤️ and ☕ by [Paras Parkash](https://github.com/parasparkash)
# Build test - Friday 29 August 2025 07:20:46 AM IST
