const fs = require('fs');
const ejs = require('ejs');

let index_template = fs.readFileSync('views/index.ejs', 'utf8')
let blog_template= fs.readFileSync('views/blog.ejs', 'utf8');
let about_template = fs.readFileSync('views/about.ejs', 'utf8')
let blogs = JSON.parse(fs.readFileSync('data/content.json', 'utf8'));

let blogTitles = [];

for (blog of blogs) {
  blogTitles.push(blog.trickname)
}

let index_html = ejs.render(index_template, {
  filename: __dirname + '/views/blog.ejs',
  blogTitles: blogTitles
});

fs.writeFileSync('build/index.html', index_html, 'utf8');

let about_html = ejs.render(about_template, {
  filename: __dirname + '/views/blog.ejs',
  blogTitles: blogTitles
});

fs.writeFileSync('build/about.html', about_html, 'utf8');


for (blog of blogs) {
let blog_html = ejs.render(blog_template, {
  filename: __dirname + '/views/blog.ejs',
  data: blog,
  blogTitles: blogTitles
});

fs.writeFileSync('build/' + blog.trickname.replace(/ /g, "-") +'.html', blog_html, 'utf8');
}
