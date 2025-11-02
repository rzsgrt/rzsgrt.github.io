---
title: Nbconvert command to export jupyter-notebook
date: April 16, 2022
---

If we want to share our jupyter notebook, but want to hide all messy code behind it, we can use the following command:

Long version:

```bash
jupyter nbconvert --to pdf --TemplateExporter.exclude_input=True --TemplateExporter.exclude_input_prompt=True --no-prompt notebook-name.ipynb --output outputfilename
```

You can change `--to pdf` to another extension, like `--to html` or `--to markdown`.  
`TemplateExporter` only cover some basic setting, so for specific setting each extension see [nbconvert docs](https://nbconvert.readthedocs.io/en/latest/config_options.html?highlight=TemplateExporter.exclude)

Simple version:

```bash
jupyter nbconvert --to pdf --no-input --no-prompt notebook-name.ipynb
```

But before run that command, make sure you already install `ipywidget` and enable `widgetsnbextension`

```bash
jupyter nbextension enable --py widgetsnbextension
```