$(function() {
  var blog_template = Handlebars.compile($("#blog_template").html()),
      tag_template = Handlebars.compile($("#tag_template").html());

  Handlebars.registerPartial("tag_template", $("#tag_template").html());

  var post1 = {
    title: "I'm not a star",
    pub_date: new Date().toDateString(),
    post_body: "<p>Somebody lied I got a pistol in the car</p>",
    tags: ["tag1", "tag2", "tag-heuer"]
  },
      post2 = {
    title: "I think I'm big meech",
    pub_date: new Date().toDateString(),
    post_body: "<p>Larry Hoover</p>"
  }

  var posts = [post1, post2];

  $("body").append(blog_template(posts));
});
