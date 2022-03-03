---
layout: post
title:  Docker command to list all docker information
categories: [docker]
---

To list all docker container that been running on our machine, we can use the following command:

```bash
docker container ls
```

But if we want to focus only on docker name, port and image we can use specific command:

```bash
{% raw %}
docker container ls --format "table {{.Names}}\t{{.Ports}}\t{{.Image}}"
{% endraw %}
```

So now we want to see specific and filter our docker container ( by name or by port). We can use the following command:

```bash
{% raw %}
docker container ls -a -q --filter=name=(container name) --format "table {{.Names}}\t{{.Ports}}\t{{.Image}}"
{% endraw %}
```

---
Source:  
Docker container command [link](http://manpages.ubuntu.com/manpages/bionic/man1/docker-container-ls.1.html)  
Escaping double curly braces in markdown [so question](https://stackoverflow.com/questions/24102498/escaping-double-curly-braces-inside-a-markdown-code-block-in-jekyll)
